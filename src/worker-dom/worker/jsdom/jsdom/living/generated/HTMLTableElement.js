"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLTableElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const HTMLTableCaptionElement = require("./HTMLTableCaptionElement.js");
const HTMLTableSectionElement = require("./HTMLTableSectionElement.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLTableElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLTableElement", globalObject);
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
  const wrapper = utils.makeWrapper(HTMLTableElement, globalObject);

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
    throw new Error("Internal error: attempting to evaluate HTMLTableElement before HTMLElement");
  }
  class HTMLTableElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    createCaption() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].createCaption());
    }

    deleteCaption() {
      const esValue = this || globalObject;

      return esValue[implSymbol].deleteCaption();
    }

    createTHead() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].createTHead());
    }

    deleteTHead() {
      const esValue = this || globalObject;

      return esValue[implSymbol].deleteTHead();
    }

    createTFoot() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].createTFoot());
    }

    deleteTFoot() {
      const esValue = this || globalObject;

      return esValue[implSymbol].deleteTFoot();
    }

    createTBody() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].createTBody());
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

    get caption() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["caption"]);
    }

    set caption(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["caption"] = V;
    }

    get tHead() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["tHead"]);
    }

    set tHead(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["tHead"] = V;
    }

    get tFoot() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["tFoot"]);
    }

    set tFoot(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["tFoot"] = V;
    }

    get tBodies() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.getSameObject(this, "tBodies", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["tBodies"]);
      });
    }

    get rows() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.getSameObject(this, "rows", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["rows"]);
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

    get border() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "border");
      return value === null ? "" : value;
    }

    set border(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "border", V);
    }

    get frame() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "frame");
      return value === null ? "" : value;
    }

    set frame(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "frame", V);
    }

    get rules() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "rules");
      return value === null ? "" : value;
    }

    set rules(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "rules", V);
    }

    get summary() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "summary");
      return value === null ? "" : value;
    }

    set summary(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "summary", V);
    }

    get width() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "width");
      return value === null ? "" : value;
    }

    set width(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "width", V);
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

    get cellPadding() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "cellpadding");
      return value === null ? "" : value;
    }

    set cellPadding(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "cellpadding", V);
    }

    get cellSpacing() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "cellspacing");
      return value === null ? "" : value;
    }

    set cellSpacing(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "cellspacing", V);
    }
  }
  Object.defineProperties(HTMLTableElement.prototype, {
    createCaption: { enumerable: true },
    deleteCaption: { enumerable: true },
    createTHead: { enumerable: true },
    deleteTHead: { enumerable: true },
    createTFoot: { enumerable: true },
    deleteTFoot: { enumerable: true },
    createTBody: { enumerable: true },
    insertRow: { enumerable: true },
    deleteRow: { enumerable: true },
    caption: { enumerable: true },
    tHead: { enumerable: true },
    tFoot: { enumerable: true },
    tBodies: { enumerable: true },
    rows: { enumerable: true },
    align: { enumerable: true },
    border: { enumerable: true },
    frame: { enumerable: true },
    rules: { enumerable: true },
    summary: { enumerable: true },
    width: { enumerable: true },
    bgColor: { enumerable: true },
    cellPadding: { enumerable: true },
    cellSpacing: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLTableElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLTableElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLTableElement
  });
};
