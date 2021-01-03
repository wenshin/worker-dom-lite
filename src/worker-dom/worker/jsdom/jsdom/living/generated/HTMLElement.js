"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const Element = require("./Element.js");

const interfaceName = "HTMLElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLElement", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  Element._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  if (globalObject.Element === undefined) {
    throw new Error("Internal error: attempting to evaluate HTMLElement before Element");
  }
  class HTMLElement extends globalObject.Element {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    click() {
      const esValue = this || globalObject;

      return esValue[implSymbol].click();
    }

    focus() {
      const esValue = this || globalObject;

      return esValue[implSymbol].focus();
    }

    blur() {
      const esValue = this || globalObject;

      return esValue[implSymbol].blur();
    }

    get hidden() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "hidden");
    }

    set hidden(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "hidden", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "hidden");
      }
    }

    get accessKey() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "accesskey");
      return value === null ? "" : value;
    }

    set accessKey(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "accesskey", V);
    }

    get draggable() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["draggable"];
    }

    set draggable(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["draggable"] = V;
    }

    get offsetParent() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["offsetParent"]);
    }

    get offsetTop() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["offsetTop"];
    }

    get offsetLeft() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["offsetLeft"];
    }

    get offsetWidth() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["offsetWidth"];
    }

    get offsetHeight() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["offsetHeight"];
    }

    get style() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "style", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["style"]);
      });
    }

    set style(V) {
      const esValue = this || globalObject;

      const Q = esValue["style"];
      if (!utils.isObject(Q)) {
        throw new TypeError("Property 'style' is not an object");
      }
      Reflect.set(Q, "cssText", V);
    }

    get onclick() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onclick"]);
    }

    set onclick(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onclick"] = V;
    }

    get oninput() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["oninput"]);
    }

    set oninput(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["oninput"] = V;
    }

    get dataset() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "dataset", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["dataset"]);
      });
    }

    get nonce() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "nonce");
      return value === null ? "" : value;
    }

    set nonce(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "nonce", V);
    }

    get tabIndex() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["tabIndex"];
    }

    set tabIndex(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["tabIndex"] = V;
    }
  }
  Object.defineProperties(HTMLElement.prototype, {
    click: { enumerable: true },
    focus: { enumerable: true },
    blur: { enumerable: true },
    hidden: { enumerable: true },
    accessKey: { enumerable: true },
    draggable: { enumerable: true },
    offsetParent: { enumerable: true },
    offsetTop: { enumerable: true },
    offsetLeft: { enumerable: true },
    offsetWidth: { enumerable: true },
    offsetHeight: { enumerable: true },
    style: { enumerable: true },
    onclick: { enumerable: true },
    oninput: { enumerable: true },
    dataset: { enumerable: true },
    nonce: { enumerable: true },
    tabIndex: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLElement
  });
};
