"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../file-api/FileReader-impl.js");

const Blob = require("./Blob.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const EventTarget = require("./EventTarget.js");

const interfaceName = "FileReader";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("FileReader", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  EventTarget._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window", "Worker"]);

exports.install = globalObject => {
  if (globalObject.EventTarget === undefined) {
    throw new Error("Internal error: attempting to evaluate FileReader before EventTarget");
  }
  class FileReader extends globalObject.EventTarget {
    constructor() {
      return exports.setup(Object.create(new.target.prototype), globalObject, undefined);
    }

    readAsArrayBuffer(blob) {
      const esValue = this || globalObject;

      return esValue[implSymbol].readAsArrayBuffer(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    readAsBinaryString(blob) {
      const esValue = this || globalObject;

      return esValue[implSymbol].readAsBinaryString(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    readAsText(blob) {
      const esValue = this || globalObject;

      return esValue[implSymbol].readAsText(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    readAsDataURL(blob) {
      const esValue = this || globalObject;

      return esValue[implSymbol].readAsDataURL(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    abort() {
      const esValue = this || globalObject;

      return esValue[implSymbol].abort();
    }

    get readyState() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["readyState"];
    }

    get result() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["result"]);
    }

    get error() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["error"]);
    }

    get onloadstart() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onloadstart"]);
    }

    set onloadstart(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onloadstart"] = V;
    }

    get onprogress() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onprogress"]);
    }

    set onprogress(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onprogress"] = V;
    }

    get onload() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onload"]);
    }

    set onload(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onload"] = V;
    }

    get onabort() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onabort"]);
    }

    set onabort(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onabort"] = V;
    }

    get onerror() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onerror"]);
    }

    set onerror(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onerror"] = V;
    }

    get onloadend() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onloadend"]);
    }

    set onloadend(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onloadend"] = V;
    }
  }
  Object.defineProperties(FileReader.prototype, {
    readAsArrayBuffer: { enumerable: true },
    readAsBinaryString: { enumerable: true },
    readAsText: { enumerable: true },
    readAsDataURL: { enumerable: true },
    abort: { enumerable: true },
    readyState: { enumerable: true },
    result: { enumerable: true },
    error: { enumerable: true },
    onloadstart: { enumerable: true },
    onprogress: { enumerable: true },
    onload: { enumerable: true },
    onabort: { enumerable: true },
    onerror: { enumerable: true },
    onloadend: { enumerable: true },
    [Symbol.toStringTag]: { value: "FileReader", configurable: true },
    EMPTY: { value: 0, enumerable: true },
    LOADING: { value: 1, enumerable: true },
    DONE: { value: 2, enumerable: true }
  });
  Object.defineProperties(FileReader, {
    EMPTY: { value: 0, enumerable: true },
    LOADING: { value: 1, enumerable: true },
    DONE: { value: 2, enumerable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = FileReader;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: FileReader
  });
};
