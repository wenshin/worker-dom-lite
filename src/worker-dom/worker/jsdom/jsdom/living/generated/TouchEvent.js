"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../events/TouchEvent-impl.js");

const TouchEventInit = require("./TouchEventInit.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const UIEvent = require("./UIEvent.js");

const interfaceName = "TouchEvent";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("TouchEvent", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  UIEvent._internalSetup(wrapper, globalObject);
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
  const wrapper = utils.makeWrapper(TouchEvent, globalObject);

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
  if (globalObject.UIEvent === undefined) {
    throw new Error("Internal error: attempting to evaluate TouchEvent before UIEvent");
  }
  class TouchEvent extends globalObject.UIEvent {
    constructor(type) {
      return exports.setup(Object.create(new.target.prototype), globalObject, arguments);
    }

    get touches() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["touches"]);
    }

    get targetTouches() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["targetTouches"]);
    }

    get changedTouches() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["changedTouches"]);
    }

    get altKey() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["altKey"];
    }

    get metaKey() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["metaKey"];
    }

    get ctrlKey() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["ctrlKey"];
    }

    get shiftKey() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["shiftKey"];
    }
  }
  Object.defineProperties(TouchEvent.prototype, {
    touches: { enumerable: true },
    targetTouches: { enumerable: true },
    changedTouches: { enumerable: true },
    altKey: { enumerable: true },
    metaKey: { enumerable: true },
    ctrlKey: { enumerable: true },
    shiftKey: { enumerable: true },
    [Symbol.toStringTag]: { value: "TouchEvent", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = TouchEvent;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: TouchEvent
  });
};
