"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/Node-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const EventTarget = require("./EventTarget.js");

const interfaceName = "Node";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("Node", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  EventTarget._internalSetup(wrapper, globalObject);
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
  const wrapper = utils.makeWrapper(Node, globalObject);

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
  if (globalObject.EventTarget === undefined) {
    throw new Error("Internal error: attempting to evaluate Node before EventTarget");
  }
  class Node extends globalObject.EventTarget {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    normalize() {
      const esValue = this || globalObject;

      return esValue[implSymbol].normalize();
    }

    cloneNode() {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].cloneNode(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    isEqualNode(otherNode) {
      const esValue = this || globalObject;

      return esValue[implSymbol].isEqualNode(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    isSameNode(otherNode) {
      const esValue = this || globalObject;

      return esValue[implSymbol].isSameNode(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    compareDocumentPosition(other) {
      const esValue = this || globalObject;

      return esValue[implSymbol].compareDocumentPosition(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    contains(other) {
      const esValue = this || globalObject;

      return esValue[implSymbol].contains(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    lookupPrefix(namespace) {
      const esValue = this || globalObject;

      return esValue[implSymbol].lookupPrefix(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    lookupNamespaceURI(prefix) {
      const esValue = this || globalObject;

      return esValue[implSymbol].lookupNamespaceURI(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    isDefaultNamespace(namespace) {
      const esValue = this || globalObject;

      return esValue[implSymbol].isDefaultNamespace(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    insertBefore(node, child) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].insertBefore(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    appendChild(node) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].appendChild(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    replaceChild(node, child) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].replaceChild(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    removeChild(child) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].removeChild(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    get nodeType() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["nodeType"];
    }

    get nodeName() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["nodeName"];
    }

    get ownerDocument() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["ownerDocument"]);
    }

    get parentNode() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["parentNode"]);
    }

    get parentElement() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["parentElement"]);
    }

    get firstChild() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["firstChild"]);
    }

    get lastChild() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["lastChild"]);
    }

    get previousSibling() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["previousSibling"]);
    }

    get nextSibling() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["nextSibling"]);
    }

    get nodeValue() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["nodeValue"];
    }

    set nodeValue(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["nodeValue"] = V;
    }

    get textContent() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      return esValue[implSymbol]["textContent"];
    }

    set textContent(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["textContent"] = V;
    }
  }
  Object.defineProperties(Node.prototype, {
    normalize: { enumerable: true },
    cloneNode: { enumerable: true },
    isEqualNode: { enumerable: true },
    isSameNode: { enumerable: true },
    compareDocumentPosition: { enumerable: true },
    contains: { enumerable: true },
    lookupPrefix: { enumerable: true },
    lookupNamespaceURI: { enumerable: true },
    isDefaultNamespace: { enumerable: true },
    insertBefore: { enumerable: true },
    appendChild: { enumerable: true },
    replaceChild: { enumerable: true },
    removeChild: { enumerable: true },
    nodeType: { enumerable: true },
    nodeName: { enumerable: true },
    ownerDocument: { enumerable: true },
    parentNode: { enumerable: true },
    parentElement: { enumerable: true },
    firstChild: { enumerable: true },
    lastChild: { enumerable: true },
    previousSibling: { enumerable: true },
    nextSibling: { enumerable: true },
    nodeValue: { enumerable: true },
    textContent: { enumerable: true },
    [Symbol.toStringTag]: { value: "Node", configurable: true },
    ELEMENT_NODE: { value: 1, enumerable: true },
    ATTRIBUTE_NODE: { value: 2, enumerable: true },
    TEXT_NODE: { value: 3, enumerable: true },
    CDATA_SECTION_NODE: { value: 4, enumerable: true },
    ENTITY_REFERENCE_NODE: { value: 5, enumerable: true },
    ENTITY_NODE: { value: 6, enumerable: true },
    PROCESSING_INSTRUCTION_NODE: { value: 7, enumerable: true },
    COMMENT_NODE: { value: 8, enumerable: true },
    DOCUMENT_NODE: { value: 9, enumerable: true },
    DOCUMENT_TYPE_NODE: { value: 10, enumerable: true },
    DOCUMENT_FRAGMENT_NODE: { value: 11, enumerable: true },
    NOTATION_NODE: { value: 12, enumerable: true },
    DOCUMENT_POSITION_DISCONNECTED: { value: 0x01, enumerable: true },
    DOCUMENT_POSITION_PRECEDING: { value: 0x02, enumerable: true },
    DOCUMENT_POSITION_FOLLOWING: { value: 0x04, enumerable: true },
    DOCUMENT_POSITION_CONTAINS: { value: 0x08, enumerable: true },
    DOCUMENT_POSITION_CONTAINED_BY: { value: 0x10, enumerable: true },
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: { value: 0x20, enumerable: true }
  });
  Object.defineProperties(Node, {
    ELEMENT_NODE: { value: 1, enumerable: true },
    ATTRIBUTE_NODE: { value: 2, enumerable: true },
    TEXT_NODE: { value: 3, enumerable: true },
    CDATA_SECTION_NODE: { value: 4, enumerable: true },
    ENTITY_REFERENCE_NODE: { value: 5, enumerable: true },
    ENTITY_NODE: { value: 6, enumerable: true },
    PROCESSING_INSTRUCTION_NODE: { value: 7, enumerable: true },
    COMMENT_NODE: { value: 8, enumerable: true },
    DOCUMENT_NODE: { value: 9, enumerable: true },
    DOCUMENT_TYPE_NODE: { value: 10, enumerable: true },
    DOCUMENT_FRAGMENT_NODE: { value: 11, enumerable: true },
    NOTATION_NODE: { value: 12, enumerable: true },
    DOCUMENT_POSITION_DISCONNECTED: { value: 0x01, enumerable: true },
    DOCUMENT_POSITION_PRECEDING: { value: 0x02, enumerable: true },
    DOCUMENT_POSITION_FOLLOWING: { value: 0x04, enumerable: true },
    DOCUMENT_POSITION_CONTAINS: { value: 0x08, enumerable: true },
    DOCUMENT_POSITION_CONTAINED_BY: { value: 0x10, enumerable: true },
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: { value: 0x20, enumerable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = Node;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Node
  });
};
