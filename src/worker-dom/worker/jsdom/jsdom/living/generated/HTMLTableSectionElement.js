"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLTableSectionElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLTableSectionElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLTableSectionElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLTableSectionElement before HTMLElement");
  }
  class HTMLTableSectionElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    insertRow() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].insertRow(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    deleteRow(index) {
      const esValue = this || globalObject;

      return esValue[implSymbol].deleteRow(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get rows() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "rows", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["rows"]);
      });
    }

    get align() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "align");
      return value === null ? "" : value;
    }

    set align(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "align", V);
    }

    get ch() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "char");
      return value === null ? "" : value;
    }

    set ch(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "char", V);
    }

    get chOff() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "charoff");
      return value === null ? "" : value;
    }

    set chOff(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "charoff", V);
    }

    get vAlign() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "valign");
      return value === null ? "" : value;
    }

    set vAlign(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "valign", V);
    }
  }
  Object.defineProperties(HTMLTableSectionElement.prototype, {
    insertRow: { enumerable: true },
    deleteRow: { enumerable: true },
    rows: { enumerable: true },
    align: { enumerable: true },
    ch: { enumerable: true },
    chOff: { enumerable: true },
    vAlign: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLTableSectionElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLTableSectionElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLTableSectionElement
  });
};
