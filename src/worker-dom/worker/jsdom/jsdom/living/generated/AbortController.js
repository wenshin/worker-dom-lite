"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../aborting/AbortController-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "AbortController";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("AbortController", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window", "Worker"]);

exports.install = globalObject => {
  class AbortController {
    constructor() {
      return exports.setup(Object.create(new.target.prototype), globalObject, undefined);
    }

    abort() {
      const esValue = this || globalObject;

      return esValue[implSymbol].abort();
    }

    get signal() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "signal", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["signal"]);
      });
    }
  }
  Object.defineProperties(AbortController.prototype, {
    abort: { enumerable: true },
    signal: { enumerable: true },
    [Symbol.toStringTag]: { value: "AbortController", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = AbortController;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: AbortController
  });
};
