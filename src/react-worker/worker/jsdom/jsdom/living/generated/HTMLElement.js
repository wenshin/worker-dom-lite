'use strict';

const conversions = require('webidl-conversions');
const utils = require('./utils.js');

const HTMLConstructor_helpers_html_constructor = require('../helpers/html-constructor.js').HTMLConstructor;
const ceReactionsPreSteps_helpers_custom_elements = require('../helpers/custom-elements.js').ceReactionsPreSteps;
const ceReactionsPostSteps_helpers_custom_elements = require('../helpers/custom-elements.js').ceReactionsPostSteps;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const Element = require('./Element.js');

const interfaceName = 'HTMLElement';

exports.is = function is(obj) {
  return utils.isObject(obj) && utils.hasOwn(obj, implSymbol) && obj[implSymbol] instanceof Impl.implementation;
};
exports.isImpl = function isImpl(obj) {
  return utils.isObject(obj) && obj instanceof Impl.implementation;
};
exports.convert = function convert(obj, { context = 'The provided value' } = {}) {
  if (exports.is(obj)) {
    return utils.implForWrapper(obj);
  }
  throw new TypeError(`${context} is not of type 'HTMLElement'.`);
};

exports.create = function create(globalObject, constructorArgs, privateData) {
  if (globalObject[ctorRegistrySymbol] === undefined) {
    throw new Error('Internal error: invalid global object');
  }

  const ctor = globalObject[ctorRegistrySymbol]['HTMLElement'];
  if (ctor === undefined) {
    throw new Error('Internal error: constructor HTMLElement is not installed on the passed global object');
  }

  let obj = Object.create(ctor.prototype);
  obj = exports.setup(obj, globalObject, constructorArgs, privateData);
  return obj;
};
exports.createImpl = function createImpl(globalObject, constructorArgs, privateData) {
  const obj = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(obj);
};
exports._internalSetup = function _internalSetup(obj, globalObject) {
  Element._internalSetup(obj, globalObject);
};
exports.setup = function setup(obj, globalObject, constructorArgs = [], privateData = {}) {
  privateData.wrapper = obj;

  exports._internalSetup(obj, globalObject);
  Object.defineProperty(obj, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  obj[implSymbol][utils.wrapperSymbol] = obj;
  if (Impl.init) {
    Impl.init(obj[implSymbol], privateData);
  }
  return obj;
};

exports.install = function install(globalObject) {
  if (globalObject.Element === undefined) {
    throw new Error('Internal error: attempting to evaluate HTMLElement before Element');
  }
  class HTMLElement extends globalObject.Element {
    constructor() {
      return HTMLConstructor_helpers_html_constructor(globalObject, interfaceName, new.target);
    }

    click() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return esValue[implSymbol].click();
    }

    focus() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return esValue[implSymbol].focus();
    }

    blur() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return esValue[implSymbol].blur();
    }

    get hidden() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol].hasAttributeNS(null, 'hidden');
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    set hidden(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      V = conversions['boolean'](V, {
        context: "Failed to set the 'hidden' property on 'HTMLElement': The provided value"
      });

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        if (V) {
          esValue[implSymbol].setAttributeNS(null, 'hidden', '');
        } else {
          esValue[implSymbol].removeAttributeNS(null, 'hidden');
        }
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    get offsetParent() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]['offsetParent']);
    }

    get offsetTop() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return esValue[implSymbol]['offsetTop'];
    }

    get offsetLeft() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return esValue[implSymbol]['offsetLeft'];
    }

    get offsetWidth() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return esValue[implSymbol]['offsetWidth'];
    }

    get offsetHeight() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return esValue[implSymbol]['offsetHeight'];
    }

    get style() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.getSameObject(this, 'style', () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]['style']);
      });
    }

    set style(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      this.style.cssText = V;
    }

    get onclick() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]['onclick']);
    }

    set onclick(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      V = utils.tryImplForWrapper(V);

      esValue[implSymbol]['onclick'] = V;
    }

    get oninput() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]['oninput']);
    }

    set oninput(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      V = utils.tryImplForWrapper(V);

      esValue[implSymbol]['oninput'] = V;
    }

    get dataset() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.getSameObject(this, 'dataset', () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]['dataset']);
      });
    }

    get nonce() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      const value = esValue[implSymbol].getAttributeNS(null, 'nonce');
      return value === null ? '' : value;
    }

    set nonce(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      V = conversions['DOMString'](V, {
        context: "Failed to set the 'nonce' property on 'HTMLElement': The provided value"
      });

      esValue[implSymbol].setAttributeNS(null, 'nonce', V);
    }

    get tabIndex() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol]['tabIndex'];
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    set tabIndex(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      V = conversions['long'](V, {
        context: "Failed to set the 'tabIndex' property on 'HTMLElement': The provided value"
      });

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        esValue[implSymbol]['tabIndex'] = V;
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }
  }
  Object.defineProperties(HTMLElement.prototype, {
    click: { enumerable: true },
    focus: { enumerable: true },
    blur: { enumerable: true },
    title: { enumerable: true },
    lang: { enumerable: true },
    translate: { enumerable: true },
    dir: { enumerable: true },
    hidden: { enumerable: true },
    accessKey: { enumerable: true },
    draggable: { enumerable: true },
    offsetParent: { enumerable: true },
    offsetTop: { enumerable: true },
    offsetLeft: { enumerable: true },
    offsetWidth: { enumerable: true },
    offsetHeight: { enumerable: true },
    style: { enumerable: true },
    onclick: { enumerable: true },
    oninput: { enumerable: true },
    dataset: { enumerable: true },
    nonce: { enumerable: true },
    tabIndex: { enumerable: true },
    [Symbol.toStringTag]: { value: 'HTMLElement', configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLElement
  });
};

const Impl = require('../nodes/HTMLElement-impl.js');
