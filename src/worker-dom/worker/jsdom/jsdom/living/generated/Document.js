'use strict';

const conversions = require('webidl-conversions');
const utils = require('./utils.js');

const ElementCreationOptions = require('./ElementCreationOptions.js');
const ceReactionsPreSteps_helpers_custom_elements = require('../helpers/custom-elements.js').ceReactionsPreSteps;
const ceReactionsPostSteps_helpers_custom_elements = require('../helpers/custom-elements.js').ceReactionsPostSteps;
const Node = require('./Node.js');
const HTMLElement = require('./HTMLElement.js');
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = 'Document';

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
  throw new TypeError(`${context} is not of type 'Document'.`);
};

exports.create = function create(globalObject, constructorArgs, privateData) {
  if (globalObject[ctorRegistrySymbol] === undefined) {
    throw new Error('Internal error: invalid global object');
  }

  const ctor = globalObject[ctorRegistrySymbol]['Document'];
  if (ctor === undefined) {
    throw new Error('Internal error: constructor Document is not installed on the passed global object');
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

  Object.defineProperties(
    obj,
    Object.getOwnPropertyDescriptors({
      get location() {
        const esValue = this !== null && this !== undefined ? this : globalObject;

        if (!exports.is(esValue)) {
          throw new TypeError('Illegal invocation');
        }

        return utils.tryWrapperForImpl(esValue[implSymbol]['location']);
      },
      set location(V) {
        const esValue = this !== null && this !== undefined ? this : globalObject;

        if (!exports.is(esValue)) {
          throw new TypeError('Illegal invocation');
        }

        this.location.href = V;
      }
    })
  );

  Object.defineProperties(obj, { location: { configurable: false } });
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
    throw new Error('Internal error: attempting to evaluate Document before Node');
  }
  class Document extends globalObject.Node {
    constructor() {
      return exports.setup(Object.create(new.target.prototype), globalObject, undefined);
    }

    getElementsByTagName(qualifiedName) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'getElementsByTagName' on 'Document': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'getElementsByTagName' on 'Document': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].getElementsByTagName(...args));
    }

    getElementsByTagNameNS(namespace, localName) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 2) {
        throw new TypeError(
          "Failed to execute 'getElementsByTagNameNS' on 'Document': 2 arguments required, but only " +
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
            context: "Failed to execute 'getElementsByTagNameNS' on 'Document': parameter 1"
          });
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'getElementsByTagNameNS' on 'Document': parameter 2"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].getElementsByTagNameNS(...args));
    }

    getElementsByClassName(classNames) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'getElementsByClassName' on 'Document': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'getElementsByClassName' on 'Document': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].getElementsByClassName(...args));
    }

    createElement(localName) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'createElement' on 'Document': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'createElement' on 'Document': parameter 1"
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          if (curArg === null || curArg === undefined) {
            curArg = ElementCreationOptions.convert(curArg, {
              context: "Failed to execute 'createElement' on 'Document': parameter 2"
            });
          } else if (utils.isObject(curArg)) {
            const cargo = curArg.cargo;
            curArg = ElementCreationOptions.convert(curArg, {
              context: "Failed to execute 'createElement' on 'Document': parameter 2" + ' dictionary'
            });
            curArg.cargo = cargo;
          } else {
            curArg = conversions['DOMString'](curArg, {
              context: "Failed to execute 'createElement' on 'Document': parameter 2"
            });
          }
        }
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return utils.tryWrapperForImpl(esValue[implSymbol].createElement(...args));
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    createElementNS(namespace, qualifiedName) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 2) {
        throw new TypeError(
          "Failed to execute 'createElementNS' on 'Document': 2 arguments required, but only " +
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
            context: "Failed to execute 'createElementNS' on 'Document': parameter 1"
          });
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'createElementNS' on 'Document': parameter 2"
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[2];
        if (curArg !== undefined) {
          if (curArg === null || curArg === undefined) {
            curArg = ElementCreationOptions.convert(curArg, {
              context: "Failed to execute 'createElementNS' on 'Document': parameter 3"
            });
          } else if (utils.isObject(curArg)) {
            curArg = ElementCreationOptions.convert(curArg, {
              context: "Failed to execute 'createElementNS' on 'Document': parameter 3" + ' dictionary'
            });
          } else {
            curArg = conversions['DOMString'](curArg, {
              context: "Failed to execute 'createElementNS' on 'Document': parameter 3"
            });
          }
        }
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return utils.tryWrapperForImpl(esValue[implSymbol].createElementNS(...args));
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    createDocumentFragment() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol].createDocumentFragment());
    }

    createTextNode(data) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'createTextNode' on 'Document': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'createTextNode' on 'Document': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].createTextNode(...args));
    }

    createCDATASection(data) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'createCDATASection' on 'Document': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'createCDATASection' on 'Document': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].createCDATASection(...args));
    }

    createComment(data) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'createComment' on 'Document': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'createComment' on 'Document': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].createComment(...args));
    }

    createProcessingInstruction(target, data) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 2) {
        throw new TypeError(
          "Failed to execute 'createProcessingInstruction' on 'Document': 2 arguments required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'createProcessingInstruction' on 'Document': parameter 1"
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'createProcessingInstruction' on 'Document': parameter 2"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].createProcessingInstruction(...args));
    }

    importNode(node) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'importNode' on 'Document': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = Node.convert(curArg, { context: "Failed to execute 'importNode' on 'Document': parameter 1" });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          curArg = conversions['boolean'](curArg, {
            context: "Failed to execute 'importNode' on 'Document': parameter 2"
          });
        } else {
          curArg = false;
        }
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return utils.tryWrapperForImpl(esValue[implSymbol].importNode(...args));
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    adoptNode(node) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'adoptNode' on 'Document': 1 argument required, but only " + arguments.length + ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = Node.convert(curArg, { context: "Failed to execute 'adoptNode' on 'Document': parameter 1" });
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return utils.tryWrapperForImpl(esValue[implSymbol].adoptNode(...args));
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    createAttribute(localName) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'createAttribute' on 'Document': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'createAttribute' on 'Document': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].createAttribute(...args));
    }

    createAttributeNS(namespace, qualifiedName) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 2) {
        throw new TypeError(
          "Failed to execute 'createAttributeNS' on 'Document': 2 arguments required, but only " +
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
            context: "Failed to execute 'createAttributeNS' on 'Document': parameter 1"
          });
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'createAttributeNS' on 'Document': parameter 2"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].createAttributeNS(...args));
    }

    createEvent(interface_) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'createEvent' on 'Document': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'createEvent' on 'Document': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].createEvent(...args));
    }

    createRange() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol].createRange());
    }

    createNodeIterator(root) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'createNodeIterator' on 'Document': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = Node.convert(curArg, { context: "Failed to execute 'createNodeIterator' on 'Document': parameter 1" });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          curArg = conversions['unsigned long'](curArg, {
            context: "Failed to execute 'createNodeIterator' on 'Document': parameter 2"
          });
        } else {
          curArg = 0xffffffff;
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[2];
        if (curArg !== undefined) {
          if (curArg === null || curArg === undefined) {
            curArg = null;
          } else {
            curArg = utils.tryImplForWrapper(curArg);
          }
        } else {
          curArg = null;
        }
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].createNodeIterator(...args));
    }

    createTreeWalker(root) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'createTreeWalker' on 'Document': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = Node.convert(curArg, { context: "Failed to execute 'createTreeWalker' on 'Document': parameter 1" });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          curArg = conversions['unsigned long'](curArg, {
            context: "Failed to execute 'createTreeWalker' on 'Document': parameter 2"
          });
        } else {
          curArg = 0xffffffff;
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[2];
        if (curArg !== undefined) {
          if (curArg === null || curArg === undefined) {
            curArg = null;
          } else {
            curArg = utils.tryImplForWrapper(curArg);
          }
        } else {
          curArg = null;
        }
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].createTreeWalker(...args));
    }

    getElementsByName(elementName) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'getElementsByName' on 'Document': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'getElementsByName' on 'Document': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].getElementsByName(...args));
    }

    open() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg !== undefined) {
          curArg = conversions['DOMString'](curArg, { context: "Failed to execute 'open' on 'Document': parameter 1" });
        } else {
          curArg = 'text/html';
        }
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          curArg = conversions['DOMString'](curArg, { context: "Failed to execute 'open' on 'Document': parameter 2" });
        } else {
          curArg = '';
        }
        args.push(curArg);
      }
      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return utils.tryWrapperForImpl(esValue[implSymbol].open(...args));
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    close() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return esValue[implSymbol].close();
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    captureEvents() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return esValue[implSymbol].captureEvents();
    }

    releaseEvents() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return esValue[implSymbol].releaseEvents();
    }

    getSelection() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol].getSelection());
    }

    getElementById(elementId) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'getElementById' on 'Document': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'getElementById' on 'Document': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].getElementById(...args));
    }

    prepend() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }
      const args = [];
      for (let i = 0; i < arguments.length; i++) {
        let curArg = arguments[i];
        if (Node.is(curArg)) {
          curArg = utils.implForWrapper(curArg);
        } else {
          curArg = conversions['DOMString'](curArg, {
            context: "Failed to execute 'prepend' on 'Document': parameter " + (i + 1)
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
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }
      const args = [];
      for (let i = 0; i < arguments.length; i++) {
        let curArg = arguments[i];
        if (Node.is(curArg)) {
          curArg = utils.implForWrapper(curArg);
        } else {
          curArg = conversions['DOMString'](curArg, {
            context: "Failed to execute 'append' on 'Document': parameter " + (i + 1)
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
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'querySelector' on 'Document': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'querySelector' on 'Document': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].querySelector(...args));
    }

    querySelectorAll(selectors) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'querySelectorAll' on 'Document': 1 argument required, but only " +
            arguments.length +
            ' present.'
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions['DOMString'](curArg, {
          context: "Failed to execute 'querySelectorAll' on 'Document': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].querySelectorAll(...args));
    }

    get implementation() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.getSameObject(this, 'implementation', () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]['implementation']);
      });
    }

    get compatMode() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return esValue[implSymbol]['compatMode'];
    }

    get contentType() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return esValue[implSymbol]['contentType'];
    }

    get doctype() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]['doctype']);
    }

    get documentElement() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]['documentElement']);
    }

    get body() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        return utils.tryWrapperForImpl(esValue[implSymbol]['body']);
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    set body(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      if (V === null || V === undefined) {
        V = null;
      } else {
        V = HTMLElement.convert(V, { context: "Failed to set the 'body' property on 'Document': The provided value" });
      }

      ceReactionsPreSteps_helpers_custom_elements(globalObject);
      try {
        esValue[implSymbol]['body'] = V;
      } finally {
        ceReactionsPostSteps_helpers_custom_elements(globalObject);
      }
    }

    get head() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]['head']);
    }

    get defaultView() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]['defaultView']);
    }

    get onclick() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]['onclick']);
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
    get activeElement() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]['activeElement']);
    }

    get children() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.getSameObject(this, 'children', () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]['children']);
      });
    }

    get firstElementChild() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]['firstElementChild']);
    }

    get lastElementChild() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]['lastElementChild']);
    }

    get childElementCount() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError('Illegal invocation');
      }

      return esValue[implSymbol]['childElementCount'];
    }
  }
  Object.defineProperties(Document.prototype, {
    getElementsByTagName: { enumerable: true },
    getElementsByTagNameNS: { enumerable: true },
    getElementsByClassName: { enumerable: true },
    createElement: { enumerable: true },
    createElementNS: { enumerable: true },
    createDocumentFragment: { enumerable: true },
    createTextNode: { enumerable: true },
    createCDATASection: { enumerable: true },
    createComment: { enumerable: true },
    createProcessingInstruction: { enumerable: true },
    importNode: { enumerable: true },
    adoptNode: { enumerable: true },
    createAttribute: { enumerable: true },
    createAttributeNS: { enumerable: true },
    createEvent: { enumerable: true },
    createRange: { enumerable: true },
    createNodeIterator: { enumerable: true },
    createTreeWalker: { enumerable: true },
    getElementsByName: { enumerable: true },
    open: { enumerable: true },
    close: { enumerable: true },
    write: { enumerable: true },
    writeln: { enumerable: true },
    hasFocus: { enumerable: true },
    clear: { enumerable: true },
    captureEvents: { enumerable: true },
    releaseEvents: { enumerable: true },
    getSelection: { enumerable: true },
    getElementById: { enumerable: true },
    prepend: { enumerable: true },
    append: { enumerable: true },
    querySelector: { enumerable: true },
    querySelectorAll: { enumerable: true },
    implementation: { enumerable: true },
    URL: { enumerable: true },
    documentURI: { enumerable: true },
    compatMode: { enumerable: true },
    characterSet: { enumerable: true },
    charset: { enumerable: true },
    inputEncoding: { enumerable: true },
    contentType: { enumerable: true },
    doctype: { enumerable: true },
    documentElement: { enumerable: true },
    referrer: { enumerable: true },
    cookie: { enumerable: true },
    lastModified: { enumerable: true },
    readyState: { enumerable: true },
    title: { enumerable: true },
    dir: { enumerable: true },
    body: { enumerable: true },
    head: { enumerable: true },
    images: { enumerable: true },
    embeds: { enumerable: true },
    plugins: { enumerable: true },
    links: { enumerable: true },
    forms: { enumerable: true },
    scripts: { enumerable: true },
    currentScript: { enumerable: true },
    defaultView: { enumerable: true },
    onreadystatechange: { enumerable: true },
    anchors: { enumerable: true },
    applets: { enumerable: true },
    styleSheets: { enumerable: true },
    hidden: { enumerable: true },
    visibilityState: { enumerable: true },
    onclick: { enumerable: true },
    oninput: { enumerable: true },
    activeElement: { enumerable: true },
    children: { enumerable: true },
    firstElementChild: { enumerable: true },
    lastElementChild: { enumerable: true },
    childElementCount: { enumerable: true },
    [Symbol.toStringTag]: { value: 'Document', configurable: true },
    [Symbol.unscopables]: { value: { prepend: true, append: true, __proto__: null }, configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = Document;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Document
  });
};

const Impl = require('../nodes/Document-impl.js');
