"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../domparsing/DOMParser-impl.js");

const SupportedType = require("./SupportedType.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "DOMParser";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("DOMParser", globalObject);
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
  class DOMParser {
    constructor() {
      return exports.setup(Object.create(new.target.prototype), globalObject, undefined);
    }

    parseFromString(str, type) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].parseFromString(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }
  }
  Object.defineProperties(DOMParser.prototype, {
    parseFromString: { enumerable: true },
    [Symbol.toStringTag]: { value: "DOMParser", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = DOMParser;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: DOMParser
  });
};
