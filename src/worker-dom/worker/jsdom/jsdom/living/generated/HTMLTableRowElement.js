"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLTableRowElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLTableRowElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLTableRowElement", globalObject);
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
  const wrapper = utils.makeWrapper(HTMLTableRowElement, globalObject);

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
    throw new Error("Internal error: attempting to evaluate HTMLTableRowElement before HTMLElement");
  }
  class HTMLTableRowElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    insertCell() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].insertCell(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    deleteCell(index) {
      const esValue = this || globalObject;

      return esValue[implSymbol].deleteCell(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get rowIndex() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["rowIndex"];
    }

    get sectionRowIndex() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["sectionRowIndex"];
    }

    get cells() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.getSameObject(this, "cells", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["cells"]);
      });
    }

    get align() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "align");
      return value === null ? "" : value;
    }

    set align(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "align", V);
    }

    get ch() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "char");
      return value === null ? "" : value;
    }

    set ch(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "char", V);
    }

    get chOff() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "charoff");
      return value === null ? "" : value;
    }

    set chOff(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "charoff", V);
    }

    get vAlign() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "valign");
      return value === null ? "" : value;
    }

    set vAlign(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "valign", V);
    }

    get bgColor() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "bgcolor");
      return value === null ? "" : value;
    }

    set bgColor(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "bgcolor", V);
    }
  }
  Object.defineProperties(HTMLTableRowElement.prototype, {
    insertCell: { enumerable: true },
    deleteCell: { enumerable: true },
    rowIndex: { enumerable: true },
    sectionRowIndex: { enumerable: true },
    cells: { enumerable: true },
    align: { enumerable: true },
    ch: { enumerable: true },
    chOff: { enumerable: true },
    vAlign: { enumerable: true },
    bgColor: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLTableRowElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLTableRowElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLTableRowElement
  });
};
