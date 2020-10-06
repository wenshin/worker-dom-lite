"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/DocumentType-impl.js");

const Node = require("./Node.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "DocumentType";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("DocumentType", globalObject);
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
  const wrapper = utils.makeWrapper(DocumentType, globalObject);

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
    throw new Error("Internal error: attempting to evaluate DocumentType before Node");
  }
  class DocumentType extends globalObject.Node {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    before() {
      const esValue = this || globalObject;

      return esValue[implSymbol].before(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    after() {
      const esValue = this || globalObject;

      return esValue[implSymbol].after(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    replaceWith() {
      const esValue = this || globalObject;

      return esValue[implSymbol].replaceWith(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    remove() {
      const esValue = this || globalObject;

      return esValue[implSymbol].remove();
    }

    get name() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["name"];
    }

    get publicId() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["publicId"];
    }

    get systemId() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["systemId"];
    }
  }
  Object.defineProperties(DocumentType.prototype, {
    before: { enumerable: true },
    after: { enumerable: true },
    replaceWith: { enumerable: true },
    remove: { enumerable: true },
    name: { enumerable: true },
    publicId: { enumerable: true },
    systemId: { enumerable: true },
    [Symbol.toStringTag]: { value: "DocumentType", configurable: true },
    [Symbol.unscopables]: {
      value: { before: true, after: true, replaceWith: true, remove: true, __proto__: null },
      configurable: true
    }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = DocumentType;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: DocumentType
  });
};
