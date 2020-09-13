import { getBridgeName } from '../Bridge';
import { IPCCargo, isIPCCargo, IPCCargoType, IPC_NAMESPACE } from './IPCObject';
import { IPCObjectManager } from './IPCObjectManager';

/**
 * source -> packWrapper -> unpackWrapper
 * @param bridge
 * @param cargo
 */

export function getFunctionMirror(
  ipcObjectManager: IPCObjectManager,
  cargo: IPCCargo,
  pack?: Function
): Function | null {
  if (isIPCFunction(cargo)) {
    return function ipcFunctionMirror(...args: any[]) {
      if (pack) {
        args = pack(ipcObjectManager, ...args);
      }
      return ipcObjectManager.bridge.publish(getBridgeName(IPC_NAMESPACE, cargo.id), args);
    };
  }
  return null;
}

export function isIPCFunction(obj: any) {
  return isIPCCargo(obj) && (obj.type === IPCCargoType.FUNCTION || obj.type === IPCCargoType.EVENT_CALLBACK);
}
