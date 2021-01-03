"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../events/CloseEvent-impl.js");

const CloseEventInit = require("./CloseEventInit.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const Event = require("./Event.js");

const interfaceName = "CloseEvent";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("CloseEvent", globalObject);
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

const exposed = new Set(["Window", "Worker"]);

exports.install = globalObject => {
  if (globalObject.Event === undefined) {
    throw new Error("Internal error: attempting to evaluate CloseEvent before Event");
  }
  class CloseEvent extends globalObject.Event {
    constructor(type) {
      return exports.setup(Object.create(new.target.prototype), globalObject, arguments);
    }

    get wasClean() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["wasClean"];
    }

    get code() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["code"];
    }

    get reason() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["reason"];
    }
  }
  Object.defineProperties(CloseEvent.prototype, {
    wasClean: { enumerable: true },
    code: { enumerable: true },
    reason: { enumerable: true },
    [Symbol.toStringTag]: { value: "CloseEvent", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = CloseEvent;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: CloseEvent
  });
};
