"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../range/AbstractRange-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "AbstractRange";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("AbstractRange", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

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
  const wrapper = utils.makeWrapper(AbstractRange, globalObject);

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
  class AbstractRange {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    get startContainer() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["startContainer"]);
    }

    get startOffset() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["startOffset"];
    }

    get endContainer() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["endContainer"]);
    }

    get endOffset() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["endOffset"];
    }

    get collapsed() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["collapsed"];
    }
  }
  Object.defineProperties(AbstractRange.prototype, {
    startContainer: { enumerable: true },
    startOffset: { enumerable: true },
    endContainer: { enumerable: true },
    endOffset: { enumerable: true },
    collapsed: { enumerable: true },
    [Symbol.toStringTag]: { value: "AbstractRange", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = AbstractRange;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: AbstractRange
  });
};
