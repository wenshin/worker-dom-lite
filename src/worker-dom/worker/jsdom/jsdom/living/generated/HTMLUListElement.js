"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLUListElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLUListElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLUListElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLUListElement before HTMLElement");
  }
  class HTMLUListElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get compact() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "compact");
    }

    set compact(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "compact", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "compact");
      }
    }

    get type() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "type");
      return value === null ? "" : value;
    }

    set type(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "type", V);
    }
  }
  Object.defineProperties(HTMLUListElement.prototype, {
    compact: { enumerable: true },
    type: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLUListElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLUListElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLUListElement
  });
};
