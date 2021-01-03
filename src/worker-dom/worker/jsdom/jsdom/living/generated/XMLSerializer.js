"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../domparsing/XMLSerializer-impl.js");

const Node = require("./Node.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "XMLSerializer";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("XMLSerializer", globalObject);
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
  class XMLSerializer {
    constructor() {
      return exports.setup(Object.create(new.target.prototype), globalObject, undefined);
    }

    serializeToString(root) {
      const esValue = this || globalObject;

      return esValue[implSymbol].serializeToString(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }
  }
  Object.defineProperties(XMLSerializer.prototype, {
    serializeToString: { enumerable: true },
    [Symbol.toStringTag]: { value: "XMLSerializer", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = XMLSerializer;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: XMLSerializer
  });
};
