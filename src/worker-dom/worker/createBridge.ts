import { BridgePayload, TransportTransferPayload } from '../interface';
import Bridge from '../Bridge';
import { genId, getTime } from '../utils';

const webworker = (self as unknown) as Worker; // eslint-disable-line no-restricted-globals

/**
 * host: new Worker
 *   worker: init transport
 *   worker: request secret transport channel
 *   worker: init window
 *   worker: publish ready event
 * host: init bridge and transport
 *   host: ack secret transport channel
 *
 */
function createBridge(name?: string) {
  // transport name 需要动态协商，而不是写死，防止被三方代码攻击
  let secretName = '';
  const syncSecretName = `${name || 'transport'}:${genId()}`;
  let sendBuffer: TransportTransferPayload[] = [];
  let sendTimer: number = 0;
  const transport = {
    name: 'bridge-transport',
    postMessage(payload: any, transfer?: Transferable[]) {
      sendBuffer.push({
        $channel: secretName || transport.name,
        payload
      });
      if (!sendTimer) {
        sendTimer = (setTimeout(() => {
          console.debug(getTime(), 'BridgeDebugWorkerSend ', sendBuffer);
          webworker.postMessage(sendBuffer, transfer || []);
          sendTimer = 0;
          sendBuffer = [];
        }, 0) as unknown) as number;
      }
    },
    onMessage(cb: (payload: BridgePayload) => void): Function {
      const old = webworker.onmessage;
      webworker.onmessage = (evt) => {
        if (evt.data && evt.data.length) {
          console.debug(getTime(), 'BridgeDebugWorkerReceive ', evt.data);
          evt.data.forEach((data: TransportTransferPayload) => {
            const { $channel, payload } = data;
            const isChannel = secretName ? $channel === secretName : $channel === transport.name;
            if (isChannel) {
              if (payload && payload.isTransportReady) {
                // [secret transport name] 3. ack host ready
                transport.postMessage({ isTransportReady: true });
                secretName = syncSecretName;
              }
              cb(payload);
            }
          });
        }
        old && old.call(webworker, evt);
      };
      // off listen
      return () => {
        webworker.onmessage = old;
      };
    }
  };

  // [secret transport name] 1. syn secret name
  transport.postMessage({ secretName: syncSecretName });

  return new Bridge({ name: name || 'BridgeWorker', transport });
}

export default createBridge;
