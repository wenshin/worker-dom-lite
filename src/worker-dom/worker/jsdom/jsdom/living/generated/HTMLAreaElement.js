"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLAreaElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLAreaElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLAreaElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLAreaElement before HTMLElement");
  }
  class HTMLAreaElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get alt() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "alt");
      return value === null ? "" : value;
    }

    set alt(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "alt", V);
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

    get shape() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "shape");
      return value === null ? "" : value;
    }

    set shape(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "shape", V);
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

    get noHref() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "nohref");
    }

    set noHref(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "nohref", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "nohref");
      }
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
  Object.defineProperties(HTMLAreaElement.prototype, {
    alt: { enumerable: true },
    coords: { enumerable: true },
    shape: { enumerable: true },
    target: { enumerable: true },
    rel: { enumerable: true },
    relList: { enumerable: true },
    noHref: { enumerable: true },
    href: { enumerable: true },
    toString: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLAreaElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLAreaElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLAreaElement
  });
};
