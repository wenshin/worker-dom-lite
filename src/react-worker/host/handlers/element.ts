import { Bridge } from '../../interface';
import { IPCObjectManager, IPCCargo } from '../../ipc-object';

export function registerElementHandlers(bridge: Bridge, ipcObjectManager: IPCObjectManager) {
  bridge.registerInvokeHandlers('document', {
    createElement(elemCargo?: IPCCargo, tagName?: string, ...args: any[]) {
      console.debug('Host createElement', tagName, elemCargo);
      const elem = elemCargo && ipcObjectManager.getObject(elemCargo);
      if (!elem && tagName && elemCargo) {
        let mirror: Element;
        switch (tagName) {
          case 'html':
            mirror = document.documentElement;
            break;
          case 'head':
            mirror = document.head;
            break;
          case 'body':
            mirror = document.body;
            break;
          default:
            mirror = document.createElement(tagName, ...args);
            break;
        }
        ipcObjectManager.addMirror(elemCargo, mirror);
      } else if (!elem && !tagName) {
        throw new Error(`document:createElement arguments [${elemCargo}, ${tagName}, ${args}] are invalid!`);
      }
    },
    createTextNode(elemCargo?: IPCCargo, data?: string) {
      const elem = elemCargo && ipcObjectManager.getObject(elemCargo);
      if (!elem && data !== undefined && elemCargo) {
        const mirror = document.createTextNode(data);
        ipcObjectManager.addMirror(elemCargo, mirror);
      } else {
        throw new Error(`document:createTextNode arguments [${elemCargo}, ${data}] are invalid!`);
      }
    }
  });

  bridge.registerInvokeHandlers('Element', {
    setAttributes(elemCargo?: IPCCargo, name?: string, value?: string) {
      const elem = elemCargo && (ipcObjectManager.getObject(elemCargo) as Element);
      if (elem && name && value) {
        elem.setAttribute(name, value);
      } else {
        throw new Error(`Element:setAttributes arguments [${elemCargo}, ${name}, ${value}]  are invalid!`);
      }
    }
  });

  bridge.registerInvokeHandlers('Node', {
    /**
     * @param elemCargo
     * @param node
     * @param child 可选，不存在是功能同 appendChild
     */
    insertBefore(elemCargo?: IPCCargo, nodeCargo?: IPCCargo, childCargo?: IPCCargo) {
      const elem = elemCargo && (ipcObjectManager.getObject(elemCargo) as Element);
      const node = nodeCargo && (ipcObjectManager.getObject(nodeCargo) as Element);
      const child = (childCargo && (ipcObjectManager.getObject(childCargo) as Element)) || null;
      if (!elem || !node) {
        throw new Error(`Node:insertBefore arguments [${elemCargo}, ${nodeCargo}]  are invalid!`);
      }

      elem.insertBefore(node, child);
    }
  });
}
