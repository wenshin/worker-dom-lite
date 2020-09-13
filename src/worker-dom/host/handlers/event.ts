import { Bridge } from '../../interface';
import { IPCObjectManager, IPCCargo } from '../../ipc-object';

export function registerEventTargetHandlers(bridge: Bridge, ipcObjectManager: IPCObjectManager) {
  const handlers = {
    addEventListener(elemCargo: IPCCargo, type: string, cbCargo: IPCCargo, ...args: any[]) {
      const elem = ipcObjectManager.getObject(elemCargo) as Element;
      if (!elem) {
        throw new Error(`element ${JSON.stringify(elemCargo)} not exist!`);
      }
      let callback = ipcObjectManager.getObject<EventListener>(cbCargo);
      if (callback) {
        elem.addEventListener(type, callback, ...args);
      } else {
        ipcObjectManager.addMirror(cbCargo);
        const mirror = ipcObjectManager.getObject(cbCargo) as EventListener;
        elem.addEventListener(type, mirror, ...args);
      }
    },

    removeEventListener(elemCargo: IPCCargo, type: string, cbCargo: IPCCargo) {
      let callback = ipcObjectManager.getObject<EventListener>(cbCargo);
      if (callback) {
        // 保证清理掉 IPC 缓存
        ipcObjectManager.remove(cbCargo);
        const elem = ipcObjectManager.getObject<EventTarget>(elemCargo);
        if (!elem) {
          throw new Error(`element ${JSON.stringify(elemCargo)} not exist!`);
        }
        elem.removeEventListener(type, callback);
      }
    }
  };

  bridge.registerInvokeHandlers('EventTarget', handlers);

  bridge.subscribe('EventTarget:reactClickNoop', (elemCargo: IPCCargo) => {
    const elem = ipcObjectManager.getObject(elemCargo) as HTMLElement;
    if (!elem) {
      throw new Error(`element ${JSON.stringify(elemCargo)} not exist!`);
    }
    elem.onclick = () => {};
  });
}
