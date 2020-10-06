"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/ShadowRoot-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const DocumentFragment = require("./DocumentFragment.js");

const interfaceName = "ShadowRoot";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("ShadowRoot", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  DocumentFragment._internalSetup(wrapper, globalObject);
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
  const wrapper = utils.makeWrapper(ShadowRoot, globalObject);

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
  if (globalObject.DocumentFragment === undefined) {
    throw new Error("Internal error: attempting to evaluate ShadowRoot before DocumentFragment");
  }
  class ShadowRoot extends globalObject.DocumentFragment {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    get mode() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["mode"]);
    }

    get host() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["host"]);
    }

    get innerHTML() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["innerHTML"];
    }

    set innerHTML(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["innerHTML"] = V;
    }

    get activeElement() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["activeElement"]);
    }
  }
  Object.defineProperties(ShadowRoot.prototype, {
    mode: { enumerable: true },
    host: { enumerable: true },
    innerHTML: { enumerable: true },
    activeElement: { enumerable: true },
    [Symbol.toStringTag]: { value: "ShadowRoot", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = ShadowRoot;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: ShadowRoot
  });
};
