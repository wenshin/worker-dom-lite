// must import first
import { WorkerElement, registerWorkerElementHandlers } from '../worker-dom/worker/react';
import App from './App';
import WorkerDemo from './WorkerDemo';

registerWorkerElementHandlers(window.$bridge, window.$ipcObjectManager);

WorkerElement.registerComponent('App', App);
WorkerElement.registerComponent('WorkerDemo', WorkerDemo);

console.log('worker', self); // eslint-disable-line no-restricted-globals

export default class WebpackWorker extends Worker {
  constructor() {
    super('');
  }
}
