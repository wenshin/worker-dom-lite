"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/DOMStringMap-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "DOMStringMap";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("DOMStringMap", globalObject);
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
  class DOMStringMap {
    constructor() {
      throw new TypeError("Illegal constructor");
    }
  }
  Object.defineProperties(DOMStringMap.prototype, {
    [Symbol.toStringTag]: { value: "DOMStringMap", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = DOMStringMap;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: DOMStringMap
  });
};
const idlInfo = {
  needsPerGlobalProxyHandler: true,
  supportsIndexedProperties: false,
  supportsNamedProperties: true,
  hasIndexedSetter: false,
  hasNamedSetter: true,
  hasNamedDeleter: true,
  overrideBuiltins: true,
  indexedName: "",
  indexedUnsupported: null,
  indexedUnsupportedValue: null,
  namedName: "",
  namedUnsupported: {
    type: "extended-attribute",
    name: "WebIDL2JSValueAsUnsupported",
    rhs: { type: "identifier", value: "undefined" },
    arguments: []
  },
  namedUnsupportedValue: "undefined"
};
const proxyHandler = utils.getProxyHandler(idlInfo);
