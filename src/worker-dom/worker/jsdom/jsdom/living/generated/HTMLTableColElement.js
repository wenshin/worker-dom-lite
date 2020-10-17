"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLTableColElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const parseNonNegativeInteger_helpers_strings = require("../helpers/strings.js").parseNonNegativeInteger;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLTableColElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLTableColElement", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  HTMLElement._internalSetup(wrapper, globalObject);
};

exports.setup = (wrapper, globalObject, constructorArgs = [], privateData = {}) => {
  privateData.wrapper = wrapper;

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper;
};

exports.new = globalObject => {
  const wrapper = utils.makeWrapper(HTMLTableColElement, globalObject);

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: Object.create(Impl.implementation.prototype),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper[implSymbol];
};

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  if (globalObject.HTMLElement === undefined) {
    throw new Error("Internal error: attempting to evaluate HTMLTableColElement before HTMLElement");
  }
  class HTMLTableColElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get span() {
      const esValue = this || globalObject;

      let value = esValue[implSymbol].getAttributeNS(null, "span");
      if (value === null) {
        return 0;
      }
      value = parseNonNegativeInteger_helpers_strings(value);
      return value !== null && value >= 0 && value <= 2147483647 ? value : 0;
    }

    set span(V) {
      const esValue = this || globalObject;

      const n = V <= 2147483647 ? V : 0;
      esValue[implSymbol].setAttributeNS(null, "span", String(n));
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

    get ch() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "char");
      return value === null ? "" : value;
    }

    set ch(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "char", V);
    }

    get chOff() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "charoff");
      return value === null ? "" : value;
    }

    set chOff(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "charoff", V);
    }

    get vAlign() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "valign");
      return value === null ? "" : value;
    }

    set vAlign(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "valign", V);
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
  Object.defineProperties(HTMLTableColElement.prototype, {
    span: { enumerable: true },
    align: { enumerable: true },
    ch: { enumerable: true },
    chOff: { enumerable: true },
    vAlign: { enumerable: true },
    width: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLTableColElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLTableColElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLTableColElement
  });
};
