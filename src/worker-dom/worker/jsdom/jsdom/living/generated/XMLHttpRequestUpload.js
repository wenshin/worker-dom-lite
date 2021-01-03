"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../xhr/XMLHttpRequestUpload-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const XMLHttpRequestEventTarget = require("./XMLHttpRequestEventTarget.js");

const interfaceName = "XMLHttpRequestUpload";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("XMLHttpRequestUpload", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  XMLHttpRequestEventTarget._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window", "DedicatedWorker", "SharedWorker"]);

exports.install = globalObject => {
  if (globalObject.XMLHttpRequestEventTarget === undefined) {
    throw new Error("Internal error: attempting to evaluate XMLHttpRequestUpload before XMLHttpRequestEventTarget");
  }
  class XMLHttpRequestUpload extends globalObject.XMLHttpRequestEventTarget {
    constructor() {
      throw new TypeError("Illegal constructor");
    }
  }
  Object.defineProperties(XMLHttpRequestUpload.prototype, {
    [Symbol.toStringTag]: { value: "XMLHttpRequestUpload", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = XMLHttpRequestUpload;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: XMLHttpRequestUpload
  });
};
