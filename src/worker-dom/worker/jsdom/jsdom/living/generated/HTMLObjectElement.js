"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLObjectElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const parseURLToResultingURLRecord_helpers_document_base_url = require("../helpers/document-base-url.js")
  .parseURLToResultingURLRecord;
const serializeURLwhatwg_url = require("whatwg-url").serializeURL;
const parseNonNegativeInteger_helpers_strings = require("../helpers/strings.js").parseNonNegativeInteger;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLObjectElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLObjectElement", globalObject);
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
  const wrapper = utils.makeWrapper(HTMLObjectElement, globalObject);

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
    throw new Error("Internal error: attempting to evaluate HTMLObjectElement before HTMLElement");
  }
  class HTMLObjectElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    checkValidity() {
      const esValue = this || globalObject;

      return esValue[implSymbol].checkValidity();
    }

    reportValidity() {
      const esValue = this || globalObject;

      return esValue[implSymbol].reportValidity();
    }

    setCustomValidity(error) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setCustomValidity(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get data() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "data");
      if (value === null) {
        return "";
      }
      const urlRecord = parseURLToResultingURLRecord_helpers_document_base_url(
        value,
        esValue[implSymbol]._ownerDocument
      );
      if (urlRecord !== null) {
        return serializeURLwhatwg_url(urlRecord);
      }
      return conversions.USVString(value);
    }

    set data(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "data", V);
    }

    get type() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "type");
      return value === null ? "" : value;
    }

    set type(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "type", V);
    }

    get name() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "name");
      return value === null ? "" : value;
    }

    set name(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "name", V);
    }

    get useMap() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "usemap");
      return value === null ? "" : value;
    }

    set useMap(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "usemap", V);
    }

    get form() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["form"]);
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

    get height() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "height");
      return value === null ? "" : value;
    }

    set height(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "height", V);
    }

    get contentDocument() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["contentDocument"]);
    }

    get willValidate() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["willValidate"];
    }

    get validity() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["validity"]);
    }

    get validationMessage() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["validationMessage"];
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

    get archive() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "archive");
      return value === null ? "" : value;
    }

    set archive(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "archive", V);
    }

    get code() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "code");
      return value === null ? "" : value;
    }

    set code(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "code", V);
    }

    get declare() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "declare");
    }

    set declare(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "declare", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "declare");
      }
    }

    get hspace() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      let value = esValue[implSymbol].getAttributeNS(null, "hspace");
      if (value === null) {
        return 0;
      }
      value = parseNonNegativeInteger_helpers_strings(value);
      return value !== null && value >= 0 && value <= 2147483647 ? value : 0;
    }

    set hspace(V) {
      const esValue = this || globalObject;

      const n = V <= 2147483647 ? V : 0;
      esValue[implSymbol].setAttributeNS(null, "hspace", String(n));
    }

    get standby() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "standby");
      return value === null ? "" : value;
    }

    set standby(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "standby", V);
    }

    get vspace() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      let value = esValue[implSymbol].getAttributeNS(null, "vspace");
      if (value === null) {
        return 0;
      }
      value = parseNonNegativeInteger_helpers_strings(value);
      return value !== null && value >= 0 && value <= 2147483647 ? value : 0;
    }

    set vspace(V) {
      const esValue = this || globalObject;

      const n = V <= 2147483647 ? V : 0;
      esValue[implSymbol].setAttributeNS(null, "vspace", String(n));
    }

    get codeBase() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "codebase");
      if (value === null) {
        return "";
      }
      const urlRecord = parseURLToResultingURLRecord_helpers_document_base_url(
        value,
        esValue[implSymbol]._ownerDocument
      );
      if (urlRecord !== null) {
        return serializeURLwhatwg_url(urlRecord);
      }
      return conversions.USVString(value);
    }

    set codeBase(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "codebase", V);
    }

    get codeType() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "codetype");
      return value === null ? "" : value;
    }

    set codeType(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "codetype", V);
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
  }
  Object.defineProperties(HTMLObjectElement.prototype, {
    checkValidity: { enumerable: true },
    reportValidity: { enumerable: true },
    setCustomValidity: { enumerable: true },
    data: { enumerable: true },
    type: { enumerable: true },
    name: { enumerable: true },
    useMap: { enumerable: true },
    form: { enumerable: true },
    width: { enumerable: true },
    height: { enumerable: true },
    contentDocument: { enumerable: true },
    willValidate: { enumerable: true },
    validity: { enumerable: true },
    validationMessage: { enumerable: true },
    align: { enumerable: true },
    archive: { enumerable: true },
    code: { enumerable: true },
    declare: { enumerable: true },
    hspace: { enumerable: true },
    standby: { enumerable: true },
    vspace: { enumerable: true },
    codeBase: { enumerable: true },
    codeType: { enumerable: true },
    border: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLObjectElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLObjectElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLObjectElement
  });
};
