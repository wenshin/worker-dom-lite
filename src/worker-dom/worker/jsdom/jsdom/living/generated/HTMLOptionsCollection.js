"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLOptionsCollection-impl.js");

const HTMLOptionElement = require("./HTMLOptionElement.js");
const HTMLOptGroupElement = require("./HTMLOptGroupElement.js");
const HTMLElement = require("./HTMLElement.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLCollection = require("./HTMLCollection.js");

const interfaceName = "HTMLOptionsCollection";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLOptionsCollection", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  HTMLCollection._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl, (wrapper, globalObject) => {
  wrapper = new Proxy(wrapper, proxyHandler);
});

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  if (globalObject.HTMLCollection === undefined) {
    throw new Error("Internal error: attempting to evaluate HTMLOptionsCollection before HTMLCollection");
  }
  class HTMLOptionsCollection extends globalObject.HTMLCollection {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    add(element) {
      const esValue = this || globalObject;

      return esValue[implSymbol].add(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    remove(index) {
      const esValue = this || globalObject;

      return esValue[implSymbol].remove(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get length() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["length"];
    }

    set length(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["length"] = V;
    }

    get selectedIndex() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["selectedIndex"];
    }

    set selectedIndex(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["selectedIndex"] = V;
    }
  }
  Object.defineProperties(HTMLOptionsCollection.prototype, {
    add: { enumerable: true },
    remove: { enumerable: true },
    length: { enumerable: true },
    selectedIndex: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLOptionsCollection", configurable: true },
    [Symbol.iterator]: { value: Array.prototype[Symbol.iterator], configurable: true, writable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLOptionsCollection;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLOptionsCollection
  });
};
const idlInfo = {
  needsPerGlobalProxyHandler: true,
  supportsIndexedProperties: true,
  supportsNamedProperties: true,
  hasIndexedSetter: true,
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
