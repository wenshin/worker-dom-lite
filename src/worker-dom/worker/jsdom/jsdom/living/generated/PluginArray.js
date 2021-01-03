"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../navigator/PluginArray-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "PluginArray";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("PluginArray", globalObject);
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
  class PluginArray {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    refresh() {
      const esValue = this || globalObject;

      return esValue[implSymbol].refresh(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    item(index) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].item(...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v)))
      );
    }

    namedItem(name) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].namedItem(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    get length() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["length"];
    }
  }
  Object.defineProperties(PluginArray.prototype, {
    refresh: { enumerable: true },
    item: { enumerable: true },
    namedItem: { enumerable: true },
    length: { enumerable: true },
    [Symbol.toStringTag]: { value: "PluginArray", configurable: true },
    [Symbol.iterator]: { value: Array.prototype[Symbol.iterator], configurable: true, writable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = PluginArray;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: PluginArray
  });
};
const idlInfo = {
  needsPerGlobalProxyHandler: false,
  supportsIndexedProperties: true,
  supportsNamedProperties: true,
  hasIndexedSetter: false,
  hasNamedSetter: false,
  hasNamedDeleter: false,
  overrideBuiltins: false,
  indexedName: "item",
  indexedUnsupported: {
    type: "extended-attribute",
    name: "WebIDL2JSValueAsUnsupported",
    rhs: { type: "identifier", value: "null" },
    arguments: []
  },
  indexedUnsupportedValue: "null",
  namedName: "namedItem",
  namedUnsupported: {
    type: "extended-attribute",
    name: "WebIDL2JSValueAsUnsupported",
    rhs: { type: "identifier", value: "null" },
    arguments: []
  },
  namedUnsupportedValue: "null"
};
const proxyHandler = utils.getProxyHandler(idlInfo);
