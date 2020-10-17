"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../events/KeyboardEvent-impl.js");

const KeyboardEventInit = require("./KeyboardEventInit.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const UIEvent = require("./UIEvent.js");

const interfaceName = "KeyboardEvent";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("KeyboardEvent", globalObject);
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
  const wrapper = utils.makeWrapper(KeyboardEvent, globalObject);

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
    throw new Error("Internal error: attempting to evaluate KeyboardEvent before UIEvent");
  }
  class KeyboardEvent extends globalObject.UIEvent {
    constructor(type) {
      return exports.setup(Object.create(new.target.prototype), globalObject, arguments);
    }

    getModifierState(keyArg) {
      const esValue = this || globalObject;

      return esValue[implSymbol].getModifierState(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    initKeyboardEvent(typeArg) {
      const esValue = this || globalObject;

      return esValue[implSymbol].initKeyboardEvent(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get key() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["key"];
    }

    get code() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["code"];
    }

    get location() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["location"];
    }

    get ctrlKey() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["ctrlKey"];
    }

    get shiftKey() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["shiftKey"];
    }

    get altKey() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["altKey"];
    }

    get metaKey() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["metaKey"];
    }

    get repeat() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["repeat"];
    }

    get isComposing() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["isComposing"];
    }

    get charCode() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["charCode"];
    }

    get keyCode() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["keyCode"];
    }
  }
  Object.defineProperties(KeyboardEvent.prototype, {
    getModifierState: { enumerable: true },
    initKeyboardEvent: { enumerable: true },
    key: { enumerable: true },
    code: { enumerable: true },
    location: { enumerable: true },
    ctrlKey: { enumerable: true },
    shiftKey: { enumerable: true },
    altKey: { enumerable: true },
    metaKey: { enumerable: true },
    repeat: { enumerable: true },
    isComposing: { enumerable: true },
    charCode: { enumerable: true },
    keyCode: { enumerable: true },
    [Symbol.toStringTag]: { value: "KeyboardEvent", configurable: true },
    DOM_KEY_LOCATION_STANDARD: { value: 0x00, enumerable: true },
    DOM_KEY_LOCATION_LEFT: { value: 0x01, enumerable: true },
    DOM_KEY_LOCATION_RIGHT: { value: 0x02, enumerable: true },
    DOM_KEY_LOCATION_NUMPAD: { value: 0x03, enumerable: true }
  });
  Object.defineProperties(KeyboardEvent, {
    DOM_KEY_LOCATION_STANDARD: { value: 0x00, enumerable: true },
    DOM_KEY_LOCATION_LEFT: { value: 0x01, enumerable: true },
    DOM_KEY_LOCATION_RIGHT: { value: 0x02, enumerable: true },
    DOM_KEY_LOCATION_NUMPAD: { value: 0x03, enumerable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = KeyboardEvent;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: KeyboardEvent
  });
};
