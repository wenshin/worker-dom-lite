"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLOptionElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLOptionElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLOptionElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLOptionElement before HTMLElement");
  }
  class HTMLOptionElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
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

    get label() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["label"];
    }

    set label(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["label"] = V;
    }

    get defaultSelected() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "selected");
    }

    set defaultSelected(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "selected", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "selected");
      }
    }

    get selected() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["selected"];
    }

    set selected(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["selected"] = V;
    }

    get value() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["value"];
    }

    set value(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["value"] = V;
    }

    get text() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["text"];
    }

    set text(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["text"] = V;
    }

    get index() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["index"];
    }
  }
  Object.defineProperties(HTMLOptionElement.prototype, {
    disabled: { enumerable: true },
    form: { enumerable: true },
    label: { enumerable: true },
    defaultSelected: { enumerable: true },
    selected: { enumerable: true },
    value: { enumerable: true },
    text: { enumerable: true },
    index: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLOptionElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLOptionElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLOptionElement
  });
};
