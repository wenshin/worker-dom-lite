import { JSDOM } from './jsdom';
import { IPCObjectManager, IPCCargo } from '../ipc-object';
import { BRIDGE_READY_EVENT, TRANSPORT_READY_EVENT } from '../Bridge';
import { BridgeCommonEvents } from './jsdom/jsdom/living/events/consts';
import utils from './jsdom/jsdom/living/generated/utils';
import createBridge from './createBridge';

const bridge = createBridge('BridgeWorker');
const ipcObjectManager = new IPCObjectManager(bridge);

const worker = self as any; // eslint-disable-line no-restricted-globals
const { window } = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`, {
  windowOptions: {
    bridge,
    ipcObjectManager
  }
});

worker.window = window;
worker.document = (window as any).document;

const cargos: {
  [key: string]: IPCCargo;
} = {
  window: window.$cargo,
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
