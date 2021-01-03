"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../range/StaticRange-impl.js");

const StaticRangeInit = require("./StaticRangeInit.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const AbstractRange = require("./AbstractRange.js");

const interfaceName = "StaticRange";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("StaticRange", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  AbstractRange._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  if (globalObject.AbstractRange === undefined) {
    throw new Error("Internal error: attempting to evaluate StaticRange before AbstractRange");
  }
  class StaticRange extends globalObject.AbstractRange {
    constructor(init) {
      return exports.setup(Object.create(new.target.prototype), globalObject, arguments);
    }
  }
  Object.defineProperties(StaticRange.prototype, {
    [Symbol.toStringTag]: { value: "StaticRange", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = StaticRange;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: StaticRange
  });
};
