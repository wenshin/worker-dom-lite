"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../traversal/NodeIterator-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "NodeIterator";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("NodeIterator", globalObject);
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
  class NodeIterator {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    nextNode() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].nextNode());
    }

    previousNode() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].previousNode());
    }

    detach() {
      const esValue = this || globalObject;

      return esValue[implSymbol].detach();
    }

    get root() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "root", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["root"]);
      });
    }

    get referenceNode() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["referenceNode"]);
    }

    get pointerBeforeReferenceNode() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["pointerBeforeReferenceNode"];
    }

    get whatToShow() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["whatToShow"];
    }

    get filter() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["filter"]);
    }
  }
  Object.defineProperties(NodeIterator.prototype, {
    nextNode: { enumerable: true },
    previousNode: { enumerable: true },
    detach: { enumerable: true },
    root: { enumerable: true },
    referenceNode: { enumerable: true },
    pointerBeforeReferenceNode: { enumerable: true },
    whatToShow: { enumerable: true },
    filter: { enumerable: true },
    [Symbol.toStringTag]: { value: "NodeIterator", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = NodeIterator;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: NodeIterator
  });
};
