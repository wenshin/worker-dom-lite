"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLHRElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLHRElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLHRElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLHRElement before HTMLElement");
  }
  class HTMLHRElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get align() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "align");
      return value === null ? "" : value;
    }

    set align(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "align", V);
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

    get noShade() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "noshade");
    }

    set noShade(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "noshade", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "noshade");
      }
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

    get width() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "width");
      return value === null ? "" : value;
    }

    set width(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "width", V);
    }
  }
  Object.defineProperties(HTMLHRElement.prototype, {
    align: { enumerable: true },
    color: { enumerable: true },
    noShade: { enumerable: true },
    size: { enumerable: true },
    width: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLHRElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLHRElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLHRElement
  });
};
