"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");

const Range = require("./Range.js");
const Node = require("./Node.js");
const ceReactionsPreSteps_helpers_custom_elements = require("../helpers/custom-elements.js").ceReactionsPreSteps;
const ceReactionsPostSteps_helpers_custom_elements = require("../helpers/custom-elements.js").ceReactionsPostSteps;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "Selection";

exports.is = function is(obj) {
  return utils.isObject(obj) && utils.hasOwn(obj, implSymbol) && obj[implSymbol] instanceof Impl.implementation;
};
exports.isImpl = function isImpl(obj) {
  return utils.isObject(obj) && obj instanceof Impl.implementation;
};
exports.convert = function convert(obj, { context = "The provided value" } = {}) {
  if (exports.is(obj)) {
    return utils.implForWrapper(obj);
  }
  throw new TypeError(`${context} is not of type 'Selection'.`);
};

exports.create = function create(globalObject, constructorArgs, privateData) {
  if (globalObject[ctorRegistrySymbol] === undefined) {
    throw new Error("Internal error: invalid global object");
  }

  const ctor = globalObject[ctorRegistrySymbol]["Selection"];
  if (ctor === undefined) {
    throw new Error("Internal error: constructor Selection is not installed on the passed global object");
  }

  let obj = Object.create(ctor.prototype);
  obj = exports.setup(obj, globalObject, constructorArgs, privateData);
  return obj;
};
exports.createImpl = function createImpl(globalObject, constructorArgs, privateData) {
  const obj = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(obj);
};
exports._internalSetup = function _internalSetup(obj, globalObject) {};
exports.setup = function setup(obj, globalObject, constructorArgs = [], privateData = {}) {
  privateData.wrapper = obj;

  exports._internalSetup(obj, globalObject);
  Object.defineProperty(obj, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  obj[implSymbol][utils.wrapperSymbol] = obj;
  if (Impl.init) {
    Impl.init(obj[implSymbol], privateData);
  }
  return obj;
};

exports.install = function install(globalObject) {
  class Selection {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    getRangeAt(index) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'getRangeAt' on 'Selection': 1 argument required, but only " +
            arguments.length +
            " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["unsigned long"](curArg, {
          context: "Failed to execute 'getRangeAt' on 'Selection': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].getRangeAt(...args));
    }

    addRange(range) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'addRange' on 'Selection': 1 argument required, but only " + arguments.length + " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = Range.convert(curArg, { context: "Failed to execute 'addRange' on 'Selection': parameter 1" });
        args.push(curArg);
      }
      return esValue[implSymbol].addRange(...args);
    }

    removeRange(range) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'removeRange' on 'Selection': 1 argument required, but only " +
            arguments.length +
            " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = Range.convert(curArg, { context: "Failed to execute 'removeRange' on 'Selection': parameter 1" });
        args.push(curArg);
      }
      return esValue[implSymbol].removeRange(...args);
    }

    removeAllRanges() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      return esValue[implSymbol].removeAllRanges();
    }

    empty() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      return esValue[implSymbol].empty();
    }

    collapse(node) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'collapse' on 'Selection': 1 argument required, but only " + arguments.length + " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg === null || curArg === undefined) {
          curArg = null;
        } else {
          curArg = Node.convert(curArg, { context: "Failed to execute 'collapse' on 'Selection': parameter 1" });
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          curArg = conversions["unsigned long"](curArg, {
            context: "Failed to execute 'collapse' on 'Selection': parameter 2"
          });
        } else {
          curArg = 0;
        }
        args.push(curArg);
      }
      return esValue[implSymbol].collapse(...args);
    }

    setPosition(node) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'setPosition' on 'Selection': 1 argument required, but only " +
            arguments.length +
            " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg === null || curArg === undefined) {
          curArg = null;
        } else {
          curArg = Node.convert(curArg, { context: "Failed to execute 'setPosition' on 'Selection': parameter 1" });
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          curArg = conversions["unsigned long"](curArg, {
            context: "Failed to execute 'setPosition' on 'Selection': parameter 2"
          });
        } else {
          curArg = 0;
        }
        args.push(curArg);
      }
      return esValue[implSymbol].setPosition(...args);
    }

    collapseToStart() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      return esValue[implSymbol].collapseToStart();
    }

    collapseToEnd() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      return esValue[implSymbol].collapseToEnd();
    }

    extend(node) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'extend' on 'Selection': 1 argument required, but only " + arguments.length + " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = Node.convert(curArg, { context: "Failed to execute 'extend' on 'Selection': parameter 1" });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          curArg = conversions["unsigned long"](curArg, {
            context: "Failed to execute 'extend' on 'Selection': parameter 2"
          });
        } else {
          curArg = 0;
        }
        args.push(curArg);
      }
      return esValue[implSymbol].extend(...args);
    }

    setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      if (arguments.length < 4) {
        throw new TypeError(
          "Failed to execute 'setBaseAndExtent' on 'Selection': 4 arguments required, but only " +
            arguments.length +
            " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = Node.convert(curArg, { context: "Failed to execute 'setBaseAndExtent' on 'Selection': parameter 1" });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions["unsigned long"](curArg, {
          context: "Failed to execute 'setBaseAndExtent' on 'Selection': parameter 2"
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[2];
        curArg = Node.convert(curArg, { context: "Failed to execute 'setBaseAndExtent' on 'Selection': parameter 3" });
        args.push(curArg);
      }
      {
        let curArg = arguments[3];
        curArg = conversions["unsigned long"](curArg, {
          context: "Failed to execute 'setBaseAndExtent' on 'Selection': parameter 4"
        });
        args.push(curArg);
      }
      return esValue[implSymbol].setBaseAndExtent(...args);
    }

    selectAllChildren(node) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'selectAllChildren' on 'Selection': 1 argument required, but only " +
            arguments.length +
            " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = Node.convert(curArg, { context: "Failed to execute 'selectAllChildren' on 'Selection': parameter 1" });
        args.push(curArg);
      }
      return esValue[implSymbol].selectAllChildren(...args);
    }

    deleteFromDocument() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol].deleteFromDocument();
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    containsNode(node) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'containsNode' on 'Selection': 1 argument required, but only " +
            arguments.length +
            " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = Node.convert(curArg, { context: "Failed to execute 'containsNode' on 'Selection': parameter 1" });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          curArg = conversions["boolean"](curArg, {
            context: "Failed to execute 'containsNode' on 'Selection': parameter 2"
          });
        } else {
          curArg = false;
        }
        args.push(curArg);
      }
      return esValue[implSymbol].containsNode(...args);
    }

    toString() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      return esValue[implSymbol].toString();
    }

    get anchorNode() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]["anchorNode"]);
    }

    get anchorOffset() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      return esValue[implSymbol]["anchorOffset"];
    }

    get focusNode() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]["focusNode"]);
    }

    get focusOffset() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      return esValue[implSymbol]["focusOffset"];
    }

    get isCollapsed() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      return esValue[implSymbol]["isCollapsed"];
    }

    get rangeCount() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

      return esValue[implSymbol]["rangeCount"];
    }

    get type() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("Illegal invocation");
      }

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

const Impl = require("../selection/Selection-impl.js");
