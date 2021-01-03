"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/DOMImplementation-impl.js");

const DocumentType = require("./DocumentType.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "DOMImplementation";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("DOMImplementation", globalObject);
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
  class DOMImplementation {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    createDocumentType(qualifiedName, publicId, systemId) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].createDocumentType(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    createDocument(namespace, qualifiedName) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].createDocument(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    createHTMLDocument() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].createHTMLDocument(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    hasFeature() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasFeature();
    }
  }
  Object.defineProperties(DOMImplementation.prototype, {
    createDocumentType: { enumerable: true },
    createDocument: { enumerable: true },
    createHTMLDocument: { enumerable: true },
    hasFeature: { enumerable: true },
    [Symbol.toStringTag]: { value: "DOMImplementation", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = DOMImplementation;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: DOMImplementation
  });
};
