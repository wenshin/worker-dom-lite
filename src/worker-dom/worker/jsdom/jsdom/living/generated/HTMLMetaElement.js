"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLMetaElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLMetaElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLMetaElement", globalObject);
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
  const wrapper = utils.makeWrapper(HTMLMetaElement, globalObject);

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
    throw new Error("Internal error: attempting to evaluate HTMLMetaElement before HTMLElement");
  }
  class HTMLMetaElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
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

    get httpEquiv() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "http-equiv");
      return value === null ? "" : value;
    }

    set httpEquiv(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "http-equiv", V);
    }

    get content() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "content");
      return value === null ? "" : value;
    }

    set content(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "content", V);
    }

    get scheme() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "scheme");
      return value === null ? "" : value;
    }

    set scheme(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "scheme", V);
    }
  }
  Object.defineProperties(HTMLMetaElement.prototype, {
    name: { enumerable: true },
    httpEquiv: { enumerable: true },
    content: { enumerable: true },
    scheme: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLMetaElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLMetaElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLMetaElement
  });
};
