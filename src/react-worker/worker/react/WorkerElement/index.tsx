import React, { ComponentClass } from 'react';
import ReactDOM from 'react-dom';
import { IPCCargo, isIPCCargo, HOST_CONTAINER_ATTR } from '../../../ipc-object';
import { registerWorkerElementHandlers } from './worker-handlers';

export { registerWorkerElementHandlers };

export default class WorkerElement {
  private static _elemMap: Map<string, WorkerElement> = new Map();
  static getElement(id: string) {
    return this._elemMap.get(id);
  }

  private static _compMap: Map<string, ComponentClass<any, any>> = new Map();
  static registerComponent(name: string, Comp: ComponentClass<any, any>) {
    this._compMap.set(name, Comp);
  }

  Comp: ComponentClass;
  cargo: IPCCargo;
  containerElem: HTMLElement;

  constructor(name: string, container: IPCCargo) {
    const Comp = WorkerElement._compMap.get(name);
    if (!Comp) {
      throw new Error(`WorkerElement: Component ${name} not registered`);
    }
    this.Comp = Comp;

    this.containerElem = (window as any).$ipcObjectManager.getObject(container) as HTMLElement;

    if (!this.containerElem && isIPCCargo(container) && container.info && container.info.nodeName) {
      // @ts-ignore
      this.containerElem = document.createElement(container.info.nodeName, { cargo: container });
      this.containerElem.setAttribute(HOST_CONTAINER_ATTR, `__wd-${name}__`);
      this.containerElem.style.position = 'relative';
      (window as any).$ipcObjectManager.addMirror(container, this.containerElem);
    } else {
      throw new Error('container cargo do not have info.nodeName property');
    }

    this.cargo = container;
    WorkerElement._elemMap.set(container.id, this);
  }

  render(props: any) {
    ReactDOM.render(<this.Comp {...props} />, this.containerElem);
  }

  remove() {
    (window as any).$ipcObjectManager.remove(this.cargo);
    WorkerElement._elemMap.delete(this.cargo.id);
  }
}
