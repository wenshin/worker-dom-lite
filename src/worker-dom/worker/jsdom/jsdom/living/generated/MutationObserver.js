"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../mutation-observer/MutationObserver-impl.js");

const MutationCallback = require("./MutationCallback.js");
const Node = require("./Node.js");
const MutationObserverInit = require("./MutationObserverInit.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "MutationObserver";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("MutationObserver", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

exports.setup = (wrapper, globalObject, constructorArgs = [], privateData = {}) => {
  privateData.wrapper = wrapper;

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper;
};

exports.new = globalObject => {
  const wrapper = utils.makeWrapper(MutationObserver, globalObject);

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: Object.create(Impl.implementation.prototype),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper[implSymbol];
};

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  class MutationObserver {
    constructor(callback) {
      return exports.setup(Object.create(new.target.prototype), globalObject, arguments);
    }

    observe(target) {
      const esValue = this || globalObject;

      return esValue[implSymbol].observe(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    disconnect() {
      const esValue = this || globalObject;

      return esValue[implSymbol].disconnect();
    }

    takeRecords() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].takeRecords());
    }
  }
  Object.defineProperties(MutationObserver.prototype, {
    observe: { enumerable: true },
    disconnect: { enumerable: true },
    takeRecords: { enumerable: true },
    [Symbol.toStringTag]: { value: "MutationObserver", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = MutationObserver;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: MutationObserver
  });
};
