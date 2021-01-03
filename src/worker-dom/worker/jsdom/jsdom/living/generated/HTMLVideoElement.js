"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLVideoElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const parseNonNegativeInteger_helpers_strings = require("../helpers/strings.js").parseNonNegativeInteger;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLMediaElement = require("./HTMLMediaElement.js");

const interfaceName = "HTMLVideoElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLVideoElement", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  HTMLMediaElement._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  if (globalObject.HTMLMediaElement === undefined) {
    throw new Error("Internal error: attempting to evaluate HTMLVideoElement before HTMLMediaElement");
  }
  class HTMLVideoElement extends globalObject.HTMLMediaElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get width() {
      const esValue = this || globalObject;

      let value = esValue[implSymbol].getAttributeNS(null, "width");
      if (value === null) {
        return 0;
      }
      value = parseNonNegativeInteger_helpers_strings(value);
      return value !== null && value >= 0 && value <= 2147483647 ? value : 0;
    }

    set width(V) {
      const esValue = this || globalObject;

      const n = V <= 2147483647 ? V : 0;
      esValue[implSymbol].setAttributeNS(null, "width", String(n));
    }

    get height() {
      const esValue = this || globalObject;

      let value = esValue[implSymbol].getAttributeNS(null, "height");
      if (value === null) {
        return 0;
      }
      value = parseNonNegativeInteger_helpers_strings(value);
      return value !== null && value >= 0 && value <= 2147483647 ? value : 0;
    }

    set height(V) {
      const esValue = this || globalObject;

      const n = V <= 2147483647 ? V : 0;
      esValue[implSymbol].setAttributeNS(null, "height", String(n));
    }

    get videoWidth() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["videoWidth"];
    }

    get videoHeight() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["videoHeight"];
    }

    get poster() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "poster");
      if (value === null) {
        return "";
      }
      return conversions.USVString(value);
    }

    set poster(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "poster", V);
    }

    get playsInline() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "playsinline");
    }

    set playsInline(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "playsinline", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "playsinline");
      }
    }
  }
  Object.defineProperties(HTMLVideoElement.prototype, {
    width: { enumerable: true },
    height: { enumerable: true },
    videoWidth: { enumerable: true },
    videoHeight: { enumerable: true },
    poster: { enumerable: true },
    playsInline: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLVideoElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLVideoElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLVideoElement
  });
};
