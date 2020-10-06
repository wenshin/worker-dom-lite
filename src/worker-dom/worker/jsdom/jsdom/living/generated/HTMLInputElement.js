"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLInputElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const SelectionMode = require("./SelectionMode.js");
const FileList = require("./FileList.js");
const parseURLToResultingURLRecord_helpers_document_base_url = require("../helpers/document-base-url.js")
  .parseURLToResultingURLRecord;
const serializeURLwhatwg_url = require("whatwg-url").serializeURL;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLInputElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLInputElement", globalObject);
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
  const wrapper = utils.makeWrapper(HTMLInputElement, globalObject);

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
    throw new Error("Internal error: attempting to evaluate HTMLInputElement before HTMLElement");
  }
  class HTMLInputElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    stepUp() {
      const esValue = this || globalObject;

      return esValue[implSymbol].stepUp(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    stepDown() {
      const esValue = this || globalObject;

      return esValue[implSymbol].stepDown(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
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

    get alt() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "alt");
      return value === null ? "" : value;
    }

    set alt(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "alt", V);
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

    get defaultChecked() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "checked");
    }

    set defaultChecked(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "checked", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "checked");
      }
    }

    get checked() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["checked"];
    }

    set checked(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["checked"] = V;
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

    get files() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["files"]);
    }

    set files(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["files"] = V;
    }

    get formNoValidate() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "formnovalidate");
    }

    set formNoValidate(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "formnovalidate", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "formnovalidate");
      }
    }

    get formTarget() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "formtarget");
      return value === null ? "" : value;
    }

    set formTarget(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "formtarget", V);
    }

    get indeterminate() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["indeterminate"];
    }

    set indeterminate(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["indeterminate"] = V;
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

    get list() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["list"]);
    }

    get max() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "max");
      return value === null ? "" : value;
    }

    set max(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "max", V);
    }

    get maxLength() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["maxLength"];
    }

    set maxLength(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["maxLength"] = V;
    }

    get min() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "min");
      return value === null ? "" : value;
    }

    set min(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "min", V);
    }

    get minLength() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["minLength"];
    }

    set minLength(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["minLength"] = V;
    }

    get multiple() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "multiple");
    }

    set multiple(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "multiple", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "multiple");
      }
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

    get pattern() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "pattern");
      return value === null ? "" : value;
    }

    set pattern(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "pattern", V);
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

    get size() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["size"];
    }

    set size(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["size"] = V;
    }

    get src() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "src");
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

    set src(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "src", V);
    }

    get step() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "step");
      return value === null ? "" : value;
    }

    set step(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "step", V);
    }

    get type() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["type"];
    }

    set type(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["type"] = V;
    }

    get defaultValue() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "value");
      return value === null ? "" : value;
    }

    set defaultValue(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "value", V);
    }

    get value() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["value"];
    }

    set value(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["value"] = V;
    }

    get valueAsDate() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["valueAsDate"];
    }

    set valueAsDate(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["valueAsDate"] = V;
    }

    get valueAsNumber() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["valueAsNumber"];
    }

    set valueAsNumber(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["valueAsNumber"] = V;
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

    get align() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "align");
      return value === null ? "" : value;
    }

    set align(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "align", V);
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
  }
  Object.defineProperties(HTMLInputElement.prototype, {
    stepUp: { enumerable: true },
    stepDown: { enumerable: true },
    checkValidity: { enumerable: true },
    reportValidity: { enumerable: true },
    setCustomValidity: { enumerable: true },
    select: { enumerable: true },
    setRangeText: { enumerable: true },
    setSelectionRange: { enumerable: true },
    alt: { enumerable: true },
    autocomplete: { enumerable: true },
    autofocus: { enumerable: true },
    defaultChecked: { enumerable: true },
    checked: { enumerable: true },
    disabled: { enumerable: true },
    files: { enumerable: true },
    formNoValidate: { enumerable: true },
    formTarget: { enumerable: true },
    indeterminate: { enumerable: true },
    inputMode: { enumerable: true },
    list: { enumerable: true },
    max: { enumerable: true },
    maxLength: { enumerable: true },
    min: { enumerable: true },
    minLength: { enumerable: true },
    multiple: { enumerable: true },
    name: { enumerable: true },
    pattern: { enumerable: true },
    placeholder: { enumerable: true },
    readOnly: { enumerable: true },
    required: { enumerable: true },
    size: { enumerable: true },
    src: { enumerable: true },
    step: { enumerable: true },
    type: { enumerable: true },
    defaultValue: { enumerable: true },
    value: { enumerable: true },
    valueAsDate: { enumerable: true },
    valueAsNumber: { enumerable: true },
    willValidate: { enumerable: true },
    validity: { enumerable: true },
    validationMessage: { enumerable: true },
    labels: { enumerable: true },
    selectionStart: { enumerable: true },
    selectionEnd: { enumerable: true },
    selectionDirection: { enumerable: true },
    align: { enumerable: true },
    useMap: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLInputElement", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLInputElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLInputElement
  });
};
