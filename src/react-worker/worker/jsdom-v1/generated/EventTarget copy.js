const utils = require('./utils.js');
const createBridge = require('../../createBridge');
const { IPCObjectManager, IPCCargoType, IPC_REMOVE_EVENT } = require('../../../ipc-object');
const Impl = require('../events/EventTarget-impl.js');
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = 'EventTarget';

const bridge = createBridge('event-target-bridge');
const ipcObjectManager = new IPCObjectManager(bridge);

function getIPCMethod(method: string) {
  return `${interfaceName}:${method}`;
}

exports.is = function is(obj) {
  return utils.isObject(obj) && utils.hasOwn(obj, implSymbol) && obj[implSymbol] instanceof Impl.implementation;
};
exports.isImpl = function isImpl(obj) {
  return utils.isObject(obj) && obj instanceof Impl.implementation;
};
exports.convert = function convert(obj, { context = 'The provided value' } = {}) {
  if (exports.is(obj)) {
    return utils.implForWrapper(obj);
  }
  throw new TypeError(`${context} is not of type 'EventTarget'.`);
};

exports.create = function create(globalObject, constructorArgs, privateData) {
  if (globalObject[ctorRegistrySymbol] === undefined) {
    throw new Error('Internal error: invalid global object');
  }

  const ctor = globalObject[ctorRegistrySymbol]['EventTarget'];
  if (ctor === undefined) {
    throw new Error('Internal error: constructor EventTarget is not installed on the passed global object');
  }

  let obj = Object.create(ctor.prototype);
  obj = exports.setup(obj, globalObject, constructorArgs, privateData);
  return obj;
};
exports.createImpl = function createImpl(globalObject, constructorArgs, privateData) {
  const obj = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(obj);
};
exports._internalSetup = function _internalSetup(obj, globalObject) {};
exports.setup = function setup(obj, globalObject, constructorArgs = [], privateData = {}) {
  privateData.wrapper = obj;

  exports._internalSetup(obj, globalObject);
  Object.defineProperty(obj, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  obj[implSymbol][utils.wrapperSymbol] = obj;
  if (Impl.init) {
    Impl.init(obj[implSymbol], privateData);
  }
  return obj;
};

exports.install = function install(globalObject) {
  class EventTarget {
    constructor() {
      this.$bridge = bridge;
      this.$ipcObjectManager = ipcObjectManager;
      this.$cargo = this.$ipcObjectManager.addSource(IPCCargoType.ELEMENT, this);
      return exports.setup(Object.create(new.target.prototype), globalObject, undefined);
    }

    addEventListener(type, callback, ...args) {
      const cb = this.$ipcObjectManager.addSource(IPCCargoType.FUNCTION, callback);
      this.$bridge.invoke(getIPCMethod('addEventListener'), [ this.$cargo, type, cb, ...args ], (err) => {
        if (err) {
          ipcObjectManager.removeByObject(callback);
        }
      });
    }

    removeEventListener(type, callback, ...args) {
      const cb = this.$ipcObjectManager.removeByObject(callback);
      this.$bridge.invoke(getIPCMethod('removeEventListener'), [ this.$cargo, type, cb, ...args ]).then(() => {
        // 保证删除远端的缓存
        this.$ipcObjectManager.removeRemote(cb);
      });
    }

    dispatchEvent(event) {
      throw new Error('not implemented');
    }
  }
  Object.defineProperties(EventTarget.prototype, {
    addEventListener: { enumerable: true },
    removeEventListener: { enumerable: true },
    dispatchEvent: { enumerable: true },
    [Symbol.toStringTag]: { value: 'EventTarget', configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = EventTarget;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: EventTarget
  });
};
