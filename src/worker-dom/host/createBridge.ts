import { BridgePayload, TransportTransferPayload } from '../interface';
import Bridge from '../Bridge';
import { getTime } from '../utils';

function createBridge(worker: Worker, name?: string) {
  let secretName = '';
  let isTransportReady = false;
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
          console.debug(getTime(), 'BridgeDebugHostSend ', sendBuffer);
          worker.postMessage(sendBuffer, transfer || []);
          sendTimer = 0;
          sendBuffer = [];
        }, 0) as unknown) as number;
      }
    },
    onMessage(cb: (payload: BridgePayload) => void): Function {
      const wrap = (evt: MessageEvent) => {
        if (evt.data && evt.data.length) {
          console.debug(getTime(), 'BridgeDebugHostReceive: ', evt.data);
          evt.data.forEach((data: TransportTransferPayload) => {
            const { $channel, payload } = data;
            const isChannel = isTransportReady ? $channel === secretName : $channel === transport.name;
            if (isChannel) {
              if (payload && payload.secretName) {
                // [secret transport name] 2. ack secret name
                transport.postMessage({ isTransportReady: true });
                secretName = payload.secretName;
              } else if (payload && payload.isTransportReady) {
                // [secret transport name] 4. ack worker ready
                isTransportReady = true;
              } else {
                cb(payload);
              }
            }
          });
        }
      };
      worker.addEventListener('message', wrap);
      return () => {
        worker.removeEventListener('message', wrap);
      };
    }
  };

  return new Bridge({ name: name || 'BridgeHost', transport });
}

export default createBridge;
