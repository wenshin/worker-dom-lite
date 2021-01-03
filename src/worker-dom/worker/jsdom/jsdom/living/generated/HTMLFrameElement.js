"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLFrameElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLFrameElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLFrameElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLFrameElement before HTMLElement");
  }
  class HTMLFrameElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
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

    get scrolling() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "scrolling");
      return value === null ? "" : value;
    }

    set scrolling(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "scrolling", V);
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

    get frameBorder() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "frameborder");
      return value === null ? "" : value;
    }

    set frameBorder(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "frameborder", V);
    }

    get longDesc() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "longdesc");
      if (value === null) {
        return "";
      }
      return conversions.USVString(value);
    }

    set longDesc(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "longdesc", V);
    }

    get noResize() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "noresize");
    }

    set noResize(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "noresize", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "noresize");
      }
    }

    get contentDocument() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["contentDocument"]);
    }

    get contentWindow() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["contentWindow"]);
    }

    get marginHeight() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "marginheight");
      return value === null ? "" : value;
    }

    set marginHeight(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "marginheight", V);
    }

    get marginWidth() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "marginwidth");
      return value === null ? "" : value;
    }

    set marginWidth(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "marginwidth", V);
    }
  }
  Object.defineProperties(HTMLFrameElement.prototype, {
    name: { enumerable: true },
    scrolling: { enumerable: true },
    src: { enumerable: true },
    frameBorder: { enumerable: true },
    longDesc: { enumerable: true },
    noResize: { enumerable: true },
    contentDocument: { enumerable: true },
    contentWindow: { enumerable: true },
    marginHeight: { enumerable: true },
    marginWidth: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLFrameElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLFrameElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLFrameElement
  });
};
