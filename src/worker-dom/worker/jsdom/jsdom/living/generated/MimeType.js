"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../navigator/MimeType-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "MimeType";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("MimeType", globalObject);
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
  class MimeType {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    get type() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["type"];
    }

    get description() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["description"];
    }

    get suffixes() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["suffixes"];
    }

    get enabledPlugin() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["enabledPlugin"]);
    }
  }
  Object.defineProperties(MimeType.prototype, {
    type: { enumerable: true },
    description: { enumerable: true },
    suffixes: { enumerable: true },
    enabledPlugin: { enumerable: true },
    [Symbol.toStringTag]: { value: "MimeType", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = MimeType;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: MimeType
  });
};
