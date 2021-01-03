"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/DOMTokenList-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "DOMTokenList";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("DOMTokenList", globalObject);
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
  class DOMTokenList {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    item(index) {
      const esValue = this || globalObject;

      return esValue[implSymbol].item(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    contains(token) {
      const esValue = this || globalObject;

      return esValue[implSymbol].contains(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    add() {
      const esValue = this || globalObject;

      return esValue[implSymbol].add(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    remove() {
      const esValue = this || globalObject;

      return esValue[implSymbol].remove(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    toggle(token) {
      const esValue = this || globalObject;

      return esValue[implSymbol].toggle(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    replace(token, newToken) {
      const esValue = this || globalObject;

      return esValue[implSymbol].replace(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    supports(token) {
      const esValue = this || globalObject;

      return esValue[implSymbol].supports(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get length() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["length"];
    }

    get value() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["value"];
    }

    set value(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["value"] = V;
    }

    toString() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["value"];
    }
  }
  Object.defineProperties(DOMTokenList.prototype, {
    item: { enumerable: true },
    contains: { enumerable: true },
    add: { enumerable: true },
    remove: { enumerable: true },
    toggle: { enumerable: true },
    replace: { enumerable: true },
    supports: { enumerable: true },
    length: { enumerable: true },
    value: { enumerable: true },
    toString: { enumerable: true },
    [Symbol.toStringTag]: { value: "DOMTokenList", configurable: true },
    [Symbol.iterator]: { value: Array.prototype[Symbol.iterator], configurable: true, writable: true },
    keys: { value: Array.prototype.keys, configurable: true, enumerable: true, writable: true },
    values: { value: Array.prototype[Symbol.iterator], configurable: true, enumerable: true, writable: true },
    entries: { value: Array.prototype.entries, configurable: true, enumerable: true, writable: true },
    forEach: { value: Array.prototype.forEach, configurable: true, enumerable: true, writable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = DOMTokenList;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: DOMTokenList
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
