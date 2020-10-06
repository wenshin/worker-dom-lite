"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../selection/Selection-impl.js");

const Range = require("./Range.js");
const Node = require("./Node.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "Selection";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("Selection", globalObject);
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
  const wrapper = utils.makeWrapper(Selection, globalObject);

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
  class Selection {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    getRangeAt(index) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].getRangeAt(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    addRange(range) {
      const esValue = this || globalObject;

      return esValue[implSymbol].addRange(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    removeRange(range) {
      const esValue = this || globalObject;

      return esValue[implSymbol].removeRange(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    removeAllRanges() {
      const esValue = this || globalObject;

      return esValue[implSymbol].removeAllRanges();
    }

    empty() {
      const esValue = this || globalObject;

      return esValue[implSymbol].empty();
    }

    collapse(node) {
      const esValue = this || globalObject;

      return esValue[implSymbol].collapse(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    setPosition(node) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setPosition(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    collapseToStart() {
      const esValue = this || globalObject;

      return esValue[implSymbol].collapseToStart();
    }

    collapseToEnd() {
      const esValue = this || globalObject;

      return esValue[implSymbol].collapseToEnd();
    }

    extend(node) {
      const esValue = this || globalObject;

      return esValue[implSymbol].extend(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setBaseAndExtent(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    selectAllChildren(node) {
      const esValue = this || globalObject;

      return esValue[implSymbol].selectAllChildren(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    deleteFromDocument() {
      const esValue = this || globalObject;

      return esValue[implSymbol].deleteFromDocument();
    }

    containsNode(node) {
      const esValue = this || globalObject;

      return esValue[implSymbol].containsNode(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    toString() {
      const esValue = this || globalObject;

      return esValue[implSymbol].toString();
    }

    get anchorNode() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["anchorNode"]);
    }

    get anchorOffset() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["anchorOffset"];
    }

    get focusNode() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["focusNode"]);
    }

    get focusOffset() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["focusOffset"];
    }

    get isCollapsed() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["isCollapsed"];
    }

    get rangeCount() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["rangeCount"];
    }

    get type() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["type"];
    }
  }
  Object.defineProperties(Selection.prototype, {
    getRangeAt: { enumerable: true },
    addRange: { enumerable: true },
    removeRange: { enumerable: true },
    removeAllRanges: { enumerable: true },
    empty: { enumerable: true },
    collapse: { enumerable: true },
    setPosition: { enumerable: true },
    collapseToStart: { enumerable: true },
    collapseToEnd: { enumerable: true },
    extend: { enumerable: true },
    setBaseAndExtent: { enumerable: true },
    selectAllChildren: { enumerable: true },
    deleteFromDocument: { enumerable: true },
    containsNode: { enumerable: true },
    toString: { enumerable: true },
    anchorNode: { enumerable: true },
    anchorOffset: { enumerable: true },
    focusNode: { enumerable: true },
    focusOffset: { enumerable: true },
    isCollapsed: { enumerable: true },
    rangeCount: { enumerable: true },
    type: { enumerable: true },
    [Symbol.toStringTag]: { value: "Selection", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = Selection;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Selection
  });
};
