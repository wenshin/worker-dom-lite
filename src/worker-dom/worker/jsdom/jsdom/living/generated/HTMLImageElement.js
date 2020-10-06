"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLImageElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const parseURLToResultingURLRecord_helpers_document_base_url = require("../helpers/document-base-url.js")
  .parseURLToResultingURLRecord;
const serializeURLwhatwg_url = require("whatwg-url").serializeURL;
const parseNonNegativeInteger_helpers_strings = require("../helpers/strings.js").parseNonNegativeInteger;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLImageElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLImageElement", globalObject);
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
  const wrapper = utils.makeWrapper(HTMLImageElement, globalObject);

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
    throw new Error("Internal error: attempting to evaluate HTMLImageElement before HTMLElement");
  }
  class HTMLImageElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get alt() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "alt");
      return value === null ? "" : value;
    }

    set alt(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "alt", V);
    }

    get src() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "src");
      if (value === null) {
        return "";
      }
      const urlRecord = parseURLToResultingURLRecord_helpers_document_base_url(
        value,
        esValue[implSymbol]._ownerDocument
      );
      if (urlRecord !== null) {
        return serializeURLwhatwg_url(urlRecord);
      }
      return conversions.USVString(value);
    }

    set src(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "src", V);
    }

    get srcset() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "srcset");
      return value === null ? "" : conversions.USVString(value);
    }

    set srcset(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "srcset", V);
    }

    get sizes() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "sizes");
      return value === null ? "" : value;
    }

    set sizes(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "sizes", V);
    }

    get crossOrigin() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "crossorigin");
      return value === null ? "" : value;
    }

    set crossOrigin(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "crossorigin", V);
    }

    get useMap() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "usemap");
      return value === null ? "" : value;
    }

    set useMap(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "usemap", V);
    }

    get isMap() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "ismap");
    }

    set isMap(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "ismap", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "ismap");
      }
    }

    get width() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["width"];
    }

    set width(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["width"] = V;
    }

    get height() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["height"];
    }

    set height(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["height"] = V;
    }

    get naturalWidth() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["naturalWidth"];
    }

    get naturalHeight() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["naturalHeight"];
    }

    get complete() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["complete"];
    }

    get currentSrc() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["currentSrc"];
    }

    get name() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "name");
      return value === null ? "" : value;
    }

    set name(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "name", V);
    }

    get lowsrc() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "lowsrc");
      if (value === null) {
        return "";
      }
      const urlRecord = parseURLToResultingURLRecord_helpers_document_base_url(
        value,
        esValue[implSymbol]._ownerDocument
      );
      if (urlRecord !== null) {
        return serializeURLwhatwg_url(urlRecord);
      }
      return conversions.USVString(value);
    }

    set lowsrc(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "lowsrc", V);
    }

    get align() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "align");
      return value === null ? "" : value;
    }

    set align(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "align", V);
    }

    get hspace() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      let value = esValue[implSymbol].getAttributeNS(null, "hspace");
      if (value === null) {
        return 0;
      }
      value = parseNonNegativeInteger_helpers_strings(value);
      return value !== null && value >= 0 && value <= 2147483647 ? value : 0;
    }

    set hspace(V) {
      const esValue = this || globalObject;

      const n = V <= 2147483647 ? V : 0;
      esValue[implSymbol].setAttributeNS(null, "hspace", String(n));
    }

    get vspace() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      let value = esValue[implSymbol].getAttributeNS(null, "vspace");
      if (value === null) {
        return 0;
      }
      value = parseNonNegativeInteger_helpers_strings(value);
      return value !== null && value >= 0 && value <= 2147483647 ? value : 0;
    }

    set vspace(V) {
      const esValue = this || globalObject;

      const n = V <= 2147483647 ? V : 0;
      esValue[implSymbol].setAttributeNS(null, "vspace", String(n));
    }

    get longDesc() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "longdesc");
      if (value === null) {
        return "";
      }
      const urlRecord = parseURLToResultingURLRecord_helpers_document_base_url(
        value,
        esValue[implSymbol]._ownerDocument
      );
      if (urlRecord !== null) {
        return serializeURLwhatwg_url(urlRecord);
      }
      return conversions.USVString(value);
    }

    set longDesc(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "longdesc", V);
    }

    get border() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "border");
      return value === null ? "" : value;
    }

    set border(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "border", V);
    }
  }
  Object.defineProperties(HTMLImageElement.prototype, {
    alt: { enumerable: true },
    src: { enumerable: true },
    srcset: { enumerable: true },
    sizes: { enumerable: true },
    crossOrigin: { enumerable: true },
    useMap: { enumerable: true },
    isMap: { enumerable: true },
    width: { enumerable: true },
    height: { enumerable: true },
    naturalWidth: { enumerable: true },
    naturalHeight: { enumerable: true },
    complete: { enumerable: true },
    currentSrc: { enumerable: true },
    name: { enumerable: true },
    lowsrc: { enumerable: true },
    align: { enumerable: true },
    hspace: { enumerable: true },
    vspace: { enumerable: true },
    longDesc: { enumerable: true },
    border: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLImageElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLImageElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLImageElement
  });
};
