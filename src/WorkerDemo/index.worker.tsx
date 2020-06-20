import React from 'react';
import ReactDOM from 'react-dom';
import { createBridge, bootstrap } from '../react-worker/worker';
import { IPCObjectManager, IPCCargo } from '../react-worker/ipc-object';
import WorkerDemo from './WorkerDemo';

const bridge = createBridge('worker-demo');
const manager = new IPCObjectManager(bridge);
bootstrap(bridge, manager);

bridge.subscribe('init', () => {});

bridge.subscribe('component:render', ({ container, props }: { container: IPCCargo; props: any }) => {
  let elem = manager.getObject(container) as Element;
  if (!elem) {
    if (container.info && container.info.nodeName) {
      // @ts-ignore
      elem = document.createElement(container.info.nodeName, { cargo: container });
      manager.addMirror(container, elem);
      ReactDOM.render(<WorkerDemo {...props} />, elem);
    } else {
      throw new Error('component:render event need container.info');
    }
  }
});

bridge.subscribe('component:componentWillUnmount', ({ container }: { container: IPCCargo }) => {
  manager.remove(container);
});

export default class WebpackWorker extends Worker {
  constructor() {
    super('');
  }
}
