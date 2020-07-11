import { BridgePayload } from '../interface';
import Bridge from '../Bridge';
import { getTime } from '../utils';

function createBridge(worker: Worker, name?: string) {
  let secretName = '';
  let isTransportReady = false;
  const transport = {
    name: 'bridge-transport',
    postMessage(payload: any, transfer?: Transferable[]) {
      console.debug(getTime(), 'BridgeDebugHostSend ', payload.id, payload);
      worker.postMessage(
        {
          $channel: isTransportReady ? secretName : transport.name,
          payload
        },
        transfer || []
      );
    },
    onMessage(cb: (payload: BridgePayload) => void): Function {
      const wrap = (evt: MessageEvent) => {
        if (evt.data) {
          const { $channel, payload } = evt.data;
          const isChannel = isTransportReady ? $channel === secretName : $channel === transport.name;
          if (isChannel) {
            console.debug(getTime(), 'BridgeDebugHostReceive: ', payload.id, payload);
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
