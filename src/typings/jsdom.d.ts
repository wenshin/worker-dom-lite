import { IPCCargo, IPCObjectManager } from '../react-worker/ipc-object';
import { Bridge } from '../react-worker/interface';

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
