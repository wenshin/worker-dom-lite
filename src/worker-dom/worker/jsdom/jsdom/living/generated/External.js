"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../window/External-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "External";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("External", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  class External {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    AddSearchProvider() {
      const esValue = this || globalObject;

      return esValue[implSymbol].AddSearchProvider();
    }

    IsSearchProviderInstalled() {
      const esValue = this || globalObject;

      return esValue[implSymbol].IsSearchProviderInstalled();
    }
  }
  Object.defineProperties(External.prototype, {
    AddSearchProvider: { enumerable: true },
    IsSearchProviderInstalled: { enumerable: true },
    [Symbol.toStringTag]: { value: "External", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = External;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: External
  });
};
