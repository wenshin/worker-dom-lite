import { IPCObjectManager } from './IPCObjectManager';
import { IPCCargoType } from './IPCObject';
import idlUtils from '../worker/jsdom/jsdom/living/generated/utils';

/**
 * 序列化一些不能传输的对象
 * @param obj
 * @param ipcObjectManager
 * @param proto
 * @param cargo
 */
export function pack<T>(ipcObjectManager: IPCObjectManager, obj: any, proto?: any, cargo?: any): T {
  cargo = cargo || {};
  for (const key of Object.keys(proto || obj)) {
    const v = obj[key];
    const c = ipcObjectManager.getCargoByObject(v);
    if (c) {
      cargo[key] = c;
    } else if (key === 'sourceCapabilities') {
      cargo[key] = pack(ipcObjectManager, v);
    } else if (key === 'path') {
      continue;
    } else if (typeof v === 'function') {
      continue;
    } else {
      cargo[key] = v;
    }
  }
  if (proto && Object.getPrototypeOf(proto).toString() === '[object Object]') {
    return cargo;
  } else {
    return pack(ipcObjectManager, obj, Object.getPrototypeOf(proto || obj), cargo);
  }
}

/**
 * 反序列化一些不能传输的对象
 * @param obj
 * @param ipcObjectManager
 * @param proto
 * @param cargo
 */
export function unpack<T>(ipcObjectManager: IPCObjectManager, obj: any): T {
  for (const key of Object.keys(obj)) {
    const v = obj[key];
    const source = ipcObjectManager.getObject(v);
    if (source) {
      obj[key] = source;
    }
  }
  return obj;
}

export function packEvent(ipcObjectManager: IPCObjectManager, evt: Event): Event[] {
  return [ pack<Event>(ipcObjectManager, evt) ];
}

export function unpackEvent(ipcObjectManager: IPCObjectManager, evt: any): Event[] {
  const newEvt = unpack<Event>(ipcObjectManager, evt);
  const wrapper = new window.Event('click', { bubbles: true });
  const defaultPrevented = newEvt.defaultPrevented;
  // @ts-ignore
  delete newEvt.defaultPrevented;
  // @ts-ignore
  delete newEvt.srcElement;
  Object.assign((wrapper as any)[idlUtils.implSymbol], newEvt);
  (wrapper as any)[idlUtils.implSymbol]._canceledFlag = defaultPrevented;
  return [ wrapper ];
}

export const PackerMap: { [key: string]: { pack: Function; unpack: Function } } = {
  [IPCCargoType.EVENT_CALLBACK]: { pack: packEvent, unpack: unpackEvent }
};
