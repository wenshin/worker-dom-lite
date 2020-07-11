import { IPCObjectManager } from './IPCObjectManager';
import { IPCCargoType, isIPCCargo, IPCCargoImpl, IPCCargo } from './IPCObject';
import idlUtils from '../worker/jsdom/jsdom/living/generated/utils';
import utils from '../worker/jsdom/jsdom/living/generated/utils';

const ELEMENT_COPY_PROPS = [
  'clientLeft',
  'clientTop',
  'clientHeight',
  'clientWidth',
  'scrollTop',
  'scrollLeft',
  'scrollWidth',
  'scrollHeight',
  'offsetHeight',
  'offsetLeft',
  'offsetTop',
  'offsetWidth'
];

const ELEMENT_COPY_STYLES = [
  'boxSizing',
  'overflow',
  'overflowX',
  'overflowY',
  'width',
  'height',
  'top',
  'left',
  'right',
  'bottom',
  'position',
  'opacity',
  'transform',
  'transition'
];

const WINDOW_COPY_PROPS = [
  'devicePixelRatio',
  'screenX',
  'screenY',
  'screenTop',
  'screenLeft',
  'scrollX',
  'scrollY',
  'innerHeight',
  'innerWidth',
  'pageYOffset',
  'pageXOffset'
];

export const HOST_CONTAINER_ATTR = 'data-wd-comp';

function pickProps(from: any, props: string[], to: any) {
  const toObj = to || {};
  if (!from) return toObj;
  props.forEach((prop) => {
    toObj[prop] = from[prop];
  });
  return toObj;
}

function packElementCargo(elem: Node, ipcObjectManager: IPCObjectManager): IPCCargo | undefined {
  const c = ipcObjectManager.getCargoByObject(elem);
  if (c) {
    const elemCargo = new IPCCargoImpl(c.type);
    elemCargo.id = c.id;
    elemCargo.info = Object.assign({}, c.info);
    pickProps(elem, ELEMENT_COPY_PROPS, elemCargo.info);
    if (elem !== document) {
      // document do not have getBoundingClientRect
      const rect = (elem as HTMLElement).getBoundingClientRect();
      elemCargo.info.boundingClientRect = {
        bottom: rect.bottom,
        height: rect.height,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        width: rect.width
      };
      elemCargo.info.computedStyles = {};
      const styles = window.getComputedStyle(elem as HTMLElement);
      pickProps(styles, ELEMENT_COPY_STYLES, elemCargo.info.computedStyles);
    }
    return elemCargo;
  }
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
      if ([ IPCCargoType.ELEMENT ].includes(c.type as IPCCargoType)) {
        cargo[key] = packElementCargo(v as HTMLElement, ipcObjectManager);
      } else if (c.type === IPCCargoType.WINDOW) {
        const elemCargo = new IPCCargoImpl(c.type);
        elemCargo.id = c.id;
        elemCargo.info = Object.assign({}, c.info);
        pickProps(v, WINDOW_COPY_PROPS, elemCargo.info);
        cargo[key] = elemCargo;
      } else {
        cargo[key] = c;
      }
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

function packParentsCargo(target: Node | null, ipcObjectManager: IPCObjectManager) {
  const doc = packElementCargo(document, ipcObjectManager);
  const body = packElementCargo(document.body, ipcObjectManager);
  const cargos = [ doc, body ];
  if (!target) return cargos;
  let parent = target.parentNode;
  while (parent && parent !== document && parent !== document.body && ipcObjectManager.getCargoByObject(parent)) {
    cargos.push(packElementCargo(parent, ipcObjectManager));
    parent = parent.parentNode;
  }
  return cargos;
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
  (packed as any).__parents = packParentsCargo(evt.target as Node, ipcObjectManager);
  return [ packed ];
}

function unpackElementCargo(elem: any, cargo: IPCCargo) {
  const impl = elem[utils.implSymbol] || elem;
  pickProps(cargo.info, ELEMENT_COPY_PROPS, impl._$nodeProps);
  if (cargo.info && cargo.info.boundingClientRect) {
    impl._$nodeProps.boundingClientRect = cargo.info.boundingClientRect;
  }
  if (cargo.info && cargo.info.computedStyles) {
    Object.keys(cargo.info.computedStyles).forEach((key) => {
      impl._$computedStyles.setProperty(key, cargo.info.computedStyles[key]);
    });
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
      if (v.type === IPCCargoType.ELEMENT) {
        unpackElementCargo(source, v);
      } else if (v.type === IPCCargoType.WINDOW) {
        pickProps(v.info, WINDOW_COPY_PROPS, source);
      }
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

// React will lost many event data
export function unpackEvent(ipcObjectManager: IPCObjectManager, evt: any): Event[] {
  const unpacked = unpack<Event>(ipcObjectManager, evt);
  const clsType = (unpacked as any).__clsType || 'Event';
  const targetInfo = (unpacked as any).__targetInfo;
  if (evt.__parents) {
    evt.__parents.forEach((pCargo: IPCCargo) => {
      const elem = ipcObjectManager.getObject(pCargo);
      if (elem) {
        unpackElementCargo(elem, pCargo);
      }
    });
  }
  // 直接 return unpacked react 不能正常处理
  // return [ unpacked ];

  const wrapper: Event = new (window as any)[clsType](unpacked.type, { bubbles: unpacked.bubbles });
  const defaultPrevented = unpacked.defaultPrevented;
  // @ts-ignore
  delete unpacked.defaultPrevented;
  // @ts-ignore
  delete unpacked.srcElement;
  delete (unpacked as any).__parents;
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
