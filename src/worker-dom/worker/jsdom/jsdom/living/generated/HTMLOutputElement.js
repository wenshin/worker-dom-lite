"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLOutputElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLOutputElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLOutputElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLOutputElement before HTMLElement");
  }
  class HTMLOutputElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    checkValidity() {
      const esValue = this || globalObject;

      return esValue[implSymbol].checkValidity();
    }

    reportValidity() {
      const esValue = this || globalObject;

      return esValue[implSymbol].reportValidity();
    }

    setCustomValidity(error) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setCustomValidity(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get htmlFor() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "htmlFor", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["htmlFor"]);
      });
    }

    set htmlFor(V) {
      const esValue = this || globalObject;

      const Q = esValue["htmlFor"];
      if (!utils.isObject(Q)) {
        throw new TypeError("Property 'htmlFor' is not an object");
      }
      Reflect.set(Q, "value", V);
    }

    get form() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["form"]);
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

    get type() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["type"];
    }

    get defaultValue() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["defaultValue"];
    }

    set defaultValue(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["defaultValue"] = V;
    }

    get value() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["value"];
    }

    set value(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["value"] = V;
    }

    get willValidate() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["willValidate"];
    }

    get validity() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["validity"]);
    }

    get validationMessage() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["validationMessage"];
    }

    get labels() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["labels"]);
    }
  }
  Object.defineProperties(HTMLOutputElement.prototype, {
    checkValidity: { enumerable: true },
    reportValidity: { enumerable: true },
    setCustomValidity: { enumerable: true },
    htmlFor: { enumerable: true },
    form: { enumerable: true },
    name: { enumerable: true },
    type: { enumerable: true },
    defaultValue: { enumerable: true },
    value: { enumerable: true },
    willValidate: { enumerable: true },
    validity: { enumerable: true },
    validationMessage: { enumerable: true },
    labels: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLOutputElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLOutputElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLOutputElement
  });
};
