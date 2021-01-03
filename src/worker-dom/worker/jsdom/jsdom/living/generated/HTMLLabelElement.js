"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLLabelElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLLabelElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLLabelElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLLabelElement before HTMLElement");
  }
  class HTMLLabelElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get form() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["form"]);
    }

    get htmlFor() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "for");
      return value === null ? "" : value;
    }

    set htmlFor(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "for", V);
    }

    get control() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["control"]);
    }
  }
  Object.defineProperties(HTMLLabelElement.prototype, {
    form: { enumerable: true },
    htmlFor: { enumerable: true },
    control: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLLabelElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLLabelElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLLabelElement
  });
};
