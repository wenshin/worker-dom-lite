"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLModElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLModElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLModElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLModElement before HTMLElement");
  }
  class HTMLModElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get cite() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "cite");
      if (value === null) {
        return "";
      }
      return conversions.USVString(value);
    }

    set cite(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "cite", V);
    }

    get dateTime() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "datetime");
      return value === null ? "" : value;
    }

    set dateTime(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "datetime", V);
    }
  }
  Object.defineProperties(HTMLModElement.prototype, {
    cite: { enumerable: true },
    dateTime: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLModElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLModElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLModElement
  });
};
