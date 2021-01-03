"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLCanvasElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const BlobCallback = require("./BlobCallback.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLCanvasElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLCanvasElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLCanvasElement before HTMLElement");
  }
  class HTMLCanvasElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    getContext(contextId) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].getContext(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    toDataURL() {
      const esValue = this || globalObject;

      return esValue[implSymbol].toDataURL(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    toBlob(callback) {
      const esValue = this || globalObject;

      return esValue[implSymbol].toBlob(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get width() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["width"];
    }

    set width(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["width"] = V;
    }

    get height() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["height"];
    }

    set height(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["height"] = V;
    }
  }
  Object.defineProperties(HTMLCanvasElement.prototype, {
    getContext: { enumerable: true },
    toDataURL: { enumerable: true },
    toBlob: { enumerable: true },
    width: { enumerable: true },
    height: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLCanvasElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLCanvasElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLCanvasElement
  });
};
