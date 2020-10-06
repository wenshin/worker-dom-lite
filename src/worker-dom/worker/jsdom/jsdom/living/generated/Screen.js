"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../window/Screen-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "Screen";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("Screen", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

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
  const wrapper = utils.makeWrapper(Screen, globalObject);

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
  class Screen {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    get availWidth() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["availWidth"];
    }

    get availHeight() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["availHeight"];
    }

    get width() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["width"];
    }

    get height() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["height"];
    }

    get colorDepth() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["colorDepth"];
    }

    get pixelDepth() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["pixelDepth"];
    }
  }
  Object.defineProperties(Screen.prototype, {
    availWidth: { enumerable: true },
    availHeight: { enumerable: true },
    width: { enumerable: true },
    height: { enumerable: true },
    colorDepth: { enumerable: true },
    pixelDepth: { enumerable: true },
    [Symbol.toStringTag]: { value: "Screen", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = Screen;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Screen
  });
};
