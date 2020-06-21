import { createBridge, bootstrap } from '../react-worker/worker';
import { IPCObjectManager } from '../react-worker/ipc-object';

export const bridge = createBridge('worker-demo');
export const ipcObjectManager = new IPCObjectManager(bridge);

bootstrap(bridge, ipcObjectManager);
