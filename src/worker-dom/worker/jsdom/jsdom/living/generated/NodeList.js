"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/NodeList-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "NodeList";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("NodeList", globalObject);
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
  class NodeList {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    item(index) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].item(...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v)))
      );
    }

    get length() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["length"];
    }
  }
  Object.defineProperties(NodeList.prototype, {
    item: { enumerable: true },
    length: { enumerable: true },
    [Symbol.toStringTag]: { value: "NodeList", configurable: true },
    [Symbol.iterator]: { value: Array.prototype[Symbol.iterator], configurable: true, writable: true },
    keys: { value: Array.prototype.keys, configurable: true, enumerable: true, writable: true },
    values: { value: Array.prototype[Symbol.iterator], configurable: true, enumerable: true, writable: true },
    entries: { value: Array.prototype.entries, configurable: true, enumerable: true, writable: true },
    forEach: { value: Array.prototype.forEach, configurable: true, enumerable: true, writable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = NodeList;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: NodeList
  });
};
const idlInfo = {
  needsPerGlobalProxyHandler: false,
  supportsIndexedProperties: true,
  supportsNamedProperties: false,
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
  namedName: "",
  namedUnsupported: null,
  namedUnsupportedValue: null
};
const proxyHandler = utils.getProxyHandler(idlInfo);
