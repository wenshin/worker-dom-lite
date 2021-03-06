"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLSourceElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLSourceElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLSourceElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLSourceElement before HTMLElement");
  }
  class HTMLSourceElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get src() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "src");
      if (value === null) {
        return "";
      }
      return conversions.USVString(value);
    }

    set src(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "src", V);
    }

    get type() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "type");
      return value === null ? "" : value;
    }

    set type(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "type", V);
    }

    get srcset() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "srcset");
      return value === null ? "" : conversions.USVString(value);
    }

    set srcset(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "srcset", V);
    }

    get sizes() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "sizes");
      return value === null ? "" : value;
    }

    set sizes(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "sizes", V);
    }

    get media() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "media");
      return value === null ? "" : value;
    }

    set media(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "media", V);
    }
  }
  Object.defineProperties(HTMLSourceElement.prototype, {
    src: { enumerable: true },
    type: { enumerable: true },
    srcset: { enumerable: true },
    sizes: { enumerable: true },
    media: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLSourceElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLSourceElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLSourceElement
  });
};
