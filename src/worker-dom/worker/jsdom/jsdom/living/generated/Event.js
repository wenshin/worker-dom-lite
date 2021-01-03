"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../events/Event-impl.js");

const EventInit = require("./EventInit.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "Event";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("Event", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  Object.defineProperties(
    wrapper,
    Object.getOwnPropertyDescriptors({
      get isTrusted() {
        const esValue = this || globalObject;
        return esValue[implSymbol]["isTrusted"];
      }
    })
  );

  Object.defineProperties(wrapper, { isTrusted: { configurable: false } });
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window", "Worker", "AudioWorklet"]);

exports.install = globalObject => {
  class Event {
    constructor(type) {
      return exports.setup(Object.create(new.target.prototype), globalObject, arguments);
    }

    composedPath() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].composedPath());
    }

    stopPropagation() {
      const esValue = this || globalObject;

      return esValue[implSymbol].stopPropagation();
    }

    stopImmediatePropagation() {
      const esValue = this || globalObject;

      return esValue[implSymbol].stopImmediatePropagation();
    }

    preventDefault() {
      const esValue = this || globalObject;

      return esValue[implSymbol].preventDefault();
    }

    initEvent(type) {
      const esValue = this || globalObject;

      return esValue[implSymbol].initEvent(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get type() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["type"];
    }

    get target() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["target"]);
    }

    get srcElement() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["srcElement"]);
    }

    get currentTarget() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["currentTarget"]);
    }

    get eventPhase() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["eventPhase"];
    }

    get cancelBubble() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["cancelBubble"];
    }

    set cancelBubble(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["cancelBubble"] = V;
    }

    get bubbles() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["bubbles"];
    }

    get cancelable() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["cancelable"];
    }

    get returnValue() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["returnValue"];
    }

    set returnValue(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["returnValue"] = V;
    }

    get defaultPrevented() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["defaultPrevented"];
    }

    get composed() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["composed"];
    }

    get timeStamp() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["timeStamp"];
    }
  }
  Object.defineProperties(Event.prototype, {
    composedPath: { enumerable: true },
    stopPropagation: { enumerable: true },
    stopImmediatePropagation: { enumerable: true },
    preventDefault: { enumerable: true },
    initEvent: { enumerable: true },
    type: { enumerable: true },
    target: { enumerable: true },
    srcElement: { enumerable: true },
    currentTarget: { enumerable: true },
    eventPhase: { enumerable: true },
    cancelBubble: { enumerable: true },
    bubbles: { enumerable: true },
    cancelable: { enumerable: true },
    returnValue: { enumerable: true },
    defaultPrevented: { enumerable: true },
    composed: { enumerable: true },
    timeStamp: { enumerable: true },
    [Symbol.toStringTag]: { value: "Event", configurable: true },
    NONE: { value: 0, enumerable: true },
    CAPTURING_PHASE: { value: 1, enumerable: true },
    AT_TARGET: { value: 2, enumerable: true },
    BUBBLING_PHASE: { value: 3, enumerable: true }
  });
  Object.defineProperties(Event, {
    NONE: { value: 0, enumerable: true },
    CAPTURING_PHASE: { value: 1, enumerable: true },
    AT_TARGET: { value: 2, enumerable: true },
    BUBBLING_PHASE: { value: 3, enumerable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = Event;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Event
  });
};
