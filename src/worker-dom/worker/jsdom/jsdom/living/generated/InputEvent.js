"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../events/InputEvent-impl.js");

const InputEventInit = require("./InputEventInit.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const UIEvent = require("./UIEvent.js");

const interfaceName = "InputEvent";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("InputEvent", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  UIEvent._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  if (globalObject.UIEvent === undefined) {
    throw new Error("Internal error: attempting to evaluate InputEvent before UIEvent");
  }
  class InputEvent extends globalObject.UIEvent {
    constructor(type) {
      return exports.setup(Object.create(new.target.prototype), globalObject, arguments);
    }

    get data() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["data"];
    }

    get isComposing() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["isComposing"];
    }
  }
  Object.defineProperties(InputEvent.prototype, {
    data: { enumerable: true },
    isComposing: { enumerable: true },
    [Symbol.toStringTag]: { value: "InputEvent", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = InputEvent;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: InputEvent
  });
};
