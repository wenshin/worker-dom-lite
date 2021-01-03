"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLFrameSetElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLFrameSetElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLFrameSetElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLFrameSetElement before HTMLElement");
  }
  class HTMLFrameSetElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get cols() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "cols");
      return value === null ? "" : value;
    }

    set cols(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "cols", V);
    }

    get rows() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "rows");
      return value === null ? "" : value;
    }

    set rows(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "rows", V);
    }

    get onafterprint() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onafterprint"]);
    }

    set onafterprint(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onafterprint"] = V;
    }

    get onbeforeprint() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onbeforeprint"]);
    }

    set onbeforeprint(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onbeforeprint"] = V;
    }

    get onbeforeunload() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onbeforeunload"]);
    }

    set onbeforeunload(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onbeforeunload"] = V;
    }

    get onhashchange() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onhashchange"]);
    }

    set onhashchange(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onhashchange"] = V;
    }

    get onlanguagechange() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onlanguagechange"]);
    }

    set onlanguagechange(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onlanguagechange"] = V;
    }

    get onmessage() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onmessage"]);
    }

    set onmessage(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onmessage"] = V;
    }

    get onmessageerror() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onmessageerror"]);
    }

    set onmessageerror(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onmessageerror"] = V;
    }

    get onoffline() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onoffline"]);
    }

    set onoffline(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onoffline"] = V;
    }

    get ononline() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["ononline"]);
    }

    set ononline(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["ononline"] = V;
    }

    get onpagehide() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onpagehide"]);
    }

    set onpagehide(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onpagehide"] = V;
    }

    get onpageshow() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onpageshow"]);
    }

    set onpageshow(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onpageshow"] = V;
    }

    get onpopstate() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onpopstate"]);
    }

    set onpopstate(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onpopstate"] = V;
    }

    get onrejectionhandled() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onrejectionhandled"]);
    }

    set onrejectionhandled(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onrejectionhandled"] = V;
    }

    get onstorage() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onstorage"]);
    }

    set onstorage(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onstorage"] = V;
    }

    get onunhandledrejection() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onunhandledrejection"]);
    }

    set onunhandledrejection(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onunhandledrejection"] = V;
    }

    get onunload() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onunload"]);
    }

    set onunload(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onunload"] = V;
    }
  }
  Object.defineProperties(HTMLFrameSetElement.prototype, {
    cols: { enumerable: true },
    rows: { enumerable: true },
    onafterprint: { enumerable: true },
    onbeforeprint: { enumerable: true },
    onbeforeunload: { enumerable: true },
    onhashchange: { enumerable: true },
    onlanguagechange: { enumerable: true },
    onmessage: { enumerable: true },
    onmessageerror: { enumerable: true },
    onoffline: { enumerable: true },
    ononline: { enumerable: true },
    onpagehide: { enumerable: true },
    onpageshow: { enumerable: true },
    onpopstate: { enumerable: true },
    onrejectionhandled: { enumerable: true },
    onstorage: { enumerable: true },
    onunhandledrejection: { enumerable: true },
    onunload: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLFrameSetElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLFrameSetElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLFrameSetElement
  });
};
