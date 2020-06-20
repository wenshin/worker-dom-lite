import Bridge, { EventEmitterOptions } from '../Bridge';
import EventTarget from './EventTarget';
import { genId } from '../utils';
import ipcObjectManager from '../ipcObjectManager';

export type ProxyNode = Element & { $wid: string; $bridge };
export type EventHandler = (evt: Event) => boolean | undefined;

// webworker
//   elem:addEventListener
//      $wid
//      type
// window
//   elem:event:${type}

export default function createElement(tag: string, doc: Bridge): ProxyNode {
  const agent = { $wid: id, tagName: tag.toUpperCase(), ownerDocument: doc };
  const node = new Node();

  return new Proxy(agent, {
    get(target, prop) {
      if (target[prop]) {
        return target[prop];
      }
      return bridge.invoke('element.getProp', {
        $wid: target.$wid,
        prop
      });
    },
    set(target, prop, value) {
      target[prop] = value;
      bridge.publish('element.setProp', {
        $wid: target.$wid,
        prop,
        value
      });
      return true;
    },
    deleteProperty(target, prop) {
      delete target[prop];
      bridge.publish('element.deleteProp', {
        $wid: target.$wid,
        prop
      });
      return true;
    }
  });
}
