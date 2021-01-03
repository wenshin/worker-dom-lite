"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../range/Range-impl.js");

const Node = require("./Node.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const AbstractRange = require("./AbstractRange.js");

const interfaceName = "Range";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("Range", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  AbstractRange._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  if (globalObject.AbstractRange === undefined) {
    throw new Error("Internal error: attempting to evaluate Range before AbstractRange");
  }
  class Range extends globalObject.AbstractRange {
    constructor() {
      return exports.setup(Object.create(new.target.prototype), globalObject, undefined);
    }

    setStart(node, offset) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setStart(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    setEnd(node, offset) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setEnd(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    setStartBefore(node) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setStartBefore(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    setStartAfter(node) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setStartAfter(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    setEndBefore(node) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setEndBefore(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    setEndAfter(node) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setEndAfter(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    collapse() {
      const esValue = this || globalObject;

      return esValue[implSymbol].collapse(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    selectNode(node) {
      const esValue = this || globalObject;

      return esValue[implSymbol].selectNode(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    selectNodeContents(node) {
      const esValue = this || globalObject;

      return esValue[implSymbol].selectNodeContents(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    compareBoundaryPoints(how, sourceRange) {
      const esValue = this || globalObject;

      return esValue[implSymbol].compareBoundaryPoints(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    deleteContents() {
      const esValue = this || globalObject;

      return esValue[implSymbol].deleteContents();
    }

    extractContents() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].extractContents());
    }

    cloneContents() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].cloneContents());
    }

    insertNode(node) {
      const esValue = this || globalObject;

      return esValue[implSymbol].insertNode(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    surroundContents(newParent) {
      const esValue = this || globalObject;

      return esValue[implSymbol].surroundContents(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    cloneRange() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].cloneRange());
    }

    detach() {
      const esValue = this || globalObject;

      return esValue[implSymbol].detach();
    }

    isPointInRange(node, offset) {
      const esValue = this || globalObject;

      return esValue[implSymbol].isPointInRange(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    comparePoint(node, offset) {
      const esValue = this || globalObject;

      return esValue[implSymbol].comparePoint(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    intersectsNode(node) {
      const esValue = this || globalObject;

      return esValue[implSymbol].intersectsNode(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    toString() {
      const esValue = this || globalObject;

      return esValue[implSymbol].toString();
    }

    createContextualFragment(fragment) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].createContextualFragment(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    get commonAncestorContainer() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["commonAncestorContainer"]);
    }
  }
  Object.defineProperties(Range.prototype, {
    setStart: { enumerable: true },
    setEnd: { enumerable: true },
    setStartBefore: { enumerable: true },
    setStartAfter: { enumerable: true },
    setEndBefore: { enumerable: true },
    setEndAfter: { enumerable: true },
    collapse: { enumerable: true },
    selectNode: { enumerable: true },
    selectNodeContents: { enumerable: true },
    compareBoundaryPoints: { enumerable: true },
    deleteContents: { enumerable: true },
    extractContents: { enumerable: true },
    cloneContents: { enumerable: true },
    insertNode: { enumerable: true },
    surroundContents: { enumerable: true },
    cloneRange: { enumerable: true },
    detach: { enumerable: true },
    isPointInRange: { enumerable: true },
    comparePoint: { enumerable: true },
    intersectsNode: { enumerable: true },
    toString: { enumerable: true },
    createContextualFragment: { enumerable: true },
    commonAncestorContainer: { enumerable: true },
    [Symbol.toStringTag]: { value: "Range", configurable: true },
    START_TO_START: { value: 0, enumerable: true },
    START_TO_END: { value: 1, enumerable: true },
    END_TO_END: { value: 2, enumerable: true },
    END_TO_START: { value: 3, enumerable: true }
  });
  Object.defineProperties(Range, {
    START_TO_START: { value: 0, enumerable: true },
    START_TO_END: { value: 1, enumerable: true },
    END_TO_END: { value: 2, enumerable: true },
    END_TO_START: { value: 3, enumerable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = Range;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Range
  });
};
