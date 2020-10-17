"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLAnchorElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLAnchorElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLAnchorElement", globalObject);
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
  const wrapper = utils.makeWrapper(HTMLAnchorElement, globalObject);

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
    throw new Error("Internal error: attempting to evaluate HTMLAnchorElement before HTMLElement");
  }
  class HTMLAnchorElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get target() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "target");
      return value === null ? "" : value;
    }

    set target(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "target", V);
    }

    get download() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "download");
      return value === null ? "" : value;
    }

    set download(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "download", V);
    }

    get rel() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "rel");
      return value === null ? "" : value;
    }

    set rel(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "rel", V);
    }

    get relList() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "relList", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["relList"]);
      });
    }

    set relList(V) {
      const esValue = this || globalObject;

      const Q = esValue["relList"];
      if (!utils.isObject(Q)) {
        throw new TypeError("Property 'relList' is not an object");
      }
      Reflect.set(Q, "value", V);
    }

    get hreflang() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "hreflang");
      return value === null ? "" : value;
    }

    set hreflang(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "hreflang", V);
    }

    get type() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "type");
      return value === null ? "" : value;
    }

    set type(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "type", V);
    }

    get text() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["text"];
    }

    set text(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["text"] = V;
    }

    get coords() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "coords");
      return value === null ? "" : value;
    }

    set coords(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "coords", V);
    }

    get charset() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "charset");
      return value === null ? "" : value;
    }

    set charset(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "charset", V);
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

    get rev() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "rev");
      return value === null ? "" : value;
    }

    set rev(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "rev", V);
    }

    get shape() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "shape");
      return value === null ? "" : value;
    }

    set shape(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "shape", V);
    }

    get href() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["href"];
    }

    set href(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["href"] = V;
    }

    toString() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["href"];
    }

    get origin() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["origin"];
    }

    get protocol() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["protocol"];
    }

    set protocol(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["protocol"] = V;
    }

    get username() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["username"];
    }

    set username(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["username"] = V;
    }

    get password() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["password"];
    }

    set password(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["password"] = V;
    }

    get host() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["host"];
    }

    set host(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["host"] = V;
    }

    get hostname() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["hostname"];
    }

    set hostname(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["hostname"] = V;
    }

    get port() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["port"];
    }

    set port(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["port"] = V;
    }

    get pathname() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["pathname"];
    }

    set pathname(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["pathname"] = V;
    }

    get search() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["search"];
    }

    set search(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["search"] = V;
    }

    get hash() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["hash"];
    }

    set hash(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["hash"] = V;
    }
  }
  Object.defineProperties(HTMLAnchorElement.prototype, {
    target: { enumerable: true },
    download: { enumerable: true },
    rel: { enumerable: true },
    relList: { enumerable: true },
    hreflang: { enumerable: true },
    type: { enumerable: true },
    text: { enumerable: true },
    coords: { enumerable: true },
    charset: { enumerable: true },
    name: { enumerable: true },
    rev: { enumerable: true },
    shape: { enumerable: true },
    href: { enumerable: true },
    toString: { enumerable: true },
    origin: { enumerable: true },
    protocol: { enumerable: true },
    username: { enumerable: true },
    password: { enumerable: true },
    host: { enumerable: true },
    hostname: { enumerable: true },
    port: { enumerable: true },
    pathname: { enumerable: true },
    search: { enumerable: true },
    hash: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLAnchorElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLAnchorElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLAnchorElement
  });
};
