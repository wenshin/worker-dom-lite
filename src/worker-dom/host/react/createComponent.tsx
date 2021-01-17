import React, { HTMLAttributes } from 'react';
import { IPCObjectManager, IPCCargoType, IPCCargo } from '../../ipc-object';
import { BRIDGE_READY_EVENT } from '../../Bridge';
import { Bridge } from '../../interface';

export function packReactProps(props: any, ipcManager: IPCObjectManager): {} {
  const newProps: any = {};
  if (!props) return newProps;
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

interface InternalWorkerComponentProps<T> extends HTMLAttributes<HTMLDivElement> {
  component: string;
  props?: T;
}

export type WorkerComponentProps<T> = Omit<InternalWorkerComponentProps<T>, 'children'>;

export default function createComponent<T extends Omit<{ [key: string]: any }, 'children'>>(
  bridge: Bridge,
  ipcObjectManager: IPCObjectManager
) {
  function createElementCargo(elem: Element) {
    // shadow dom 的事件监听有问题
    const cargo = ipcObjectManager.addSource(IPCCargoType.ELEMENT, elem);
    cargo.info = { nodeName: elem.nodeName };
    return cargo;
  }

  return class WorkerComponent extends React.PureComponent<WorkerComponentProps<T>> {
    container: HTMLElement | null = null;
    cargo: IPCCargo | null;

    constructor(props: WorkerComponentProps<T>) {
      super(props);
      this.cargo = null;
    }

    componentDidMount() {
      if (!this.container) return;
      const { props } = this.props;
      if (this.props.children || (props && (props as any).children)) {
        throw new Error('WorkerComponent do not accept children prop');
      }
      this.cargo = createElementCargo(this.container);
      bridge.subscribe(BRIDGE_READY_EVENT, () => {
        bridge.publish('component:render', {
          component: this.props.component,
          container: this.cargo,
          props: packReactProps(this.props.props, ipcObjectManager)
        });
      });
    }

    componentDidUpdate() {
      if (!this.cargo) return;
      bridge.publish('component:update', {
        container: this.cargo,
        props: packReactProps(this.props.props, ipcObjectManager)
      });
    }

    componentWillUnmount() {
      if (!this.cargo) return;
      bridge.publish('component:unmount', {
        container: this.cargo
      });
    }

    render() {
      const { component, props, ...divProps } = this.props;
      return <div {...divProps} ref={(ref) => (this.container = ref)} />;
    }
  };
}
