"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../attributes/Attr-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const Node = require("./Node.js");

const interfaceName = "Attr";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("Attr", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  Node._internalSetup(wrapper, globalObject);
};

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
  const wrapper = utils.makeWrapper(Attr, globalObject);

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
  if (globalObject.Node === undefined) {
    throw new Error("Internal error: attempting to evaluate Attr before Node");
  }
  class Attr extends globalObject.Node {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    get namespaceURI() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["namespaceURI"];
    }

    get prefix() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["prefix"];
    }

    get localName() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["localName"];
    }

    get name() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["name"];
    }

    get value() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["value"];
    }

    set value(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["value"] = V;
    }

    get ownerElement() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["ownerElement"]);
    }

    get specified() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["specified"];
    }
  }
  Object.defineProperties(Attr.prototype, {
    namespaceURI: { enumerable: true },
    prefix: { enumerable: true },
    localName: { enumerable: true },
    name: { enumerable: true },
    value: { enumerable: true },
    ownerElement: { enumerable: true },
    specified: { enumerable: true },
    [Symbol.toStringTag]: { value: "Attr", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = Attr;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Attr
  });
};
