"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLSelectElement-impl.js");

const HTMLConstructor_helpers_html_constructor = require("../helpers/html-constructor.js").HTMLConstructor;
const HTMLOptionElement = require("./HTMLOptionElement.js");
const HTMLOptGroupElement = require("./HTMLOptGroupElement.js");
const HTMLElement = require("./HTMLElement.js");
const parseNonNegativeInteger_helpers_strings = require("../helpers/strings.js").parseNonNegativeInteger;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "HTMLSelectElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLSelectElement", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  HTMLElement._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl, (wrapper, globalObject) => {
  wrapper = new Proxy(wrapper, proxyHandler);
});

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  if (globalObject.HTMLElement === undefined) {
    throw new Error("Internal error: attempting to evaluate HTMLSelectElement before HTMLElement");
  }
  class HTMLSelectElement extends globalObject.HTMLElement {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    item(index) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].item(...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v)))
      );
    }

    namedItem(name) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].namedItem(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    add(element) {
      const esValue = this || globalObject;

      return esValue[implSymbol].add(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    remove() {
      const esValue = this || globalObject;

      return esValue[implSymbol].remove(
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

    get autofocus() {
      const esValue = this || globalObject;

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

    get disabled() {
      const esValue = this || globalObject;

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
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["form"]);
    }

    get multiple() {
      const esValue = this || globalObject;

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
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "name");
      return value === null ? "" : value;
    }

    set name(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "name", V);
    }

    get required() {
      const esValue = this || globalObject;

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
      const esValue = this || globalObject;

      let value = esValue[implSymbol].getAttributeNS(null, "size");
      if (value === null) {
        return 0;
      }
      value = parseNonNegativeInteger_helpers_strings(value);
      return value !== null && value >= 0 && value <= 2147483647 ? value : 0;
    }

    set size(V) {
      const esValue = this || globalObject;

      const n = V <= 2147483647 ? V : 0;
      esValue[implSymbol].setAttributeNS(null, "size", String(n));
    }

    get type() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["type"];
    }

    get options() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "options", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["options"]);
      });
    }

    get length() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["length"];
    }

    set length(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["length"] = V;
    }

    get selectedOptions() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "selectedOptions", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["selectedOptions"]);
      });
    }

    get selectedIndex() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["selectedIndex"];
    }

    set selectedIndex(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["selectedIndex"] = V;
    }

    get value() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["value"];
    }

    set value(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["value"] = V;
    }

    get willValidate() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["willValidate"];
    }

    get validity() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["validity"]);
    }

    get validationMessage() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["validationMessage"];
    }

    get labels() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["labels"]);
    }
  }
  Object.defineProperties(HTMLSelectElement.prototype, {
    item: { enumerable: true },
    namedItem: { enumerable: true },
    add: { enumerable: true },
    remove: { enumerable: true },
    checkValidity: { enumerable: true },
    reportValidity: { enumerable: true },
    setCustomValidity: { enumerable: true },
    autofocus: { enumerable: true },
    disabled: { enumerable: true },
    form: { enumerable: true },
    multiple: { enumerable: true },
    name: { enumerable: true },
    required: { enumerable: true },
    size: { enumerable: true },
    type: { enumerable: true },
    options: { enumerable: true },
    length: { enumerable: true },
    selectedOptions: { enumerable: true },
    selectedIndex: { enumerable: true },
    value: { enumerable: true },
    willValidate: { enumerable: true },
    validity: { enumerable: true },
    validationMessage: { enumerable: true },
    labels: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLSelectElement", configurable: true },
    [Symbol.iterator]: { value: Array.prototype[Symbol.iterator], configurable: true, writable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLSelectElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLSelectElement
  });
};
const idlInfo = {
  needsPerGlobalProxyHandler: true,
  supportsIndexedProperties: true,
  supportsNamedProperties: false,
  hasIndexedSetter: true,
  hasNamedSetter: false,
  hasNamedDeleter: false,
  overrideBuiltins: false,
  indexedName: "item",
  indexedUnsupported: {
    type: "extended-attribute",
    name: "WebIDL2JSValueAsUnsupported",
    rhs: { type: "identifier", value: "null" },
    arguments: []
  },
  indexedUnsupportedValue: "null",
  namedName: "",
  namedUnsupported: null,
  namedUnsupportedValue: null
};
const proxyHandler = utils.getProxyHandler(idlInfo);
