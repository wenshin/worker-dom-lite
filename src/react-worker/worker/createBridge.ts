import { BridgePayload } from '../interface';
import Bridge from '../Bridge';
import { getTime } from '../utils';

const webworker = (self as unknown) as Worker; // eslint-disable-line no-restricted-globals

function createBridge(name?: string) {
  const transport = {
    name: name || 'bridge-transport',
    postMessage(payload: any, transfer?: Transferable[]) {
      console.debug(getTime(), 'BridgeDebugWorkerSend ', payload.id, payload);
      webworker.postMessage(
        {
          $channel: transport.name,
          payload
        },
        transfer || []
      );
    },
    onMessage(cb: (payload: BridgePayload) => void): Function {
      const old = webworker.onmessage;
      webworker.onmessage = (evt) => {
        if (evt.data) {
          const { $channel, payload } = evt.data;
          if ($channel === transport.name) {
            console.debug(getTime(), 'BridgeDebugWorkerReceive: ', payload.id, payload);
            cb(payload);
          }
        }
        old && old.call(webworker, evt);
      };
      // off listen
      return () => {
        webworker.onmessage = old;
      };
    }
  };

  return new Bridge({ transport });
}

export default createBridge;
