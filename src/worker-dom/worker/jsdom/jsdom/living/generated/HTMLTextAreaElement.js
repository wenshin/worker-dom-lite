"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLTextAreaElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const SelectionMode = require("./SelectionMode.js");
const parseInteger_helpers_strings = require("../helpers/strings.js").parseInteger;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLTextAreaElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLTextAreaElement", globalObject);
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
  const wrapper = utils.makeWrapper(HTMLTextAreaElement, globalObject);

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
    throw new Error("Internal error: attempting to evaluate HTMLTextAreaElement before HTMLElement");
  }
  class HTMLTextAreaElement extends globalObject.HTMLElement {
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

    select() {
      const esValue = this || globalObject;

      return esValue[implSymbol].select();
    }

    setRangeText(replacement) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setRangeText(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    setSelectionRange(start, end) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setSelectionRange(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get autocomplete() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "autocomplete");
      return value === null ? "" : value;
    }

    set autocomplete(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "autocomplete", V);
    }

    get autofocus() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "autofocus");
    }

    set autofocus(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "autofocus", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "autofocus");
      }
    }

    get cols() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["cols"];
    }

    set cols(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["cols"] = V;
    }

    get dirName() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "dirname");
      return value === null ? "" : value;
    }

    set dirName(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "dirname", V);
    }

    get disabled() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "disabled");
    }

    set disabled(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "disabled", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "disabled");
      }
    }

    get form() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["form"]);
    }

    get inputMode() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "inputmode");
      return value === null ? "" : value;
    }

    set inputMode(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "inputmode", V);
    }

    get maxLength() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      let value = esValue[implSymbol].getAttributeNS(null, "maxlength");
      if (value === null) {
        return 0;
      }
      value = parseInteger_helpers_strings(value);
      return value !== null && conversions.long(value) === value ? value : 0;
    }

    set maxLength(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "maxlength", String(V));
    }

    get minLength() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      let value = esValue[implSymbol].getAttributeNS(null, "minlength");
      if (value === null) {
        return 0;
      }
      value = parseInteger_helpers_strings(value);
      return value !== null && conversions.long(value) === value ? value : 0;
    }

    set minLength(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "minlength", String(V));
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

    get placeholder() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "placeholder");
      return value === null ? "" : value;
    }

    set placeholder(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "placeholder", V);
    }

    get readOnly() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "readonly");
    }

    set readOnly(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "readonly", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "readonly");
      }
    }

    get required() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "required");
    }

    set required(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "required", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "required");
      }
    }

    get rows() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["rows"];
    }

    set rows(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["rows"] = V;
    }

    get wrap() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "wrap");
      return value === null ? "" : value;
    }

    set wrap(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "wrap", V);
    }

    get type() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["type"];
    }

    get defaultValue() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["defaultValue"];
    }

    set defaultValue(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["defaultValue"] = V;
    }

    get value() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["value"];
    }

    set value(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["value"] = V;
    }

    get textLength() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["textLength"];
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

    get labels() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["labels"]);
    }

    get selectionStart() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["selectionStart"];
    }

    set selectionStart(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["selectionStart"] = V;
    }

    get selectionEnd() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["selectionEnd"];
    }

    set selectionEnd(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["selectionEnd"] = V;
    }

    get selectionDirection() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["selectionDirection"];
    }

    set selectionDirection(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["selectionDirection"] = V;
    }
  }
  Object.defineProperties(HTMLTextAreaElement.prototype, {
    checkValidity: { enumerable: true },
    reportValidity: { enumerable: true },
    setCustomValidity: { enumerable: true },
    select: { enumerable: true },
    setRangeText: { enumerable: true },
    setSelectionRange: { enumerable: true },
    autocomplete: { enumerable: true },
    autofocus: { enumerable: true },
    cols: { enumerable: true },
    dirName: { enumerable: true },
    disabled: { enumerable: true },
    form: { enumerable: true },
    inputMode: { enumerable: true },
    maxLength: { enumerable: true },
    minLength: { enumerable: true },
    name: { enumerable: true },
    placeholder: { enumerable: true },
    readOnly: { enumerable: true },
    required: { enumerable: true },
    rows: { enumerable: true },
    wrap: { enumerable: true },
    type: { enumerable: true },
    defaultValue: { enumerable: true },
    value: { enumerable: true },
    textLength: { enumerable: true },
    willValidate: { enumerable: true },
    validity: { enumerable: true },
    validationMessage: { enumerable: true },
    labels: { enumerable: true },
    selectionStart: { enumerable: true },
    selectionEnd: { enumerable: true },
    selectionDirection: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLTextAreaElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLTextAreaElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLTextAreaElement
  });
};
