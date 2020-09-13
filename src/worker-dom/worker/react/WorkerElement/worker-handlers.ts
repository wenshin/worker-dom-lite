import { Bridge } from '../../../interface';
import { IPCObjectManager, IPCCargo } from '../../../ipc-object';
import WorkerElement from '.';

export function registerWorkerElementHandlers(bridge: Bridge, ipcObjectManager: IPCObjectManager) {
  bridge.subscribe(
    'component:render',
    ({ component, container, props }: { component: string; container: IPCCargo; props: any }) => {
      const elem = new WorkerElement(component, container);
      elem.render(props);
    }
  );

  bridge.subscribe('component:update', ({ container, props }: { container: IPCCargo; props: any }) => {
    const elem = WorkerElement.getElement(container.id);
    if (elem) {
      elem.render(props);
    }
  });

  bridge.subscribe('component:unmount', ({ container }: { container: IPCCargo }) => {
    const elem = WorkerElement.getElement(container.id);
    if (elem) {
      elem.remove();
    }
  });
}
