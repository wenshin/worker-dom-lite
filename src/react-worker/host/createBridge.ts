import { BridgePayload } from '../interface';
import Bridge from '../Bridge';
import { getTime } from '../utils';

function createBridge(worker: Worker, name?: string) {
  const transport = {
    name: name || 'bridge-transport',
    postMessage(payload: any, transfer?: Transferable[]) {
      console.debug(getTime(), 'BridgeDebugHostSend ', payload.id, payload);
      worker.postMessage(
        {
          $channel: transport.name,
          payload
        },
        transfer || []
      );
    },
    onMessage(cb: (payload: BridgePayload) => void): Function {
      const wrap = (evt: MessageEvent) => {
        if (evt.data) {
          const { $channel, payload } = evt.data;
          if ($channel === transport.name) {
            console.debug(getTime(), 'BridgeDebugHostReceive: ', payload.id, payload);
            cb(payload);
          }
        }
      };
      worker.addEventListener('message', wrap);
      return () => {
        worker.removeEventListener('message', wrap);
      };
    }
  };
  return new Bridge({ transport });
}

export default createBridge;
