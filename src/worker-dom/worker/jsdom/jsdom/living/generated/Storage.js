"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../webstorage/Storage-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "Storage";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("Storage", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

exports.setup = utils.getSetUp(exports, Impl, (wrapper, globalObject) => {
  wrapper = new Proxy(wrapper, proxyHandler);
});

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  class Storage {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    key(index) {
      const esValue = this || globalObject;

      return esValue[implSymbol].key(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    getItem(key) {
      const esValue = this || globalObject;

      return esValue[implSymbol].getItem(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    setItem(key, value) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setItem(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    removeItem(key) {
      const esValue = this || globalObject;

      return esValue[implSymbol].removeItem(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    clear() {
      const esValue = this || globalObject;

      return esValue[implSymbol].clear();
    }

    get length() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["length"];
    }
  }
  Object.defineProperties(Storage.prototype, {
    key: { enumerable: true },
    getItem: { enumerable: true },
    setItem: { enumerable: true },
    removeItem: { enumerable: true },
    clear: { enumerable: true },
    length: { enumerable: true },
    [Symbol.toStringTag]: { value: "Storage", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = Storage;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Storage
  });
};
const idlInfo = {
  needsPerGlobalProxyHandler: false,
  supportsIndexedProperties: false,
  supportsNamedProperties: true,
  hasIndexedSetter: false,
  hasNamedSetter: true,
  hasNamedDeleter: true,
  overrideBuiltins: false,
  indexedName: "",
  indexedUnsupported: null,
  indexedUnsupportedValue: null,
  namedName: "getItem",
  namedUnsupported: {
    type: "extended-attribute",
    name: "WebIDL2JSValueAsUnsupported",
    rhs: { type: "identifier", value: "null" },
    arguments: []
  },
  namedUnsupportedValue: "null"
};
const proxyHandler = utils.getProxyHandler(idlInfo);
