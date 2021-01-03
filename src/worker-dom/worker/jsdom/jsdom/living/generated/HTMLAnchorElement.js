"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLAnchorElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLAnchorElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLAnchorElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLAnchorElement before HTMLElement");
  }
  class HTMLAnchorElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
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

    get download() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "download");
      return value === null ? "" : value;
    }

    set download(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "download", V);
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

    get text() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["text"];
    }

    set text(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["text"] = V;
    }

    get coords() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "coords");
      return value === null ? "" : value;
    }

    set coords(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "coords", V);
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

    get name() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "name");
      return value === null ? "" : value;
    }

    set name(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "name", V);
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

    get shape() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "shape");
      return value === null ? "" : value;
    }

    set shape(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "shape", V);
    }

    get href() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["href"];
    }

    set href(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["href"] = V;
    }

    toString() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["href"];
    }
  }
  Object.defineProperties(HTMLAnchorElement.prototype, {
    target: { enumerable: true },
    download: { enumerable: true },
    rel: { enumerable: true },
    relList: { enumerable: true },
    hreflang: { enumerable: true },
    type: { enumerable: true },
    text: { enumerable: true },
    coords: { enumerable: true },
    charset: { enumerable: true },
    name: { enumerable: true },
    rev: { enumerable: true },
    shape: { enumerable: true },
    href: { enumerable: true },
    toString: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLAnchorElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLAnchorElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLAnchorElement
  });
};
