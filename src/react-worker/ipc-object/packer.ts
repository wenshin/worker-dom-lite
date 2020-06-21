import { IPCObjectManager } from './IPCObjectManager';
import { IPCCargoType, isIPCCargo } from './IPCObject';
import idlUtils from '../worker/jsdom/jsdom/living/generated/utils';

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
    } else if (isIPCCargo(v)) {
      ipcObjectManager.addMirror(v);
      const mirror = ipcObjectManager.getObject(v);
      if (mirror) {
        obj[key] = mirror;
      }
    }
  }
  return obj;
}

/**
 * 序列化事件对象
 * @param obj
 * @param ipcObjectManager
 * @param proto
 * @param cargo
 */
function _packEvent<T>(ipcObjectManager: IPCObjectManager, obj: any, proto?: any, cargo?: any): T {
  cargo = cargo || {};
  for (const key of Object.keys(proto || obj)) {
    const v = obj[key];
    const c = ipcObjectManager.getCargoByObject(v);
    if (c) {
      cargo[key] = c;
    } else if (key === 'sourceCapabilities') {
      cargo[key] = v && _packEvent(ipcObjectManager, v);
    } else if (key === 'path') {
      continue;
    } else if (typeof v === 'function') {
      continue;
    } else if (v instanceof Element) {
      continue;
    } else {
      cargo[key] = v;
    }
  }
  if (proto && Object.prototype.toString.call(Object.getPrototypeOf(proto)) === '[object Object]') {
    return cargo;
  } else {
    return _packEvent(ipcObjectManager, obj, Object.getPrototypeOf(proto || obj), cargo);
  }
}

export function packEvent(ipcObjectManager: IPCObjectManager, evt: Event): Event[] {
  const packed = _packEvent<Event>(ipcObjectManager, evt);
  const matched = evt.toString().match(/\[object (\w+)\]/);
  (packed as any).__clsType = matched ? matched[1] : 'Event';
  (packed as any).__targetInfo = evt.target
    ? {
        value: (evt.target as any).value || '',
        checked: (evt.target as any).checked || ''
      }
    : undefined;
  return [ packed ];
}

// React will lost many event data
export function unpackEvent(ipcObjectManager: IPCObjectManager, evt: any): Event[] {
  const unpacked = unpack<Event>(ipcObjectManager, evt);
  const clsType = (unpacked as any).__clsType || 'Event';
  const targetInfo = (unpacked as any).__targetInfo;
  // 直接 return unpacked react 不能正常处理
  // return [ unpacked ];

  const wrapper: Event = new (window as any)[clsType](unpacked.type, { bubbles: unpacked.bubbles });
  const defaultPrevented = unpacked.defaultPrevented;
  // @ts-ignore
  delete unpacked.defaultPrevented;
  // @ts-ignore
  delete unpacked.srcElement;
  Object.assign((wrapper as any)[idlUtils.implSymbol], unpacked);
  (wrapper as any)[idlUtils.implSymbol]._canceledFlag = defaultPrevented;
  if (wrapper.target && targetInfo) {
    // 这里直接修改 _value 和 _checkedness 底层数据，避免 react 的 valueTracker 无效
    let target = wrapper.target;
    if ((wrapper.target as any)[idlUtils.implSymbol]) {
      target = (wrapper.target as any)[idlUtils.implSymbol];
    }
    Object.assign(target, {
      _value: targetInfo.value,
      _checkedness: targetInfo.checked
    });
  }
  return [ wrapper ];
}

export const PackerMap: { [key: string]: { pack: Function; unpack: Function } } = {
  [IPCCargoType.EVENT_CALLBACK]: { pack: packEvent, unpack: unpackEvent }
};
