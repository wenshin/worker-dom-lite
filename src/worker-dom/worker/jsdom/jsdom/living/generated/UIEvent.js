"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../events/UIEvent-impl.js");

const UIEventInit = require("./UIEventInit.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const Event = require("./Event.js");

const interfaceName = "UIEvent";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("UIEvent", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  Event._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  if (globalObject.Event === undefined) {
    throw new Error("Internal error: attempting to evaluate UIEvent before Event");
  }
  class UIEvent extends globalObject.Event {
    constructor(type) {
      return exports.setup(Object.create(new.target.prototype), globalObject, arguments);
    }

    initUIEvent(typeArg) {
      const esValue = this || globalObject;

      return esValue[implSymbol].initUIEvent(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get view() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["view"]);
    }

    get detail() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["detail"];
    }

    get which() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["which"];
    }
  }
  Object.defineProperties(UIEvent.prototype, {
    initUIEvent: { enumerable: true },
    view: { enumerable: true },
    detail: { enumerable: true },
    which: { enumerable: true },
    [Symbol.toStringTag]: { value: "UIEvent", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = UIEvent;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: UIEvent
  });
};
