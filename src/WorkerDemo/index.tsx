// import React from 'react';
import React from 'react';
import Worker from './index.worker';
import { bootstrap, createBridge } from '../react-worker/host';
import { IPCObjectManager, IPCCargoType, IPCCargo } from '../react-worker/ipc-object';
import { BRIDGE_READY_EVENT } from '../react-worker/Bridge';

const bridge = createBridge(new Worker(), 'worker-demo');
const ipcObjectManager = new IPCObjectManager(bridge);

bootstrap(bridge, ipcObjectManager);

export interface WorkerDemoProps {
  name: string;
}

// const container = document.getElementById('root');
// const cargo = ipcObjectManager.addSource(IPCCargoType.ELEMENT, container);
// cargo.info = {
//   nodeName: container.nodeName
// };

// bridge.subscribe(BRIDGE_READY_EVENT, () => {
//   bridge.publish('component:render', {
//     container: cargo,
//     props: { name: 'ywx' }
//   });
// });

function packReactProps(props: any, ipcManager: IPCObjectManager): {} {
  const newProps = {};
  Object.keys(props).forEach((prop) => {
    const v = props[prop];
    if (typeof v === 'function') {
      newProps[prop] = ipcManager.addSource(IPCCargoType.FUNCTION, v);
    } else {
      newProps[prop] = v;
    }
  });
  return newProps;
}

function createElementCargo(elem: Element) {
  // shadow dom 的事件监听有问题
  const cargo = ipcObjectManager.addSource(IPCCargoType.ELEMENT, elem);
  cargo.info = { nodeName: elem.nodeName };
  return cargo;
}

export default class WorkerDemoHost extends React.PureComponent<WorkerDemoProps> {
  container: HTMLElement | null = null;
  ipcObjectManager: IPCObjectManager;
  cargo: IPCCargo;

  constructor(props) {
    super(props);
    this.ipcObjectManager = new IPCObjectManager(bridge);
  }

  componentDidMount() {
    if (!this.container) return;
    if (this.props.children) {
      throw new Error('React Worker Component can not use children prop');
    }
    this.cargo = createElementCargo(this.container);
    bridge.subscribe(BRIDGE_READY_EVENT, () => {
      bridge.publish('component:render', {
        container: this.cargo,
        props: packReactProps(this.props, this.ipcObjectManager)
      });
    });
  }

  componentDidUpdate() {
    if (!this.cargo) return;
    bridge.publish('component:update', {
      container: this.cargo,
      props: packReactProps(this.props, this.ipcObjectManager)
    });
  }

  componentWillUnmount() {
    if (!this.cargo) return;
    bridge.publish('component:unmount', {
      container: this.cargo
    });
  }

  render() {
    return <div className="react-worker-container" ref={(ref) => (this.container = ref)} />;
  }
}
