"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/CharacterData-impl.js");

const Node = require("./Node.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "CharacterData";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("CharacterData", globalObject);
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
  const wrapper = utils.makeWrapper(CharacterData, globalObject);

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
    throw new Error("Internal error: attempting to evaluate CharacterData before Node");
  }
  class CharacterData extends globalObject.Node {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    substringData(offset, count) {
      const esValue = this || globalObject;

      return esValue[implSymbol].substringData(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    appendData(data) {
      const esValue = this || globalObject;

      return esValue[implSymbol].appendData(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    insertData(offset, data) {
      const esValue = this || globalObject;

      return esValue[implSymbol].insertData(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    deleteData(offset, count) {
      const esValue = this || globalObject;

      return esValue[implSymbol].deleteData(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    replaceData(offset, count, data) {
      const esValue = this || globalObject;

      return esValue[implSymbol].replaceData(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
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

    get data() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["data"];
    }

    set data(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["data"] = V;
    }

    get length() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["length"];
    }

    get previousElementSibling() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["previousElementSibling"]);
    }

    get nextElementSibling() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["nextElementSibling"]);
    }
  }
  Object.defineProperties(CharacterData.prototype, {
    substringData: { enumerable: true },
    appendData: { enumerable: true },
    insertData: { enumerable: true },
    deleteData: { enumerable: true },
    replaceData: { enumerable: true },
    before: { enumerable: true },
    after: { enumerable: true },
    replaceWith: { enumerable: true },
    remove: { enumerable: true },
    data: { enumerable: true },
    length: { enumerable: true },
    previousElementSibling: { enumerable: true },
    nextElementSibling: { enumerable: true },
    [Symbol.toStringTag]: { value: "CharacterData", configurable: true },
    [Symbol.unscopables]: {
      value: { before: true, after: true, replaceWith: true, remove: true, __proto__: null },
      configurable: true
    }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = CharacterData;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: CharacterData
  });
};
