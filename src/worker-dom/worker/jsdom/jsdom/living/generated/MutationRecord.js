"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../mutation-observer/MutationRecord-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "MutationRecord";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("MutationRecord", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  class MutationRecord {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    get type() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["type"];
    }

    get target() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "target", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["target"]);
      });
    }

    get addedNodes() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "addedNodes", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["addedNodes"]);
      });
    }

    get removedNodes() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "removedNodes", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["removedNodes"]);
      });
    }

    get previousSibling() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["previousSibling"]);
    }

    get nextSibling() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["nextSibling"]);
    }

    get attributeName() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["attributeName"];
    }

    get attributeNamespace() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["attributeNamespace"];
    }

    get oldValue() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["oldValue"];
    }
  }
  Object.defineProperties(MutationRecord.prototype, {
    type: { enumerable: true },
    target: { enumerable: true },
    addedNodes: { enumerable: true },
    removedNodes: { enumerable: true },
    previousSibling: { enumerable: true },
    nextSibling: { enumerable: true },
    attributeName: { enumerable: true },
    attributeNamespace: { enumerable: true },
    oldValue: { enumerable: true },
    [Symbol.toStringTag]: { value: "MutationRecord", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = MutationRecord;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: MutationRecord
  });
};
