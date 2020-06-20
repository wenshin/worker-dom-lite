import Bridge from '../Bridge';

export type ProxyDocument = Element & { $bridge: Bridge };

export default function createDocument(bridge: Bridge): ProxyDocument {
  return new Proxy({ $bridge: bridge }, {
    get(target, prop) {
      if (target[prop]) {
        return target[prop];
      }
      return bridge.invoke('document.getProp', {
        prop,
      });
    },
    set(target, prop, value) {
      target[prop] = value;
      bridge.publish('document.setProp', {
        prop,
        value,
      })
      return true;
    },
    deleteProperty(target, prop) {
      delete target[prop];
      bridge.publish('document.deleteProp', {
        prop,
      });
      return true;
    },
  });
}
