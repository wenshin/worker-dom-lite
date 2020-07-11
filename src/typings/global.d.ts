import { Bridge } from 'src/react-worker/interface';
import { IPCObjectManager } from 'src/react-worker/ipc-object';

declare global {
  interface Window {
    $bridge: Bridge;
    $ipcObjectManager: IPCObjectManager;
  }
}
