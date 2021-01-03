"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../window/BarProp-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "BarProp";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("BarProp", globalObject);
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
  class BarProp {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    get visible() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["visible"];
    }
  }
  Object.defineProperties(BarProp.prototype, {
    visible: { enumerable: true },
    [Symbol.toStringTag]: { value: "BarProp", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = BarProp;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: BarProp
  });
};
