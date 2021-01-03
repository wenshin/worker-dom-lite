"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLFontElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLFontElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLFontElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLFontElement before HTMLElement");
  }
  class HTMLFontElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get color() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "color");
      return value === null ? "" : value;
    }

    set color(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "color", V);
    }

    get face() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "face");
      return value === null ? "" : value;
    }

    set face(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "face", V);
    }

    get size() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "size");
      return value === null ? "" : value;
    }

    set size(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "size", V);
    }
  }
  Object.defineProperties(HTMLFontElement.prototype, {
    color: { enumerable: true },
    face: { enumerable: true },
    size: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLFontElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLFontElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLFontElement
  });
};
