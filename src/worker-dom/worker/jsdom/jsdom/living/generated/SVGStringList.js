"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../svg/SVGStringList-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "SVGStringList";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("SVGStringList", globalObject);
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
  class SVGStringList {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    clear() {
      const esValue = this || globalObject;

      return esValue[implSymbol].clear();
    }

    initialize(newItem) {
      const esValue = this || globalObject;

      return esValue[implSymbol].initialize(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    getItem(index) {
      const esValue = this || globalObject;

      return esValue[implSymbol].getItem(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    insertItemBefore(newItem, index) {
      const esValue = this || globalObject;

      return esValue[implSymbol].insertItemBefore(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    replaceItem(newItem, index) {
      const esValue = this || globalObject;

      return esValue[implSymbol].replaceItem(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    removeItem(index) {
      const esValue = this || globalObject;

      return esValue[implSymbol].removeItem(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    appendItem(newItem) {
      const esValue = this || globalObject;

      return esValue[implSymbol].appendItem(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get length() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["length"];
    }

    get numberOfItems() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["numberOfItems"];
    }
  }
  Object.defineProperties(SVGStringList.prototype, {
    clear: { enumerable: true },
    initialize: { enumerable: true },
    getItem: { enumerable: true },
    insertItemBefore: { enumerable: true },
    replaceItem: { enumerable: true },
    removeItem: { enumerable: true },
    appendItem: { enumerable: true },
    length: { enumerable: true },
    numberOfItems: { enumerable: true },
    [Symbol.toStringTag]: { value: "SVGStringList", configurable: true },
    [Symbol.iterator]: { value: Array.prototype[Symbol.iterator], configurable: true, writable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = SVGStringList;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: SVGStringList
  });
};
const idlInfo = {
  needsPerGlobalProxyHandler: false,
  supportsIndexedProperties: true,
  supportsNamedProperties: false,
  hasIndexedSetter: true,
  hasNamedSetter: false,
  hasNamedDeleter: false,
  overrideBuiltins: false,
  indexedName: "getItem",
  indexedUnsupported: null,
  indexedUnsupportedValue: null,
  namedName: "",
  namedUnsupported: null,
  namedUnsupportedValue: null
};
const proxyHandler = utils.getProxyHandler(idlInfo);
