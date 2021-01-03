"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLScriptElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLScriptElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLScriptElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLScriptElement before HTMLElement");
  }
  class HTMLScriptElement extends globalObject.HTMLElement {
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

    get defer() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "defer");
    }

    set defer(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "defer", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "defer");
      }
    }

    get crossOrigin() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "crossorigin");
      return value === null ? "" : value;
    }

    set crossOrigin(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "crossorigin", V);
    }

    get text() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["text"];
    }

    set text(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["text"] = V;
    }

    get charset() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "charset");
      return value === null ? "" : value;
    }

    set charset(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "charset", V);
    }

    get event() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "event");
      return value === null ? "" : value;
    }

    set event(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "event", V);
    }

    get htmlFor() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "for");
      return value === null ? "" : value;
    }

    set htmlFor(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "for", V);
    }
  }
  Object.defineProperties(HTMLScriptElement.prototype, {
    src: { enumerable: true },
    type: { enumerable: true },
    defer: { enumerable: true },
    crossOrigin: { enumerable: true },
    text: { enumerable: true },
    charset: { enumerable: true },
    event: { enumerable: true },
    htmlFor: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLScriptElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLScriptElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLScriptElement
  });
};
