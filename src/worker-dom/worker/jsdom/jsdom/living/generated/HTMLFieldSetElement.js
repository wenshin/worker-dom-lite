"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLFieldSetElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLFieldSetElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLFieldSetElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLFieldSetElement before HTMLElement");
  }
  class HTMLFieldSetElement extends globalObject.HTMLElement {
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

    get disabled() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "disabled");
    }

    set disabled(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "disabled", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "disabled");
      }
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

    get elements() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "elements", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["elements"]);
      });
    }

    get willValidate() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["willValidate"];
    }

    get validity() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "validity", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["validity"]);
      });
    }

    get validationMessage() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["validationMessage"];
    }
  }
  Object.defineProperties(HTMLFieldSetElement.prototype, {
    checkValidity: { enumerable: true },
    reportValidity: { enumerable: true },
    setCustomValidity: { enumerable: true },
    disabled: { enumerable: true },
    form: { enumerable: true },
    name: { enumerable: true },
    type: { enumerable: true },
    elements: { enumerable: true },
    willValidate: { enumerable: true },
    validity: { enumerable: true },
    validationMessage: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLFieldSetElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLFieldSetElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLFieldSetElement
  });
};
