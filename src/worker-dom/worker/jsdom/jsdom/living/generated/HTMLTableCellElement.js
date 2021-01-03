"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLTableCellElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLTableCellElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLTableCellElement", globalObject);
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
    throw new Error("Internal error: attempting to evaluate HTMLTableCellElement before HTMLElement");
  }
  class HTMLTableCellElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    get colSpan() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["colSpan"];
    }

    set colSpan(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["colSpan"] = V;
    }

    get rowSpan() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["rowSpan"];
    }

    set rowSpan(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["rowSpan"] = V;
    }

    get headers() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "headers");
      return value === null ? "" : value;
    }

    set headers(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "headers", V);
    }

    get cellIndex() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["cellIndex"];
    }

    get scope() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["scope"];
    }

    set scope(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["scope"] = V;
    }

    get abbr() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "abbr");
      return value === null ? "" : value;
    }

    set abbr(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "abbr", V);
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

    get axis() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "axis");
      return value === null ? "" : value;
    }

    set axis(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "axis", V);
    }

    get height() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "height");
      return value === null ? "" : value;
    }

    set height(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "height", V);
    }

    get width() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "width");
      return value === null ? "" : value;
    }

    set width(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "width", V);
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

    get noWrap() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "nowrap");
    }

    set noWrap(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "nowrap", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "nowrap");
      }
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

    get bgColor() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "bgcolor");
      return value === null ? "" : value;
    }

    set bgColor(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "bgcolor", V);
    }
  }
  Object.defineProperties(HTMLTableCellElement.prototype, {
    colSpan: { enumerable: true },
    rowSpan: { enumerable: true },
    headers: { enumerable: true },
    cellIndex: { enumerable: true },
    scope: { enumerable: true },
    abbr: { enumerable: true },
    align: { enumerable: true },
    axis: { enumerable: true },
    height: { enumerable: true },
    width: { enumerable: true },
    ch: { enumerable: true },
    chOff: { enumerable: true },
    noWrap: { enumerable: true },
    vAlign: { enumerable: true },
    bgColor: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLTableCellElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLTableCellElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLTableCellElement
  });
};
