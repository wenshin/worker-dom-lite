import Worker from './index.worker';
import { bootstrap } from '../react-worker/host';
import createComponent from '../react-worker/host/react/createComponent';
// import { IPCCargoType } from '../react-worker/ipc-object';
// import { BRIDGE_READY_EVENT } from '../react-worker/Bridge';

const { bridge, ipcObjectManager } = bootstrap(new Worker(), 'worker-demo');

// const container = document.getElementById('root') as HTMLElement;
// const cargo = ipcObjectManager.addSource(IPCCargoType.ELEMENT, container);
// cargo.info = {
//   nodeName: container.nodeName
// };

// bridge.subscribe(BRIDGE_READY_EVENT, () => {
//   bridge.publish('component:render', {
//     component: 'App',
//     container: cargo,
//     props: { name: 'ywx' }
//   });
// });

export default createComponent(bridge, ipcObjectManager);
