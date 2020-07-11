import { IPCObjectManager } from '../ipc-object';
import { BridgeCommonEvents } from '../worker/jsdom/jsdom/living/events/consts';
import { registerEventTargetHandlers } from './handlers/event';
import { registerElementHandlers } from './handlers/element';

import createBridge from './createBridge';

function bootstrap(worker: Worker, name?: string) {
  const bridge = createBridge(worker, name);
  const ipcObjectManager = new IPCObjectManager(bridge);

  const initRuntime = ({ cargos }: any) => {
    ipcObjectManager.addMirror(cargos.window, window);
    ipcObjectManager.addMirror(cargos.document, document);
    ipcObjectManager.addMirror(cargos.html, document.documentElement);
    ipcObjectManager.addMirror(cargos.head, document.head);
    ipcObjectManager.addMirror(cargos.body, document.body);
    bridge.unsubscribe(BridgeCommonEvents.initRuntime, initRuntime);
  };

  bridge.subscribe(BridgeCommonEvents.initRuntime, initRuntime);

  registerEventTargetHandlers(bridge, ipcObjectManager);
  registerElementHandlers(bridge, ipcObjectManager);

  return { bridge, ipcObjectManager };
}

export default bootstrap;
