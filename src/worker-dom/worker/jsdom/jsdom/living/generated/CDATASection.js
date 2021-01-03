"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/CDATASection-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const Text = require("./Text.js");

const interfaceName = "CDATASection";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("CDATASection", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  Text._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  if (globalObject.Text === undefined) {
    throw new Error("Internal error: attempting to evaluate CDATASection before Text");
  }
  class CDATASection extends globalObject.Text {
    constructor() {
      throw new TypeError("Illegal constructor");
    }
  }
  Object.defineProperties(CDATASection.prototype, {
    [Symbol.toStringTag]: { value: "CDATASection", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = CDATASection;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: CDATASection
  });
};
