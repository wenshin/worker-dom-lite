import { genId } from '../utils';

export const IPC_NAMESPACE = 'IPCObj';

export enum IPCCargoType {
  FUNCTION = 'Function',
  REGEXP = 'RegExp',

  // react 修复部分 safari click 不生效 bug，需要设置 onclick 为空函数
  REACT_CLICK_NOOP = 'React_Click_Noop',
  EVENT_CALLBACK = 'Event_Callback',
  EVENT = 'Event',
  WINDOW = 'Window',
  DOCUMENT = 'Document',
  ELEMENT = 'Element',
  NODE = 'Node',
  EVENT_TARGET = 'EventTarget'
}

export interface IPCCargo {
  __ipcCargo: boolean;
  id: string;
  type: IPCCargoType | string;
  info?: any;
}

export class IPCCargoImpl implements IPCCargo {
  id: string;
  type: IPCCargoType | string;
  info?: any;
  __ipcCargo = true;

  constructor(type: IPCCargoType | string) {
    this.id = genId();
    this.type = type;
  }
}

/**
 * 1. add source function
 *    -> new IPCFunction
 *    -> IPCObjectManager add
 *    -> ipc send ipcCargo
 *      -> new IPCFunction with mirror
 *      -> IPCObjectManager add
 *      -> call mirror
 *    <- ipc send ipcCargo
 *    <- getObject, call source function
 *
 * 2. delete function from source
 *    -> IPCObjectManager delete by source
 *    -> ipc send delete ipcCargo
 *       -> IPCObjectManager delete by cargo
 *    <- ipc delete success, if fail try again
 *
 * 3. delete function from mirror
 *    -> IPCObjectManager delete by mirror
 *    -> ipc send delete ipcCargo
 *       -> IPCObjectManager delete by cargo
 *    <- ipc delete success, if fail try again
 */
export type IPCObject = Function | { [key: string]: any };

export function isIPCCargo(obj: any) {
  return obj && obj.__ipcCargo;
}
