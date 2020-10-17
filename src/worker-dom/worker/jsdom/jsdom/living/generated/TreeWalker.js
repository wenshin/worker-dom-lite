"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../traversal/TreeWalker-impl.js");

const Node = require("./Node.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "TreeWalker";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("TreeWalker", globalObject);
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
  const wrapper = utils.makeWrapper(TreeWalker, globalObject);

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
  class TreeWalker {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    parentNode() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].parentNode());
    }

    firstChild() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].firstChild());
    }

    lastChild() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].lastChild());
    }

    previousSibling() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].previousSibling());
    }

    nextSibling() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].nextSibling());
    }

    previousNode() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].previousNode());
    }

    nextNode() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].nextNode());
    }

    get root() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "root", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["root"]);
      });
    }

    get whatToShow() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["whatToShow"];
    }

    get filter() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["filter"]);
    }

    get currentNode() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["currentNode"]);
    }

    set currentNode(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["currentNode"] = V;
    }
  }
  Object.defineProperties(TreeWalker.prototype, {
    parentNode: { enumerable: true },
    firstChild: { enumerable: true },
    lastChild: { enumerable: true },
    previousSibling: { enumerable: true },
    nextSibling: { enumerable: true },
    previousNode: { enumerable: true },
    nextNode: { enumerable: true },
    root: { enumerable: true },
    whatToShow: { enumerable: true },
    filter: { enumerable: true },
    currentNode: { enumerable: true },
    [Symbol.toStringTag]: { value: "TreeWalker", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = TreeWalker;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: TreeWalker
  });
};
