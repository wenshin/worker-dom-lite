"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLMeterElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLMeterElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLMeterElement", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  HTMLElement._internalSetup(wrapper, globalObject);
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
  const wrapper = utils.makeWrapper(HTMLMeterElement, globalObject);

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
  if (globalObject.HTMLElement === undefined) {
    throw new Error("Internal error: attempting to evaluate HTMLMeterElement before HTMLElement");
  }
  class HTMLMeterElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get value() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["value"];
    }

    set value(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["value"] = V;
    }

    get min() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["min"];
    }

    set min(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["min"] = V;
    }

    get max() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["max"];
    }

    set max(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["max"] = V;
    }

    get low() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["low"];
    }

    set low(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["low"] = V;
    }

    get high() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["high"];
    }

    set high(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["high"] = V;
    }

    get optimum() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["optimum"];
    }

    set optimum(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["optimum"] = V;
    }

    get labels() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["labels"]);
    }
  }
  Object.defineProperties(HTMLMeterElement.prototype, {
    value: { enumerable: true },
    min: { enumerable: true },
    max: { enumerable: true },
    low: { enumerable: true },
    high: { enumerable: true },
    optimum: { enumerable: true },
    labels: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLMeterElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLMeterElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLMeterElement
  });
};
