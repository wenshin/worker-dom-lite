"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/SVGGraphicsElement-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const SVGElement = require("./SVGElement.js");

const interfaceName = "SVGGraphicsElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("SVGGraphicsElement", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  SVGElement._internalSetup(wrapper, globalObject);
};

exports.setup = (wrapper, globalObject, constructorArgs = [], privateData = {}) => {
  privateData.wrapper = wrapper;

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper;
};

exports.new = globalObject => {
  const wrapper = utils.makeWrapper(SVGGraphicsElement, globalObject);

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: Object.create(Impl.implementation.prototype),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper[implSymbol];
};

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  if (globalObject.SVGElement === undefined) {
    throw new Error("Internal error: attempting to evaluate SVGGraphicsElement before SVGElement");
  }
  class SVGGraphicsElement extends globalObject.SVGElement {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    get requiredExtensions() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.getSameObject(this, "requiredExtensions", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["requiredExtensions"]);
      });
    }

    get systemLanguage() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.getSameObject(this, "systemLanguage", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["systemLanguage"]);
      });
    }
  }
  Object.defineProperties(SVGGraphicsElement.prototype, {
    requiredExtensions: { enumerable: true },
    systemLanguage: { enumerable: true },
    [Symbol.toStringTag]: { value: "SVGGraphicsElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = SVGGraphicsElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: SVGGraphicsElement
  });
};
