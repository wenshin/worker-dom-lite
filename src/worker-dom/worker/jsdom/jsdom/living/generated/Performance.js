"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../hr-time/Performance-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const EventTarget = require("./EventTarget.js");

const interfaceName = "Performance";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("Performance", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  EventTarget._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window", "Worker"]);

exports.install = globalObject => {
  if (globalObject.EventTarget === undefined) {
    throw new Error("Internal error: attempting to evaluate Performance before EventTarget");
  }
  class Performance extends globalObject.EventTarget {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    now() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].now());
    }

    toJSON() {
      const esValue = this || globalObject;

      return esValue[implSymbol].toJSON();
    }

    get timeOrigin() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["timeOrigin"]);
    }
  }
  Object.defineProperties(Performance.prototype, {
    now: { enumerable: true },
    toJSON: { enumerable: true },
    timeOrigin: { enumerable: true },
    [Symbol.toStringTag]: { value: "Performance", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = Performance;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Performance
  });
};
