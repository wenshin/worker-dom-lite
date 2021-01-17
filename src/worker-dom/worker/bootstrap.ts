import { IPCObjectManager, IPCCargo } from '../ipc-object';
import { BRIDGE_READY_EVENT, TRANSPORT_READY_EVENT } from '../Bridge';
import { BridgeCommonEvents } from './consts';
import utils from './jsdom/jsdom/living/generated/utils';
import createBridge from './createBridge';
import { createWindow } from './runtime';

const bridge = createBridge('BridgeWorker');
const ipcObjectManager = new IPCObjectManager(bridge);

const worker = ((self as any).window = createWindow({
  bridge,
  ipcObjectManager
})); // eslint-disable-line no-restricted-globals

const cargos: {
  [key: string]: IPCCargo;
} = {
  window: worker.$cargo,
  document: (document as any)[utils.implSymbol].$cargo,
  html: (document.documentElement as any)[utils.implSymbol].$cargo,
  head: (document.head as any)[utils.implSymbol].$cargo,
  body: (document.body as any)[utils.implSymbol].$cargo
};

bridge.publish(BridgeCommonEvents.initRuntime, { cargos });

function handleTransportReady() {
  bridge.publish(BRIDGE_READY_EVENT, { cargos });
  bridge.unsubscribe(TRANSPORT_READY_EVENT, handleTransportReady);
}

bridge.subscribe(TRANSPORT_READY_EVENT, handleTransportReady);

/**
 * 1. 跑通普通应用
 * 2. 隔离，storage 隔离、cookie 隔离、DOM 操作隔离、ipcManager 隔离
 */
