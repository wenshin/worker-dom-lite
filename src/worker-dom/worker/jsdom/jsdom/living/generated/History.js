"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../window/History-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "History";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("History", globalObject);
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
  const wrapper = utils.makeWrapper(History, globalObject);

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
  class History {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    go() {
      const esValue = this || globalObject;

      return esValue[implSymbol].go(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    back() {
      const esValue = this || globalObject;

      return esValue[implSymbol].back();
    }

    forward() {
      const esValue = this || globalObject;

      return esValue[implSymbol].forward();
    }

    pushState(data, title) {
      const esValue = this || globalObject;

      return esValue[implSymbol].pushState(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    replaceState(data, title) {
      const esValue = this || globalObject;

      return esValue[implSymbol].replaceState(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get length() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["length"];
    }

    get state() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["state"];
    }
  }
  Object.defineProperties(History.prototype, {
    go: { enumerable: true },
    back: { enumerable: true },
    forward: { enumerable: true },
    pushState: { enumerable: true },
    replaceState: { enumerable: true },
    length: { enumerable: true },
    state: { enumerable: true },
    [Symbol.toStringTag]: { value: "History", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = History;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: History
  });
};
