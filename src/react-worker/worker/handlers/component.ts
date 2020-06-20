import { Bridge } from '../../interface';
import { IPCObjectManager } from '../../ipc-object';

export function registerComponentHandlers(bridge: Bridge, ipcObjectManager: IPCObjectManager) {
  console.log(bridge, ipcObjectManager);
}
