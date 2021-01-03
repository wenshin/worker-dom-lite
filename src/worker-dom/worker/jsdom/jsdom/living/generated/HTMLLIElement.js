"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLLIElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const parseInteger_helpers_strings = require("../helpers/strings.js").parseInteger;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLLIElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLLIElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLLIElement before HTMLElement");
  }
  class HTMLLIElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get value() {
      const esValue = this || globalObject;

      let value = esValue[implSymbol].getAttributeNS(null, "value");
      if (value === null) {
        return 0;
      }
      value = parseInteger_helpers_strings(value);
      return value !== null && conversions.long(value) === value ? value : 0;
    }

    set value(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "value", String(V));
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
  Object.defineProperties(HTMLLIElement.prototype, {
    value: { enumerable: true },
    type: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLLIElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLLIElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLLIElement
  });
};
