import { IPCCargo, IPCObjectManager } from '../worker-dom/ipc-object';
import { Bridge } from '../worker-dom/interface';

interface JSDOMElementCreationOptions extends ElementCreationOptions {
  cargo: IPCCargo;
}

interface JSDOMDocument extends Document {}

interface JSDOMElement extends Element {
  $bridge: Bridge;
  $ipcObjectManager: IPCObjectManager;
  $cargo: IPCCargo;
}

declare var document: JSDOMDocument;
