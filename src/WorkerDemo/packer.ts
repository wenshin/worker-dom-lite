import { IPCObjectManager, IPCCargoType } from '../react-worker/ipc-object';

export function packReactProps(props: any, ipcManager: IPCObjectManager): {} {
  const newProps = {};
  Object.keys(props).forEach((prop) => {
    const v = props[prop];
    const cargo = ipcManager.getCargoByObject(v);
    if (cargo) {
      newProps[prop] = cargo;
    } else if (typeof v === 'function') {
      newProps[prop] = ipcManager.addSource(IPCCargoType.FUNCTION, v);
    } else {
      newProps[prop] = v;
    }
  });
  return newProps;
}
