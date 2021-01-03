"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../window/Location-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "Location";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("Location", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  Object.defineProperties(
    wrapper,
    Object.getOwnPropertyDescriptors({
      assign(url) {
        const esValue = this || globalObject;

        return esValue[implSymbol].assign(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        );
      },
      replace(url) {
        const esValue = this || globalObject;

        return esValue[implSymbol].replace(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        );
      },
      reload() {
        const esValue = this || globalObject;

        return esValue[implSymbol].reload();
      },
      get href() {
        const esValue = this || globalObject;
        return esValue[implSymbol]["href"];
      },
      set href(V) {
        const esValue = this || globalObject;
        esValue[implSymbol]["href"] = V;
      },
      toString() {
        const esValue = this || globalObject;
        return esValue[implSymbol]["href"];
      },
      get origin() {
        const esValue = this || globalObject;
        return esValue[implSymbol]["origin"];
      },
      get protocol() {
        const esValue = this || globalObject;
        return esValue[implSymbol]["protocol"];
      },
      set protocol(V) {
        const esValue = this || globalObject;
        esValue[implSymbol]["protocol"] = V;
      },
      get host() {
        const esValue = this || globalObject;
        return esValue[implSymbol]["host"];
      },
      set host(V) {
        const esValue = this || globalObject;
        esValue[implSymbol]["host"] = V;
      },
      get hostname() {
        const esValue = this || globalObject;
        return esValue[implSymbol]["hostname"];
      },
      set hostname(V) {
        const esValue = this || globalObject;
        esValue[implSymbol]["hostname"] = V;
      },
      get port() {
        const esValue = this || globalObject;
        return esValue[implSymbol]["port"];
      },
      set port(V) {
        const esValue = this || globalObject;
        esValue[implSymbol]["port"] = V;
      },
      get pathname() {
        const esValue = this || globalObject;
        return esValue[implSymbol]["pathname"];
      },
      set pathname(V) {
        const esValue = this || globalObject;
        esValue[implSymbol]["pathname"] = V;
      },
      get search() {
        const esValue = this || globalObject;
        return esValue[implSymbol]["search"];
      },
      set search(V) {
        const esValue = this || globalObject;
        esValue[implSymbol]["search"] = V;
      },
      get hash() {
        const esValue = this || globalObject;
        return esValue[implSymbol]["hash"];
      },
      set hash(V) {
        const esValue = this || globalObject;
        esValue[implSymbol]["hash"] = V;
      }
    })
  );

  Object.defineProperties(wrapper, {
    assign: { configurable: false, writable: false },
    replace: { configurable: false, writable: false },
    reload: { configurable: false, writable: false },
    href: { configurable: false },
    toString: { configurable: false, writable: false },
    origin: { configurable: false },
    protocol: { configurable: false },
    host: { configurable: false },
    hostname: { configurable: false },
    port: { configurable: false },
    pathname: { configurable: false },
    search: { configurable: false },
    hash: { configurable: false }
  });
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  class Location {
    constructor() {
      throw new TypeError("Illegal constructor");
    }
  }
  Object.defineProperties(Location.prototype, { [Symbol.toStringTag]: { value: "Location", configurable: true } });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = Location;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Location
  });
};
