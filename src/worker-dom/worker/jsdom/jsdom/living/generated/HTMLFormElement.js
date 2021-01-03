"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLFormElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const HTMLElement = require("./HTMLElement.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "HTMLFormElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLFormElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLFormElement before HTMLElement");
  }
  class HTMLFormElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    submit() {
      const esValue = this || globalObject;

      return esValue[implSymbol].submit();
    }

    requestSubmit() {
      const esValue = this || globalObject;

      return esValue[implSymbol].requestSubmit(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    reset() {
      const esValue = this || globalObject;

      return esValue[implSymbol].reset();
    }

    checkValidity() {
      const esValue = this || globalObject;

      return esValue[implSymbol].checkValidity();
    }

    reportValidity() {
      const esValue = this || globalObject;

      return esValue[implSymbol].reportValidity();
    }

    get acceptCharset() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "accept-charset");
      return value === null ? "" : value;
    }

    set acceptCharset(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "accept-charset", V);
    }

    get action() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["action"];
    }

    set action(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["action"] = V;
    }

    get enctype() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["enctype"];
    }

    set enctype(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["enctype"] = V;
    }

    get method() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["method"];
    }

    set method(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["method"] = V;
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

    get noValidate() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "novalidate");
    }

    set noValidate(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "novalidate", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "novalidate");
      }
    }

    get target() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "target");
      return value === null ? "" : value;
    }

    set target(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "target", V);
    }

    get elements() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "elements", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["elements"]);
      });
    }

    get length() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["length"];
    }
  }
  Object.defineProperties(HTMLFormElement.prototype, {
    submit: { enumerable: true },
    requestSubmit: { enumerable: true },
    reset: { enumerable: true },
    checkValidity: { enumerable: true },
    reportValidity: { enumerable: true },
    acceptCharset: { enumerable: true },
    action: { enumerable: true },
    enctype: { enumerable: true },
    method: { enumerable: true },
    name: { enumerable: true },
    noValidate: { enumerable: true },
    target: { enumerable: true },
    elements: { enumerable: true },
    length: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLFormElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLFormElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLFormElement
  });
};
