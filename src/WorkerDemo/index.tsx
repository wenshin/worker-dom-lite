// import React from 'react';
import Worker from './index.worker';
import { bootstrap, createBridge } from '../react-worker/host';
import { IPCObjectManager, IPCCargoType } from '../react-worker/ipc-object';
import { BRIDGE_READY_EVENT } from '../react-worker/Bridge';

const bridge = createBridge(new Worker(), 'worker-demo');
const ipcObjectManager = new IPCObjectManager(bridge);

bootstrap(bridge, ipcObjectManager);

export interface WorkerDemoProps {
  name: string;
}
const container = document.getElementById('root');
const cargo = ipcObjectManager.addSource(IPCCargoType.ELEMENT, container);
cargo.info = {
  nodeName: container.nodeName
};

bridge.subscribe(BRIDGE_READY_EVENT, () => {
  bridge.publish('component:render', {
    container: cargo,
    props: { name: 'ywx' }
  });
});

// export default class WorkerDemoHost extends React.PureComponent<WorkerDemoProps> {
//   container: HTMLElement | null = null;

//   componentDidMount() {
//     if (!this.container) return;
//     const cargo = ipcObjectManager.addSource(IPCCargoType.ELEMENT, this.container);
//     cargo.info = {
//       nodeName: this.container.nodeName
//     };
//     bridge.publish('component:render', {
//       container: cargo,
//       props: { ...this.props }
//     });
//   }

//   componentDidUpdate() {
//     if (!this.container) return;
//     const cargo = ipcObjectManager.getCargoByObject(this.container);
//     bridge.publish('component:render', {
//       container: cargo,
//       props: { ...this.props }
//     });
//   }

//   componentWillUnmount() {
//     if (!this.container) return;
//     const cargo = ipcObjectManager.getCargoByObject(this.container);
//     if (cargo) {
//       bridge.publish('component:componentWillUnmount', {
//         container: cargo
//       });
//       ipcObjectManager.remove(cargo);
//     }
//   }

//   render() {
//     return <div className="react-worker-container" ref={(ref) => (this.container = ref)} />;
//   }
// }
