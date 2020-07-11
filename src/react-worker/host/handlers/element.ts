import { Bridge } from '../../interface';
import { IPCObjectManager, IPCCargo } from '../../ipc-object';
import { BridgeElementEvents, BridgeCommonEvents } from '../../worker/jsdom/jsdom/living/events/consts';
import { assertBridgeEventData, createEventDataError } from './assert';

export function registerElementHandlers(bridge: Bridge, ipcObjectManager: IPCObjectManager) {
  bridge.registerInvokeHandlers('document', {
    createElement(elemCargo?: IPCCargo, tagName?: string, ...args: any[]) {
      const elem = elemCargo && ipcObjectManager.getObject(elemCargo);
      if (!elem && tagName && elemCargo) {
        const mirror = document.createElement(tagName, ...args);
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

  bridge.registerInvokeHandlers('Node', {
    /**
     * @param elemCargo
     * @param node
     * @param child 可选，不存在时功能同 appendChild
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

  bridge.subscribe(
    BridgeElementEvents.setAttribute,
    (data?: { elemCargo?: IPCCargo; name?: string; value?: string }) => {
      assertBridgeEventData(BridgeElementEvents.setAttribute, data);
      if (!data || !data.elemCargo || !data.name) return;
      const elem = data.elemCargo && (ipcObjectManager.getObject(data.elemCargo) as Element);
      if (elem) {
        elem.setAttribute(data.name, data.value || '');
      } else {
        throw createEventDataError(BridgeElementEvents.setAttribute, `element is not exist!`);
      }
    }
  );

  bridge.subscribe(
    BridgeElementEvents.setAttributeNS,
    (data?: { elemCargo?: IPCCargo; namespace?: string; name?: string; value?: string }) => {
      assertBridgeEventData(BridgeElementEvents.setAttributeNS, data);
      if (!data || !data.elemCargo || !data.name) return;
      const elem = data.elemCargo && (ipcObjectManager.getObject(data.elemCargo) as HTMLElement);
      if (elem) {
        elem.setAttributeNS(data.namespace || null, data.name, data.value || '');
      } else {
        throw createEventDataError(BridgeElementEvents.setAttributeNS, `element is not exist!`);
      }
    }
  );

  bridge.subscribe(BridgeElementEvents.removeAttribute, (data?: { elemCargo?: IPCCargo; name?: string }) => {
    assertBridgeEventData(BridgeElementEvents.removeAttribute, data);
    if (!data || !data.elemCargo || !data.name) return;
    const elem = data.elemCargo && (ipcObjectManager.getObject(data.elemCargo) as HTMLElement);
    if (elem) {
      elem.removeAttribute(data.name);
    } else {
      throw createEventDataError(BridgeElementEvents.removeAttribute, `element is not exist!`);
    }
  });

  bridge.subscribe(
    BridgeElementEvents.removeAttributeNS,
    (data?: { elemCargo?: IPCCargo; namespace?: string; name?: string }) => {
      assertBridgeEventData(BridgeElementEvents.removeAttributeNS, data);
      if (!data || !data.elemCargo || !data.name) return;
      const elem = data.elemCargo && (ipcObjectManager.getObject(data.elemCargo) as HTMLElement);
      if (elem) {
        elem.removeAttributeNS(data.namespace || null, data.name);
      } else {
        throw createEventDataError(BridgeElementEvents.removeAttributeNS, `element is not exist!`);
      }
    }
  );

  bridge.subscribe(
    BridgeElementEvents.toggleAttribute,
    (data?: { elemCargo?: IPCCargo; name?: string; force?: boolean }) => {
      assertBridgeEventData(BridgeElementEvents.toggleAttribute, data);
      if (!data || !data.elemCargo || !data.name) return;
      const elem = data.elemCargo && (ipcObjectManager.getObject(data.elemCargo) as HTMLElement);
      if (elem) {
        elem.toggleAttribute(data.name, data.force);
      } else {
        throw createEventDataError(BridgeElementEvents.toggleAttribute, `element is not exist!`);
      }
    }
  );

  bridge.subscribe(BridgeCommonEvents.setProperty, (data?: { elemCargo: IPCCargo; prop: string; value: any }) => {
    assertBridgeEventData(BridgeCommonEvents.setProperty, data);
    if (!data || !data.elemCargo) return;
    if (![ 'nodeValue', 'textContent' ].includes(data.prop)) {
      throw createEventDataError(BridgeCommonEvents.setProperty, `prop ${data.prop} is not supported!`);
    }
    const elem = data.elemCargo && (ipcObjectManager.getObject(data.elemCargo) as Element);
    if (elem && data.prop) {
      (elem as any)[data.prop] = data.value;
    } else {
      throw createEventDataError(BridgeCommonEvents.setProperty, `element or data.prop is not exist!`);
    }
  });
}
