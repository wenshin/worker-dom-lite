"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../events/WheelEvent-impl.js");

const WheelEventInit = require("./WheelEventInit.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const MouseEvent = require("./MouseEvent.js");

const interfaceName = "WheelEvent";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("WheelEvent", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  MouseEvent._internalSetup(wrapper, globalObject);
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
  const wrapper = utils.makeWrapper(WheelEvent, globalObject);

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
  if (globalObject.MouseEvent === undefined) {
    throw new Error("Internal error: attempting to evaluate WheelEvent before MouseEvent");
  }
  class WheelEvent extends globalObject.MouseEvent {
    constructor(type) {
      return exports.setup(Object.create(new.target.prototype), globalObject, arguments);
    }

    get deltaX() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["deltaX"];
    }

    get deltaY() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["deltaY"];
    }

    get deltaZ() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["deltaZ"];
    }

    get deltaMode() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["deltaMode"];
    }
  }
  Object.defineProperties(WheelEvent.prototype, {
    deltaX: { enumerable: true },
    deltaY: { enumerable: true },
    deltaZ: { enumerable: true },
    deltaMode: { enumerable: true },
    [Symbol.toStringTag]: { value: "WheelEvent", configurable: true },
    DOM_DELTA_PIXEL: { value: 0x00, enumerable: true },
    DOM_DELTA_LINE: { value: 0x01, enumerable: true },
    DOM_DELTA_PAGE: { value: 0x02, enumerable: true }
  });
  Object.defineProperties(WheelEvent, {
    DOM_DELTA_PIXEL: { value: 0x00, enumerable: true },
    DOM_DELTA_LINE: { value: 0x01, enumerable: true },
    DOM_DELTA_PAGE: { value: 0x02, enumerable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = WheelEvent;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: WheelEvent
  });
};
