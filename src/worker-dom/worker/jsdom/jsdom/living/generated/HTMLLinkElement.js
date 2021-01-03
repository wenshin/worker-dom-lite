"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLLinkElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLLinkElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLLinkElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLLinkElement before HTMLElement");
  }
  class HTMLLinkElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get href() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "href");
      if (value === null) {
        return "";
      }
      return conversions.USVString(value);
    }

    set href(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "href", V);
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

    get rel() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "rel");
      return value === null ? "" : value;
    }

    set rel(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "rel", V);
    }

    get relList() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "relList", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["relList"]);
      });
    }

    set relList(V) {
      const esValue = this || globalObject;

      const Q = esValue["relList"];
      if (!utils.isObject(Q)) {
        throw new TypeError("Property 'relList' is not an object");
      }
      Reflect.set(Q, "value", V);
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

    get hreflang() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "hreflang");
      return value === null ? "" : value;
    }

    set hreflang(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "hreflang", V);
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

    get charset() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "charset");
      return value === null ? "" : value;
    }

    set charset(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "charset", V);
    }

    get rev() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "rev");
      return value === null ? "" : value;
    }

    set rev(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "rev", V);
    }

    get target() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "target");
      return value === null ? "" : value;
    }

    set target(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "target", V);
    }

    get sheet() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["sheet"]);
    }
  }
  Object.defineProperties(HTMLLinkElement.prototype, {
    href: { enumerable: true },
    crossOrigin: { enumerable: true },
    rel: { enumerable: true },
    relList: { enumerable: true },
    media: { enumerable: true },
    hreflang: { enumerable: true },
    type: { enumerable: true },
    charset: { enumerable: true },
    rev: { enumerable: true },
    target: { enumerable: true },
    sheet: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLLinkElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLLinkElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLLinkElement
  });
};
