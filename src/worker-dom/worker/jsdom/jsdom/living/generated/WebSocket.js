"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../websockets/WebSocket-impl.js");

const Blob = require("./Blob.js");
const BinaryType = require("./BinaryType.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const EventTarget = require("./EventTarget.js");

const interfaceName = "WebSocket";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("WebSocket", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  EventTarget._internalSetup(wrapper, globalObject);
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
  const wrapper = utils.makeWrapper(WebSocket, globalObject);

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

const exposed = new Set(["Window", "Worker"]);

exports.install = globalObject => {
  if (globalObject.EventTarget === undefined) {
    throw new Error("Internal error: attempting to evaluate WebSocket before EventTarget");
  }
  class WebSocket extends globalObject.EventTarget {
    constructor(url) {
      return exports.setup(Object.create(new.target.prototype), globalObject, arguments);
    }

    close() {
      const esValue = this || globalObject;

      return esValue[implSymbol].close(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    send(data) {
      const esValue = this || globalObject;

      return esValue[implSymbol].send(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get url() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["url"];
    }

    get readyState() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["readyState"];
    }

    get bufferedAmount() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["bufferedAmount"];
    }

    get onopen() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onopen"]);
    }

    set onopen(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onopen"] = V;
    }

    get onerror() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onerror"]);
    }

    set onerror(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onerror"] = V;
    }

    get onclose() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onclose"]);
    }

    set onclose(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onclose"] = V;
    }

    get extensions() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["extensions"];
    }

    get protocol() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["protocol"];
    }

    get onmessage() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["onmessage"]);
    }

    set onmessage(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["onmessage"] = V;
    }

    get binaryType() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["binaryType"]);
    }

    set binaryType(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["binaryType"] = V;
    }
  }
  Object.defineProperties(WebSocket.prototype, {
    close: { enumerable: true },
    send: { enumerable: true },
    url: { enumerable: true },
    readyState: { enumerable: true },
    bufferedAmount: { enumerable: true },
    onopen: { enumerable: true },
    onerror: { enumerable: true },
    onclose: { enumerable: true },
    extensions: { enumerable: true },
    protocol: { enumerable: true },
    onmessage: { enumerable: true },
    binaryType: { enumerable: true },
    [Symbol.toStringTag]: { value: "WebSocket", configurable: true },
    CONNECTING: { value: 0, enumerable: true },
    OPEN: { value: 1, enumerable: true },
    CLOSING: { value: 2, enumerable: true },
    CLOSED: { value: 3, enumerable: true }
  });
  Object.defineProperties(WebSocket, {
    CONNECTING: { value: 0, enumerable: true },
    OPEN: { value: 1, enumerable: true },
    CLOSING: { value: 2, enumerable: true },
    CLOSED: { value: 3, enumerable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = WebSocket;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: WebSocket
  });
};
