'use strict';

const conversions = require('webidl-conversions');
const utils = require('./utils.js');
const Impl = require('../nodes/Element-impl.js');

const Node = require('./Node.js');
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = 'Element';

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper('Element', globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  Node._internalSetup(wrapper, globalObject);
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

exports.new = (globalObject) => {
  const wrapper = utils.makeWrapper(Element, globalObject);

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

const exposed = new Set([ 'Window' ]);

exports.install = (globalObject) => {
  if (globalObject.Node === undefined) {
    throw new Error('Internal error: attempting to evaluate Element before Node');
  }
  class Element extends globalObject.Node {
    constructor() {
      throw new TypeError('Illegal constructor');
    }

    hasAttributes() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributes();
    }

    getAttributeNames() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].getAttributeNames());
    }

    getAttribute(qualifiedName) {
      const esValue = this || globalObject;

      return esValue[implSymbol].getAttribute(
        ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    getAttributeNS(namespace, localName) {
      const esValue = this || globalObject;

      return esValue[implSymbol].getAttributeNS(
        ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    setAttribute(qualifiedName, value) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setAttribute(
        ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    setAttributeNS(namespace, qualifiedName, value) {
      const esValue = this || globalObject;

      return esValue[implSymbol].setAttributeNS(
        ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    removeAttribute(qualifiedName) {
      const esValue = this || globalObject;

      return esValue[implSymbol].removeAttribute(
        ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    removeAttributeNS(namespace, localName) {
      const esValue = this || globalObject;

      return esValue[implSymbol].removeAttributeNS(
        ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    toggleAttribute(qualifiedName) {
      const esValue = this || globalObject;

      return esValue[implSymbol].toggleAttribute(
        ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    hasAttribute(qualifiedName) {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttribute(
        ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    hasAttributeNS(namespace, localName) {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(
        ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    getElementsByTagName(qualifiedName) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].getElementsByTagName(
          ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    getElementsByTagNameNS(namespace, localName) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].getElementsByTagNameNS(
          ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    getElementsByClassName(classNames) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].getElementsByClassName(
          ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    getClientRects() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].getClientRects());
    }

    getBoundingClientRect() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(esValue[implSymbol].getBoundingClientRect());
    }

    before() {
      const esValue = this || globalObject;

      return esValue[implSymbol].before(
        ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    after() {
      const esValue = this || globalObject;

      return esValue[implSymbol].after(
        ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    replaceWith() {
      const esValue = this || globalObject;

      return esValue[implSymbol].replaceWith(
        ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    remove() {
      const esValue = this || globalObject;

      return esValue[implSymbol].remove();
    }

    prepend() {
      const esValue = this || globalObject;

      return esValue[implSymbol].prepend(
        ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    append() {
      const esValue = this || globalObject;

      return esValue[implSymbol].append(
        ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    querySelector(selectors) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].querySelector(
          ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    querySelectorAll(selectors) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].querySelectorAll(
          ...Array.prototype.map.call(arguments, (v) => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    get localName() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]['localName'];
    }

    get tagName() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]['tagName'];
    }

    get id() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, 'id');
      return value === null ? '' : value;
    }

    set id(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, 'id', V);
    }

    get className() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, 'class');
      return value === null ? '' : value;
    }

    set className(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, 'class', V);
    }

    get classList() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.getSameObject(this, 'classList', () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]['classList']);
      });
    }

    set classList(V) {
      const esValue = this || globalObject;

      const Q = esValue['classList'];
      if (!utils.isObject(Q)) {
        throw new TypeError("Property 'classList' is not an object");
      }
      Reflect.set(Q, 'value', V);
    }

    get slot() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, 'slot');
      return value === null ? '' : value;
    }

    set slot(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, 'slot', V);
    }

    get scrollTop() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]['scrollTop'];
    }

    set scrollTop(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]['scrollTop'] = V;
    }

    get scrollLeft() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]['scrollLeft'];
    }

    set scrollLeft(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]['scrollLeft'] = V;
    }

    get scrollWidth() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]['scrollWidth'];
    }

    get scrollHeight() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]['scrollHeight'];
    }

    get clientTop() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]['clientTop'];
    }

    get clientLeft() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]['clientLeft'];
    }

    get clientWidth() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]['clientWidth'];
    }

    get clientHeight() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]['clientHeight'];
    }

    get previousElementSibling() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]['previousElementSibling']);
    }

    get nextElementSibling() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]['nextElementSibling']);
    }

    get children() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.getSameObject(this, 'children', () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]['children']);
      });
    }

    get firstElementChild() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]['firstElementChild']);
    }

    get lastElementChild() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]['lastElementChild']);
    }

    get childElementCount() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]['childElementCount'];
    }

    get assignedSlot() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]['assignedSlot']);
    }

    alignElement(params) {
      const esValue = this || globalObject;

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
    getElementsByTagName: { enumerable: true },
    getElementsByTagNameNS: { enumerable: true },
    getElementsByClassName: { enumerable: true },
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
    localName: { enumerable: true },
    tagName: { enumerable: true },
    id: { enumerable: true },
    className: { enumerable: true },
    classList: { enumerable: true },
    slot: { enumerable: true },
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
