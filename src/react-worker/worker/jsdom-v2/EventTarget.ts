import createBridge from '../createBridge';
import { Bridge } from '../../interface';
import { genId } from '../../utils';
import { IPCObjectManager, IPCFunctionSource } from '../../ipc-object';

export type EventHandler = (evt: Event) => boolean | undefined;

const bridge = createBridge('event-target-bridge');
const ipcObjectManager = new IPCObjectManager(bridge);

function getIPCMethod(method: string) {
  return `domElem:${method}`;
}

export default class EventTarget {
  $eid: string;
  $bridge: Bridge;
  $ipcObjectManager: IPCObjectManager;

  constructor() {
    this.$bridge = bridge;
    this.$ipcObjectManager = ipcObjectManager;
    this.$eid = genId();
  }

  addEventListener(type: string, callback: EventHandler, ...args: any[]) {
    const ipcfn = new IPCFunctionSource(bridge, callback);
    ipcObjectManager.addSource(ipcfn);
    this.$bridge.invoke(
      getIPCMethod('addEventListener'),
      {
        $eid: this.$eid,
        args: [ type, ipcfn, ...args ]
      },
      (err) => {
        if (err) {
          ipcObjectManager.removeBySource(callback);
        }
      }
    );
  }

  removeEventListener(type: string, callback: EventHandler, ...args: any[]) {
    const ipcfn = ipcObjectManager.getBySource(callback);
    ipcObjectManager.removeBySource(callback);
    this.$bridge.invoke(getIPCMethod('removeEventListener'), {
      $eid: this.$eid,
      args: [ type, ipcfn, ...args ]
    });
  }
}
