import { IPCCargoType, IPCCargo } from './IPCObject';
import { getFunctionMirror } from './IPCFunction';
import { IPCObjectManager } from './IPCObjectManager';

type MirrorCreator = (ipcObjectManager: IPCObjectManager, cargo: IPCCargo, pack?: Function) => any;

export const MirrorCreatorMap: { [key: string]: MirrorCreator } = {
  [IPCCargoType.EVENT_CALLBACK]: getFunctionMirror,
  [IPCCargoType.FUNCTION]: getFunctionMirror
};
