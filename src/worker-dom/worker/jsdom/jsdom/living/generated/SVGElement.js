"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/SVGElement-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const Element = require("./Element.js");

const interfaceName = "SVGElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("SVGElement", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  Element._internalSetup(wrapper, globalObject);
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
  const wrapper = utils.makeWrapper(SVGElement, globalObject);

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
  if (globalObject.Element === undefined) {
    throw new Error("Internal error: attempting to evaluate SVGElement before Element");
  }
  class SVGElement extends globalObject.Element {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    focus() {
      const esValue = this || globalObject;

      return esValue[implSymbol].focus();
    }

    blur() {
      const esValue = this || globalObject;

      return esValue[implSymbol].blur();
    }

    get className() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "className", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["className"]);
      });
    }

    get ownerSVGElement() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["ownerSVGElement"]);
    }

    get viewportElement() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["viewportElement"]);
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
  Object.defineProperties(SVGElement.prototype, {
    focus: { enumerable: true },
    blur: { enumerable: true },
    className: { enumerable: true },
    ownerSVGElement: { enumerable: true },
    viewportElement: { enumerable: true },
    style: { enumerable: true },
    onclick: { enumerable: true },
    oninput: { enumerable: true },
    dataset: { enumerable: true },
    nonce: { enumerable: true },
    tabIndex: { enumerable: true },
    [Symbol.toStringTag]: { value: "SVGElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = SVGElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: SVGElement
  });
};
