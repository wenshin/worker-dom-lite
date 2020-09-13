const conversions = require('webidl-conversions');
const utils = require('./utils.js');

const ceReactionsPreSteps_helpers_custom_elements = require('../helpers/custom-elements.js').ceReactionsPreSteps;
const ceReactionsPostSteps_helpers_custom_elements = require('../helpers/custom-elements.js').ceReactionsPostSteps;
const Attr = require('./Attr.js');
const Node = require('./Node.js');
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const getESValue = utils.getESValue;

const interfaceName = 'Element';

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
  throw new TypeError(`${context} is not of type 'Element'.`);
};

exports.create = function create(globalObject, constructorArgs, privateData) {
  if (globalObject[ctorRegistrySymbol] === undefined) {
    throw new Error('Internal error: invalid global object');
  }

  const ctor = globalObject[ctorRegistrySymbol]['Element'];
  if (ctor === undefined) {
    throw new Error('Internal error: constructor Element is not installed on the passed global object');
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
  Node._internalSetup(obj, globalObject);
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
  if (globalObject.Node === undefined) {
    throw new Error('Internal error: attempting to evaluate Element before Node');
  }
  class Element extends globalObject.Node {
    constructor() {
      throw new TypeError('Illegal constructor');
    }

    hasAttributes() {
      const esValue = getESValue(this, globalObject, Impl);

      return esValue[implSymbol].hasAttributes();
    }

    getAttributeNames() {
      const esValue = getESValue(this, globalObject, Impl);

      return utils.tryWrapperForImpl(esValue[implSymbol].getAttributeNames());
    }

    getAttribute(qualifiedName) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'getAttribute' on 'Element': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'getAttribute' on 'Element': parameter 1"
        });
        args.push(curArg);
      }
      return esValue[implSymbol].getAttribute(...args);
    }

    getAttributeNS(namespace, localName) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 2) {
        throw new TypeError(
          "Failed to execute 'getAttributeNS' on 'Element': 2 arguments required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg === null || curArg === undefined) {
          curArg = null;
        } else {
          curArg = conversions['DOMString'](curArg, {
            context: "Failed to execute 'getAttributeNS' on 'Element': parameter 1"
          });
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'getAttributeNS' on 'Element': parameter 2"
        });
        args.push(curArg);
      }
      return esValue[implSymbol].getAttributeNS(...args);
    }

    setAttribute(qualifiedName, value) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 2) {
        throw new TypeError(
          "Failed to execute 'setAttribute' on 'Element': 2 arguments required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'setAttribute' on 'Element': parameter 1"
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'setAttribute' on 'Element': parameter 2"
        });
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol].setAttribute(...args);
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    setAttributeNS(namespace, qualifiedName, value) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 3) {
        throw new TypeError(
          "Failed to execute 'setAttributeNS' on 'Element': 3 arguments required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg === null || curArg === undefined) {
          curArg = null;
        } else {
          curArg = conversions['DOMString'](curArg, {
            context: "Failed to execute 'setAttributeNS' on 'Element': parameter 1"
          });
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'setAttributeNS' on 'Element': parameter 2"
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[2];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'setAttributeNS' on 'Element': parameter 3"
        });
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol].setAttributeNS(...args);
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    removeAttribute(qualifiedName) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'removeAttribute' on 'Element': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'removeAttribute' on 'Element': parameter 1"
        });
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol].removeAttribute(...args);
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    removeAttributeNS(namespace, localName) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 2) {
        throw new TypeError(
          "Failed to execute 'removeAttributeNS' on 'Element': 2 arguments required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg === null || curArg === undefined) {
          curArg = null;
        } else {
          curArg = conversions['DOMString'](curArg, {
            context: "Failed to execute 'removeAttributeNS' on 'Element': parameter 1"
          });
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'removeAttributeNS' on 'Element': parameter 2"
        });
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol].removeAttributeNS(...args);
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    toggleAttribute(qualifiedName) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'toggleAttribute' on 'Element': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'toggleAttribute' on 'Element': parameter 1"
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          curArg = conversions['boolean'](curArg, {
            context: "Failed to execute 'toggleAttribute' on 'Element': parameter 2"
          });
        }
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol].toggleAttribute(...args);
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    hasAttribute(qualifiedName) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'hasAttribute' on 'Element': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'hasAttribute' on 'Element': parameter 1"
        });
        args.push(curArg);
      }
      return esValue[implSymbol].hasAttribute(...args);
    }

    hasAttributeNS(namespace, localName) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 2) {
        throw new TypeError(
          "Failed to execute 'hasAttributeNS' on 'Element': 2 arguments required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg === null || curArg === undefined) {
          curArg = null;
        } else {
          curArg = conversions['DOMString'](curArg, {
            context: "Failed to execute 'hasAttributeNS' on 'Element': parameter 1"
          });
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'hasAttributeNS' on 'Element': parameter 2"
        });
        args.push(curArg);
      }
      return esValue[implSymbol].hasAttributeNS(...args);
    }

    getAttributeNode(qualifiedName) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'getAttributeNode' on 'Element': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'getAttributeNode' on 'Element': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].getAttributeNode(...args));
    }

    getAttributeNodeNS(namespace, localName) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 2) {
        throw new TypeError(
          "Failed to execute 'getAttributeNodeNS' on 'Element': 2 arguments required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg === null || curArg === undefined) {
          curArg = null;
        } else {
          curArg = conversions['DOMString'](curArg, {
            context: "Failed to execute 'getAttributeNodeNS' on 'Element': parameter 1"
          });
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'getAttributeNodeNS' on 'Element': parameter 2"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].getAttributeNodeNS(...args));
    }

    setAttributeNode(attr) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'setAttributeNode' on 'Element': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = Attr.convert(curArg, { context: "Failed to execute 'setAttributeNode' on 'Element': parameter 1" });
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return utils.tryWrapperForImpl(esValue[implSymbol].setAttributeNode(...args));
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    setAttributeNodeNS(attr) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'setAttributeNodeNS' on 'Element': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = Attr.convert(curArg, { context: "Failed to execute 'setAttributeNodeNS' on 'Element': parameter 1" });
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return utils.tryWrapperForImpl(esValue[implSymbol].setAttributeNodeNS(...args));
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    removeAttributeNode(attr) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'removeAttributeNode' on 'Element': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = Attr.convert(curArg, { context: "Failed to execute 'removeAttributeNode' on 'Element': parameter 1" });
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return utils.tryWrapperForImpl(esValue[implSymbol].removeAttributeNode(...args));
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    closest(selectors) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'closest' on 'Element': 1 argument required, but only " + arguments.length + ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, { context: "Failed to execute 'closest' on 'Element': parameter 1" });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].closest(...args));
    }

    matches(selectors) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'matches' on 'Element': 1 argument required, but only " + arguments.length + ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, { context: "Failed to execute 'matches' on 'Element': parameter 1" });
        args.push(curArg);
      }
      return esValue[implSymbol].matches(...args);
    }

    webkitMatchesSelector(selectors) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'webkitMatchesSelector' on 'Element': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'webkitMatchesSelector' on 'Element': parameter 1"
        });
        args.push(curArg);
      }
      return esValue[implSymbol].webkitMatchesSelector(...args);
    }

    getElementsByTagName(qualifiedName) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'getElementsByTagName' on 'Element': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'getElementsByTagName' on 'Element': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].getElementsByTagName(...args));
    }

    getElementsByTagNameNS(namespace, localName) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 2) {
        throw new TypeError(
          "Failed to execute 'getElementsByTagNameNS' on 'Element': 2 arguments required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg === null || curArg === undefined) {
          curArg = null;
        } else {
          curArg = conversions['DOMString'](curArg, {
            context: "Failed to execute 'getElementsByTagNameNS' on 'Element': parameter 1"
          });
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'getElementsByTagNameNS' on 'Element': parameter 2"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].getElementsByTagNameNS(...args));
    }

    getElementsByClassName(classNames) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'getElementsByClassName' on 'Element': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'getElementsByClassName' on 'Element': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].getElementsByClassName(...args));
    }

    insertAdjacentElement(where, element) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 2) {
        throw new TypeError(
          "Failed to execute 'insertAdjacentElement' on 'Element': 2 arguments required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'insertAdjacentElement' on 'Element': parameter 1"
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = exports.convert(curArg, {
          context: "Failed to execute 'insertAdjacentElement' on 'Element': parameter 2"
        });
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return utils.tryWrapperForImpl(esValue[implSymbol].insertAdjacentElement(...args));
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    insertAdjacentText(where, data) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 2) {
        throw new TypeError(
          "Failed to execute 'insertAdjacentText' on 'Element': 2 arguments required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'insertAdjacentText' on 'Element': parameter 1"
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'insertAdjacentText' on 'Element': parameter 2"
        });
        args.push(curArg);
      }
      return esValue[implSymbol].insertAdjacentText(...args);
    }

    getClientRects() {
      const esValue = getESValue(this, globalObject, Impl);

      return utils.tryWrapperForImpl(esValue[implSymbol].getClientRects());
    }

    getBoundingClientRect() {
      const esValue = getESValue(this, globalObject, Impl);

      return utils.tryWrapperForImpl(esValue[implSymbol].getBoundingClientRect());
    }

    before() {
      const esValue = getESValue(this, globalObject, Impl);
      const args = [];
      for (let i = 0; i < arguments.length; i++) {
        let curArg = arguments[i];
        if (Node.is(curArg)) {
          curArg = utils.implForWrapper(curArg);
        } else {
          curArg = conversions['DOMString'](curArg, {
            context: "Failed to execute 'before' on 'Element': parameter " + (i + 1)
          });
        }
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol].before(...args);
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    after() {
      const esValue = getESValue(this, globalObject, Impl);
      const args = [];
      for (let i = 0; i < arguments.length; i++) {
        let curArg = arguments[i];
        if (Node.is(curArg)) {
          curArg = utils.implForWrapper(curArg);
        } else {
          curArg = conversions['DOMString'](curArg, {
            context: "Failed to execute 'after' on 'Element': parameter " + (i + 1)
          });
        }
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol].after(...args);
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    replaceWith() {
      const esValue = getESValue(this, globalObject, Impl);
      const args = [];
      for (let i = 0; i < arguments.length; i++) {
        let curArg = arguments[i];
        if (Node.is(curArg)) {
          curArg = utils.implForWrapper(curArg);
        } else {
          curArg = conversions['DOMString'](curArg, {
            context: "Failed to execute 'replaceWith' on 'Element': parameter " + (i + 1)
          });
        }
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol].replaceWith(...args);
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    remove() {
      const esValue = getESValue(this, globalObject, Impl);

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol].remove();
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    prepend() {
      const esValue = getESValue(this, globalObject, Impl);
      const args = [];
      for (let i = 0; i < arguments.length; i++) {
        let curArg = arguments[i];
        if (Node.is(curArg)) {
          curArg = utils.implForWrapper(curArg);
        } else {
          curArg = conversions['DOMString'](curArg, {
            context: "Failed to execute 'prepend' on 'Element': parameter " + (i + 1)
          });
        }
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol].prepend(...args);
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    append() {
      const esValue = getESValue(this, globalObject, Impl);
      const args = [];
      for (let i = 0; i < arguments.length; i++) {
        let curArg = arguments[i];
        if (Node.is(curArg)) {
          curArg = utils.implForWrapper(curArg);
        } else {
          curArg = conversions['DOMString'](curArg, {
            context: "Failed to execute 'append' on 'Element': parameter " + (i + 1)
          });
        }
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol].append(...args);
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    querySelector(selectors) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'querySelector' on 'Element': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'querySelector' on 'Element': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].querySelector(...args));
    }

    querySelectorAll(selectors) {
      const esValue = getESValue(this, globalObject, Impl);

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'querySelectorAll' on 'Element': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'querySelectorAll' on 'Element': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].querySelectorAll(...args));
    }

    get namespaceURI() {
      const esValue = getESValue(this, globalObject, Impl);

      return esValue[implSymbol]['namespaceURI'];
    }

    get prefix() {
      const esValue = getESValue(this, globalObject, Impl);

      return esValue[implSymbol]['prefix'];
    }

    get localName() {
      const esValue = getESValue(this, globalObject, Impl);

      return esValue[implSymbol]['localName'];
    }

    get tagName() {
      const esValue = getESValue(this, globalObject, Impl);

      return esValue[implSymbol]['tagName'];
    }

    get id() {
      const esValue = getESValue(this, globalObject, Impl);

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        const value = esValue[implSymbol].getAttributeNS(null, 'id');
        return value === null ? '' : value;
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    set id(V) {
      const esValue = getESValue(this, globalObject, Impl);

      V = conversions['DOMString'](V, { context: "Failed to set the 'id' property on 'Element': The provided value" });

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        esValue[implSymbol].setAttributeNS(null, 'id', V);
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    get className() {
      const esValue = getESValue(this, globalObject, Impl);

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        const value = esValue[implSymbol].getAttributeNS(null, 'class');
        return value === null ? '' : value;
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    set className(V) {
      const esValue = getESValue(this, globalObject, Impl);

      V = conversions['DOMString'](V, {
        context: "Failed to set the 'className' property on 'Element': The provided value"
      });

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        esValue[implSymbol].setAttributeNS(null, 'class', V);
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    get classList() {
      const esValue = getESValue(this, globalObject, Impl);

      return utils.getSameObject(this, 'classList', () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]['classList']);
      });
    }

    set classList(V) {
      const esValue = getESValue(this, globalObject, Impl);

      this.classList.value = V;
    }

    get slot() {
      const esValue = getESValue(this, globalObject, Impl);

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        const value = esValue[implSymbol].getAttributeNS(null, 'slot');
        return value === null ? '' : value;
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    set slot(V) {
      const esValue = getESValue(this, globalObject, Impl);

      V = conversions['DOMString'](V, {
        context: "Failed to set the 'slot' property on 'Element': The provided value"
      });

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        esValue[implSymbol].setAttributeNS(null, 'slot', V);
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    get attributes() {
      const esValue = getESValue(this, globalObject, Impl);

      return utils.getSameObject(this, 'attributes', () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]['attributes']);
      });
    }

    get shadowRoot() {
      const esValue = getESValue(this, globalObject, Impl);

      return utils.tryWrapperForImpl(esValue[implSymbol]['shadowRoot']);
    }

    get innerHTML() {
      const esValue = getESValue(this, globalObject, Impl);

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol]['innerHTML'];
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    set innerHTML(V) {
      const esValue = getESValue(this, globalObject, Impl);

      V = conversions['DOMString'](V, {
        context: "Failed to set the 'innerHTML' property on 'Element': The provided value",
        treatNullAsEmptyString: true
      });

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        esValue[implSymbol]['innerHTML'] = V;
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    get outerHTML() {
      const esValue = getESValue(this, globalObject, Impl);

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol]['outerHTML'];
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    set outerHTML(V) {
      const esValue = getESValue(this, globalObject, Impl);

      V = conversions['DOMString'](V, {
        context: "Failed to set the 'outerHTML' property on 'Element': The provided value",
        treatNullAsEmptyString: true
      });

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        esValue[implSymbol]['outerHTML'] = V;
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    get scrollTop() {
      const esValue = getESValue(this, globalObject, Impl);

      return esValue[implSymbol]['scrollTop'];
    }

    set scrollTop(V) {
      const esValue = getESValue(this, globalObject, Impl);

      V = conversions['unrestricted double'](V, {
        context: "Failed to set the 'scrollTop' property on 'Element': The provided value"
      });

      esValue[implSymbol]['scrollTop'] = V;
    }

    get scrollLeft() {
      const esValue = getESValue(this, globalObject, Impl);

      return esValue[implSymbol]['scrollLeft'];
    }

    set scrollLeft(V) {
      const esValue = getESValue(this, globalObject, Impl);

      V = conversions['unrestricted double'](V, {
        context: "Failed to set the 'scrollLeft' property on 'Element': The provided value"
      });

      esValue[implSymbol]['scrollLeft'] = V;
    }

    get scrollWidth() {
      const esValue = getESValue(this, globalObject, Impl);

      return esValue[implSymbol]['scrollWidth'];
    }

    get scrollHeight() {
      const esValue = getESValue(this, globalObject, Impl);

      return esValue[implSymbol]['scrollHeight'];
    }

    get clientTop() {
      const esValue = getESValue(this, globalObject, Impl);

      return esValue[implSymbol]['clientTop'];
    }

    get clientLeft() {
      const esValue = getESValue(this, globalObject, Impl);

      return esValue[implSymbol]['clientLeft'];
    }

    get clientWidth() {
      const esValue = getESValue(this, globalObject, Impl);

      return esValue[implSymbol]['clientWidth'];
    }

    get clientHeight() {
      const esValue = getESValue(this, globalObject, Impl);

      return esValue[implSymbol]['clientHeight'];
    }

    get previousElementSibling() {
      const esValue = getESValue(this, globalObject, Impl);

      return utils.tryWrapperForImpl(esValue[implSymbol]['previousElementSibling']);
    }

    get nextElementSibling() {
      const esValue = getESValue(this, globalObject, Impl);

      return utils.tryWrapperForImpl(esValue[implSymbol]['nextElementSibling']);
    }

    get children() {
      const esValue = getESValue(this, globalObject, Impl);

      return utils.getSameObject(this, 'children', () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]['children']);
      });
    }

    get firstElementChild() {
      const esValue = getESValue(this, globalObject, Impl);

      return utils.tryWrapperForImpl(esValue[implSymbol]['firstElementChild']);
    }

    get lastElementChild() {
      const esValue = getESValue(this, globalObject, Impl);

      return utils.tryWrapperForImpl(esValue[implSymbol]['lastElementChild']);
    }

    get childElementCount() {
      const esValue = getESValue(this, globalObject, Impl);

      return esValue[implSymbol]['childElementCount'];
    }

    get assignedSlot() {
      const esValue = getESValue(this, globalObject, Impl);

      return utils.tryWrapperForImpl(esValue[implSymbol]['assignedSlot']);
    }

    alignElement(params) {
      const esValue = getESValue(this, globalObject, Impl);

      return esValue[implSymbol]['alignElement'](params);
    }
  }
  Object.defineProperties(Element.prototype, {
    hasAttributes: { enumerable: true },
    getAttributeNames: { enumerable: true },
    getAttribute: { enumerable: true },
    getAttributeNS: { enumerable: true },
    setAttribute: { enumerable: true },
    setAttributeNS: { enumerable: true },
    removeAttribute: { enumerable: true },
    removeAttributeNS: { enumerable: true },
    toggleAttribute: { enumerable: true },
    hasAttribute: { enumerable: true },
    hasAttributeNS: { enumerable: true },
    getAttributeNode: { enumerable: true },
    getAttributeNodeNS: { enumerable: true },
    setAttributeNode: { enumerable: true },
    setAttributeNodeNS: { enumerable: true },
    removeAttributeNode: { enumerable: true },
    attachShadow: { enumerable: true },
    closest: { enumerable: true },
    matches: { enumerable: true },
    webkitMatchesSelector: { enumerable: true },
    getElementsByTagName: { enumerable: true },
    getElementsByTagNameNS: { enumerable: true },
    getElementsByClassName: { enumerable: true },
    insertAdjacentElement: { enumerable: true },
    insertAdjacentText: { enumerable: true },
    getClientRects: { enumerable: true },
    getBoundingClientRect: { enumerable: true },
    before: { enumerable: true },
    after: { enumerable: true },
    replaceWith: { enumerable: true },
    remove: { enumerable: true },
    prepend: { enumerable: true },
    append: { enumerable: true },
    querySelector: { enumerable: true },
    querySelectorAll: { enumerable: true },
    namespaceURI: { enumerable: true },
    prefix: { enumerable: true },
    localName: { enumerable: true },
    tagName: { enumerable: true },
    id: { enumerable: true },
    className: { enumerable: true },
    classList: { enumerable: true },
    slot: { enumerable: true },
    attributes: { enumerable: true },
    shadowRoot: { enumerable: true },
    innerHTML: { enumerable: true },
    outerHTML: { enumerable: true },
    scrollTop: { enumerable: true },
    scrollLeft: { enumerable: true },
    scrollWidth: { enumerable: true },
    scrollHeight: { enumerable: true },
    clientTop: { enumerable: true },
    clientLeft: { enumerable: true },
    clientWidth: { enumerable: true },
    clientHeight: { enumerable: true },
    previousElementSibling: { enumerable: true },
    nextElementSibling: { enumerable: true },
    children: { enumerable: true },
    firstElementChild: { enumerable: true },
    lastElementChild: { enumerable: true },
    childElementCount: { enumerable: true },
    assignedSlot: { enumerable: true },
    [Symbol.toStringTag]: { value: 'Element', configurable: true },
    [Symbol.unscopables]: {
      value: {
        slot: true,
        before: true,
        after: true,
        replaceWith: true,
        remove: true,
        prepend: true,
        append: true,
        __proto__: null
      },
      configurable: true
    }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = Element;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Element
  });
};

const Impl = require('../nodes/Element-impl.js');
