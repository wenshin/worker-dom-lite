import { JSDOM } from './jsdom';
import { IPCObjectManager, IPCCargoType } from '../ipc-object';
import { Bridge } from '../interface';
import { BRIDGE_READY_EVENT } from '../Bridge';
import utils from './jsdom/jsdom/living/generated/utils';

export default function bootstrap(bridge: Bridge, ipcObjectManager: IPCObjectManager) {
  (self as any).bridge = bridge; // eslint-disable-line no-restricted-globals
  (self as any).ipcObjectManager = ipcObjectManager; // eslint-disable-line no-restricted-globals

  const { window } = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`, {
    windowOptions: {
      bridge,
      ipcObjectManager
    }
  });
  window.$bridge = bridge;
  window.$ipcObjectManager = ipcObjectManager;
  window.$cargo = ipcObjectManager.addSource(IPCCargoType.WINDOW, window);

  (self as any).window = window; // eslint-disable-line no-restricted-globals
  (self as any).document = window.document; // eslint-disable-line no-restricted-globals
  // (self as any).document = createImpl(self, { bridge, ipcObjectManager });

  const cargos = {
    window: window.$cargo,
    document: document[utils.implSymbol].$cargo,
    html: document.documentElement[utils.implSymbol].$cargo,
    head: document.head[utils.implSymbol].$cargo,
    body: document.body[utils.implSymbol].$cargo
  };

  bridge.publish(BRIDGE_READY_EVENT, { cargos });
}
