"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLTrackElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLTrackElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLTrackElement", globalObject);
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
  const wrapper = utils.makeWrapper(HTMLTrackElement, globalObject);

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
    throw new Error("Internal error: attempting to evaluate HTMLTrackElement before HTMLElement");
  }
  class HTMLTrackElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get kind() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "kind");
      return value === null ? "" : value;
    }

    set kind(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "kind", V);
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

    get srclang() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "srclang");
      return value === null ? "" : value;
    }

    set srclang(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "srclang", V);
    }

    get label() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "label");
      return value === null ? "" : value;
    }

    set label(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "label", V);
    }

    get default() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "default");
    }

    set default(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "default", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "default");
      }
    }

    get readyState() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["readyState"];
    }
  }
  Object.defineProperties(HTMLTrackElement.prototype, {
    kind: { enumerable: true },
    src: { enumerable: true },
    srclang: { enumerable: true },
    label: { enumerable: true },
    default: { enumerable: true },
    readyState: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLTrackElement", configurable: true },
    NONE: { value: 0, enumerable: true },
    LOADING: { value: 1, enumerable: true },
    LOADED: { value: 2, enumerable: true },
    ERROR: { value: 3, enumerable: true }
  });
  Object.defineProperties(HTMLTrackElement, {
    NONE: { value: 0, enumerable: true },
    LOADING: { value: 1, enumerable: true },
    LOADED: { value: 2, enumerable: true },
    ERROR: { value: 3, enumerable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLTrackElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLTrackElement
  });
};
