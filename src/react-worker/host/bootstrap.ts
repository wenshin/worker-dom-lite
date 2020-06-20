import { Bridge } from '../interface';
import { IPCObjectManager } from '../ipc-object';
import { registerReconcilerHandlers } from './handlers/reconciler';
import { registerEventTargetHandlers } from './handlers/event';
import { registerElementHandlers } from './handlers/element';
import { BRIDGE_READY_EVENT } from '../Bridge';

function bootstrap(bridge: Bridge, ipcObjectManager: IPCObjectManager) {
  bridge.subscribe(BRIDGE_READY_EVENT, ({ cargos }) => {
    ipcObjectManager.addMirror(cargos.window, window);
    ipcObjectManager.addMirror(cargos.document, document);
    ipcObjectManager.addMirror(cargos.html, document.documentElement);
    ipcObjectManager.addMirror(cargos.head, document.head);
    ipcObjectManager.addMirror(cargos.body, document.body);
  });

  registerReconcilerHandlers(bridge, ipcObjectManager);
  registerEventTargetHandlers(bridge, ipcObjectManager);
  registerElementHandlers(bridge, ipcObjectManager);
}

export default bootstrap;
