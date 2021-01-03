"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../xhr/XMLHttpRequest-impl.js");

const Document = require("./Document.js");
const Blob = require("./Blob.js");
const FormData = require("./FormData.js");
const XMLHttpRequestResponseType = require("./XMLHttpRequestResponseType.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const XMLHttpRequestEventTarget = require("./XMLHttpRequestEventTarget.js");

const interfaceName = "XMLHttpRequest";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("XMLHttpRequest", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  XMLHttpRequestEventTarget._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window", "DedicatedWorker", "SharedWorker"]);

exports.install = globalObject => {
  if (globalObject.XMLHttpRequestEventTarget === undefined) {
    throw new Error("Internal error: attempting to evaluate XMLHttpRequest before XMLHttpRequestEventTarget");
  }
  class XMLHttpRequest extends globalObject.XMLHttpRequestEventTarget {
    constructor() {
      return exports.setup(Object.create(new.target.prototype), globalObject, undefined);
    }

    open(method, url) {
      const esValue = this || globalObject;

      return esValue[implSymbol].open(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    setRequestHeader(name, value) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setRequestHeader(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    send() {
      const esValue = this || globalObject;

      return esValue[implSymbol].send(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    abort() {
      const esValue = this || globalObject;

      return esValue[implSymbol].abort();
    }

    getResponseHeader(name) {
      const esValue = this || globalObject;

      return esValue[implSymbol].getResponseHeader(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    getAllResponseHeaders() {
      const esValue = this || globalObject;

      return esValue[implSymbol].getAllResponseHeaders();
    }

    overrideMimeType(mime) {
      const esValue = this || globalObject;

      return esValue[implSymbol].overrideMimeType(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get onreadystatechange() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onreadystatechange"]);
    }

    set onreadystatechange(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onreadystatechange"] = V;
    }

    get readyState() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["readyState"];
    }

    get timeout() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["timeout"];
    }

    set timeout(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["timeout"] = V;
    }

    get withCredentials() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["withCredentials"];
    }

    set withCredentials(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["withCredentials"] = V;
    }

    get upload() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "upload", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["upload"]);
      });
    }

    get responseURL() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["responseURL"];
    }

    get status() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["status"];
    }

    get statusText() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["statusText"];
    }

    get responseType() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["responseType"]);
    }

    set responseType(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["responseType"] = V;
    }

    get response() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["response"];
    }

    get responseText() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["responseText"];
    }

    get responseXML() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["responseXML"]);
    }
  }
  Object.defineProperties(XMLHttpRequest.prototype, {
    open: { enumerable: true },
    setRequestHeader: { enumerable: true },
    send: { enumerable: true },
    abort: { enumerable: true },
    getResponseHeader: { enumerable: true },
    getAllResponseHeaders: { enumerable: true },
    overrideMimeType: { enumerable: true },
    onreadystatechange: { enumerable: true },
    readyState: { enumerable: true },
    timeout: { enumerable: true },
    withCredentials: { enumerable: true },
    upload: { enumerable: true },
    responseURL: { enumerable: true },
    status: { enumerable: true },
    statusText: { enumerable: true },
    responseType: { enumerable: true },
    response: { enumerable: true },
    responseText: { enumerable: true },
    responseXML: { enumerable: true },
    [Symbol.toStringTag]: { value: "XMLHttpRequest", configurable: true },
    UNSENT: { value: 0, enumerable: true },
    OPENED: { value: 1, enumerable: true },
    HEADERS_RECEIVED: { value: 2, enumerable: true },
    LOADING: { value: 3, enumerable: true },
    DONE: { value: 4, enumerable: true }
  });
  Object.defineProperties(XMLHttpRequest, {
    UNSENT: { value: 0, enumerable: true },
    OPENED: { value: 1, enumerable: true },
    HEADERS_RECEIVED: { value: 2, enumerable: true },
    LOADING: { value: 3, enumerable: true },
    DONE: { value: 4, enumerable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = XMLHttpRequest;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: XMLHttpRequest
  });
};
