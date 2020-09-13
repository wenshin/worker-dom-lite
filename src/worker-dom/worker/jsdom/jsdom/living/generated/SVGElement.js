'use strict';

const conversions = require('webidl-conversions');
const utils = require('./utils.js');

const ceReactionsPreSteps_helpers_custom_elements = require('../helpers/custom-elements.js').ceReactionsPreSteps;
const ceReactionsPostSteps_helpers_custom_elements = require('../helpers/custom-elements.js').ceReactionsPostSteps;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const Element = require('./Element.js');

const interfaceName = 'SVGElement';

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
  throw new TypeError(`${context} is not of type 'SVGElement'.`);
};

exports.create = function create(globalObject, constructorArgs, privateData) {
  if (globalObject[ctorRegistrySymbol] === undefined) {
    throw new Error('Internal error: invalid global object');
  }

  const ctor = globalObject[ctorRegistrySymbol]['SVGElement'];
  if (ctor === undefined) {
    throw new Error('Internal error: constructor SVGElement is not installed on the passed global object');
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
    throw new Error('Internal error: attempting to evaluate SVGElement before Element');
  }
  class SVGElement extends globalObject.Element {
    constructor() {
      throw new TypeError('Illegal constructor');
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

    get className() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.getSameObject(this, 'className', () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]['className']);
      });
    }

    get ownerSVGElement() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]['ownerSVGElement']);
    }

    get viewportElement() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]['viewportElement']);
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
        context: "Failed to set the 'nonce' property on 'SVGElement': The provided value"
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
        context: "Failed to set the 'tabIndex' property on 'SVGElement': The provided value"
      });

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        esValue[implSymbol]['tabIndex'] = V;
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }
  }
  Object.defineProperties(SVGElement.prototype, {
    focus: { enumerable: true },
    blur: { enumerable: true },
    className: { enumerable: true },
    ownerSVGElement: { enumerable: true },
    viewportElement: { enumerable: true },
    style: { enumerable: true },
    dataset: { enumerable: true },
    nonce: { enumerable: true },
    tabIndex: { enumerable: true },
    [Symbol.toStringTag]: { value: 'SVGElement', configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = SVGElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: SVGElement
  });
};

const Impl = require('../nodes/SVGElement-impl.js');
