import { Bridge } from 'src/worker-dom/interface';
import { IPCObjectManager } from 'src/worker-dom/ipc-object';

declare global {
  interface Window {
    $bridge: Bridge;
    $ipcObjectManager: IPCObjectManager;
  }
}
