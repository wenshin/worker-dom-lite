// must import first
import './bootstrap';
import React, { ComponentClass } from 'react';
import ReactDOM from 'react-dom';
import WorkerDemo from './WorkerDemo';
import { IPCCargo, IPCObjectManager, isIPCCargo } from '../react-worker/ipc-object';
import { Bridge } from '../react-worker/interface';

const bridge: Bridge = (self as any).bridge; // eslint-disable-line no-restricted-globals
const ipcObjectManager: IPCObjectManager = (self as any).ipcObjectManager; // eslint-disable-line no-restricted-globals

class WorkerElement {
  static cacheMap: Map<string, WorkerElement> = new Map();

  cargo: IPCCargo;
  containerElem: Element;
  ipcObjectManager: IPCObjectManager = new IPCObjectManager(bridge);

  constructor(container: IPCCargo) {
    this.containerElem = ipcObjectManager.getObject(container) as Element;

    if (!this.containerElem && isIPCCargo(container) && container.info && container.info.nodeName) {
      // @ts-ignore
      this.containerElem = document.createElement(container.info.nodeName, { cargo: container });
      ipcObjectManager.addMirror(container, this.containerElem);
    } else {
      throw new Error('container cargo do not have info.nodeName property');
    }

    this.cargo = container;
    WorkerElement.cacheMap.set(container.id, this);
  }

  render(Comp: ComponentClass<any, any>, props: any) {
    ReactDOM.render(<Comp {...props} />, this.containerElem);
  }

  remove() {
    ipcObjectManager.remove(this.cargo);
    WorkerElement.cacheMap.delete(this.cargo.id);
  }
}

bridge.subscribe('component:render', ({ container, props }: { container: IPCCargo; props: any }) => {
  const elem = new WorkerElement(container);
  elem.render(WorkerDemo, props);
});

bridge.subscribe('component:update', ({ container, props }: { container: IPCCargo; props: any }) => {
  const elem = WorkerElement.cacheMap.get(container.id);
  if (elem) {
    elem.render(WorkerDemo, props);
  }
});

bridge.subscribe('component:unmount', ({ container }: { container: IPCCargo }) => {
  const elem = WorkerElement.cacheMap.get(container.id);
  if (elem) {
    elem.remove();
  }
});

export default class WebpackWorker extends Worker {
  constructor() {
    super('');
  }
}
