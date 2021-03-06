"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../events/MessageEvent-impl.js");

const MessageEventInit = require("./MessageEventInit.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const Event = require("./Event.js");

const interfaceName = "MessageEvent";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("MessageEvent", globalObject);
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

const exposed = new Set(["Window", "Worker", "AudioWorklet"]);

exports.install = globalObject => {
  if (globalObject.Event === undefined) {
    throw new Error("Internal error: attempting to evaluate MessageEvent before Event");
  }
  class MessageEvent extends globalObject.Event {
    constructor(type) {
      return exports.setup(Object.create(new.target.prototype), globalObject, arguments);
    }

    initMessageEvent(type) {
      const esValue = this || globalObject;

      return esValue[implSymbol].initMessageEvent(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get data() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["data"];
    }

    get origin() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["origin"];
    }

    get lastEventId() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["lastEventId"];
    }

    get source() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["source"]);
    }

    get ports() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["ports"]);
    }
  }
  Object.defineProperties(MessageEvent.prototype, {
    initMessageEvent: { enumerable: true },
    data: { enumerable: true },
    origin: { enumerable: true },
    lastEventId: { enumerable: true },
    source: { enumerable: true },
    ports: { enumerable: true },
    [Symbol.toStringTag]: { value: "MessageEvent", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = MessageEvent;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: MessageEvent
  });
};
