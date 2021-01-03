"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../events/ProgressEvent-impl.js");

const ProgressEventInit = require("./ProgressEventInit.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const Event = require("./Event.js");

const interfaceName = "ProgressEvent";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("ProgressEvent", globalObject);
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

const exposed = new Set(["Window", "DedicatedWorker", "SharedWorker"]);

exports.install = globalObject => {
  if (globalObject.Event === undefined) {
    throw new Error("Internal error: attempting to evaluate ProgressEvent before Event");
  }
  class ProgressEvent extends globalObject.Event {
    constructor(type) {
      return exports.setup(Object.create(new.target.prototype), globalObject, arguments);
    }

    get lengthComputable() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["lengthComputable"];
    }

    get loaded() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["loaded"];
    }

    get total() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["total"];
    }
  }
  Object.defineProperties(ProgressEvent.prototype, {
    lengthComputable: { enumerable: true },
    loaded: { enumerable: true },
    total: { enumerable: true },
    [Symbol.toStringTag]: { value: "ProgressEvent", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = ProgressEvent;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: ProgressEvent
  });
};
