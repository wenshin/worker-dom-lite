"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../navigator/Plugin-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "Plugin";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("Plugin", globalObject);
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
  class Plugin {
    constructor() {
      throw new TypeError("Illegal constructor");
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

    get name() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["name"];
    }

    get description() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["description"];
    }

    get filename() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["filename"];
    }

    get length() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["length"];
    }
  }
  Object.defineProperties(Plugin.prototype, {
    item: { enumerable: true },
    namedItem: { enumerable: true },
    name: { enumerable: true },
    description: { enumerable: true },
    filename: { enumerable: true },
    length: { enumerable: true },
    [Symbol.toStringTag]: { value: "Plugin", configurable: true },
    [Symbol.iterator]: { value: Array.prototype[Symbol.iterator], configurable: true, writable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = Plugin;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Plugin
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
