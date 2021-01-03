"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLUnknownElement-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLUnknownElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLUnknownElement", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  HTMLElement._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  if (globalObject.HTMLElement === undefined) {
    throw new Error("Internal error: attempting to evaluate HTMLUnknownElement before HTMLElement");
  }
  class HTMLUnknownElement extends globalObject.HTMLElement {
    constructor() {
      throw new TypeError("Illegal constructor");
    }
  }
  Object.defineProperties(HTMLUnknownElement.prototype, {
    [Symbol.toStringTag]: { value: "HTMLUnknownElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLUnknownElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLUnknownElement
  });
};
