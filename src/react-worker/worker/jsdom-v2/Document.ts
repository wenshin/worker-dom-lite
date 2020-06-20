import Node from './Node';
import idlUtils from 'jsdom/lib/jsdom/living/generated/utils';
import NODE_TYPE from 'jsdom/lib/jsdom/living/node-type';
import { memoizeQuery } from 'jsdom/lib/jsdom/utils';

import { firstChildWithLocalName, firstChildWithLocalNames } from 'jsdom/lib/jsdom/living/helpers/traversal';
import { domSymbolTree } from 'jsdom/lib/jsdom/living/helpers/internal-constants';
import { HTML_NS } from 'jsdom/lib/jsdom/living/helpers/namespaces';
import DOMException from 'domexception/webidl2js-wrapper';
import NodeList from 'jsdom/lib/jsdom/living/generated/NodeList';
import { name as validateName } from 'jsdom/lib/jsdom/living/helpers/validate-names';
import { validateAndExtract } from 'jsdom/lib/jsdom/living/helpers/validate-names';
import { shadowIncludingInclusiveDescendantsIterator } from 'jsdom/lib/jsdom/living/helpers/shadow-dom';

import {
  listOfElementsWithQualifiedName,
  listOfElementsWithNamespaceAndLocalName,
  listOfElementsWithClassNames
} from 'jsdom/lib/jsdom/living/node';
import generatedAttr from 'jsdom/lib/jsdom/living/generated/Attr';
import Text from 'jsdom/lib/jsdom/living/generated/Text';
import DocumentFragment from 'jsdom/lib/jsdom/living/generated/DocumentFragment';
import ShadowRoot from 'jsdom/lib/jsdom/living/generated/ShadowRoot';
import Range from 'jsdom/lib/jsdom/living/generated/Range';

import { enqueueCECallbackReaction } from './custom-elements';
import { createElement, internalCreateElementNSSteps } from './createElement';
import Bridge from '../../Bridge';

export type JSDOMDocument = Document & {
  _runPreRemovingSteps: (a: any[]) => void;
  _adoptNode: (n: Element) => void;
};

export interface DocumentOptions {
  bridge: Bridge;
  encoding?: string;
  readyState?: string;
  defaultView?: any;
}

export default class Document extends Node {
  _currentDocumentReadiness: string;
  _ids: { [key: string]: any };
  _initGlobalEvents: () => void;
  _defaultView: any;
  _encoding: string;
  _title: string;
  _workingNodeIterators: any[];

  constructor(options: DocumentOptions) {
    super({ ...options });

    this._initGlobalEvents();

    this._ownerDocument = this;
    this.nodeType = NODE_TYPE.DOCUMENT_NODE;
    this._workingNodeIterators = [];

    if (!options.encoding) {
      options.encoding = 'UTF-8';
    }

    this._ids = Object.create(null);
    this._currentDocumentReadiness = options.readyState || 'loading';
    this._defaultView = options.defaultView;
  }

  _getTheParent() {
    if (event.type === 'load' || !this._defaultView) {
      return null;
    }

    return idlUtils.implForWrapper(this._defaultView);
  }

  get charset() {
    return this._encoding;
  }

  // https://dom.spec.whatwg.org/#dom-document-documentelement
  get documentElement() {
    for (const childNode of domSymbolTree.childrenIterator(this)) {
      if (childNode.nodeType === NODE_TYPE.ELEMENT_NODE) {
        return childNode;
      }
    }

    return null;
  }

  get readyState() {
    return this._currentDocumentReadiness;
  }

  _descendantRemoved(parent, child) {
    super._descendantRemoved.apply(this, arguments);
  }

  // This is implemented separately for Document (which has a _ids cache) and DocumentFragment (which does not).
  getElementById(id) {
    if (!this._ids[id]) {
      return null;
    }

    // Let's find the first element with where it's root is the document.
    const matchElement = this._ids[id].find((candidate) => {
      let root = candidate;
      while (domSymbolTree.parent(root)) {
        root = domSymbolTree.parent(root);
      }

      return root === this;
    });

    return matchElement || null;
  }

  getElementsByName(elementName) {
    return NodeList.createImpl(this._globalObject, [], {
      element: this,
      query: () =>
        domSymbolTree.treeToArray(this, {
          filter: (node) => node.getAttributeNS && node.getAttributeNS(null, 'name') === elementName
        })
    });
  }

  get title() {
    return this._title;
  }

  set title(value) {
    // todo bridge
    this._title = value;
  }

  get head() {
    return this.documentElement ? firstChildWithLocalName(this.documentElement, 'head') : null;
  }

  get body() {
    const { documentElement } = this;
    if (!documentElement || documentElement._localName !== 'html' || documentElement._namespaceURI !== HTML_NS) {
      return null;
    }

    return firstChildWithLocalNames(this.documentElement, new Set([ 'body', 'frameset' ]));
  }

  _runPreRemovingSteps(oldNode) {
    for (const activeNodeIterator of this._workingNodeIterators) {
      activeNodeIterator._preRemovingSteps(oldNode);
    }
  }

  createRange() {
    return Range.createImpl(this._globalObject, [], {
      start: { node: this, offset: 0 },
      end: { node: this, offset: 0 }
    });
  }

  createTextNode(data) {
    return Text.createImpl(this._globalObject, [], {
      ownerDocument: this,
      data
    });
  }

  // https://dom.spec.whatwg.org/#dom-document-createelement
  createElement(localName, options) {
    validateName(this._globalObject, localName);

    let isValue = null;
    if (options && options.is !== undefined) {
      isValue = options.is;
    }

    return createElement(this, localName, HTML_NS, null, isValue, true);
  }

  // https://dom.spec.whatwg.org/#dom-document-createelementns
  createElementNS(namespace, qualifiedName, options) {
    return internalCreateElementNSSteps(this, namespace, qualifiedName, options);
  }

  createDocumentFragment() {
    return DocumentFragment.createImpl(this._globalObject, [], { ownerDocument: this });
  }

  createAttribute(localName) {
    validateName(this._globalObject, localName);
    return this._createAttribute({
      localName,
      value: null,
      namespace: null,
      namespacePrefix: null
    });
  }

  createAttributeNS(namespace, name) {
    if (namespace === undefined) {
      namespace = null;
    }
    namespace = namespace !== null ? String(namespace) : namespace;

    const extracted = validateAndExtract(this._globalObject, namespace, name);
    return this._createAttribute({
      value: null,
      namespace: extracted.namespace,
      namespacePrefix: extracted.prefix,
      localName: extracted.localName
    });
  }

  // Using this helper function rather than directly calling generatedAttr.createImpl may be preferred in some files,
  // to avoid introducing a potentially cyclic dependency on generated/Attr.js.
  _createAttribute({ localName, value, namespace, namespacePrefix }) {
    return generatedAttr.createImpl(this._globalObject, [], {
      localName,
      value,
      namespace,
      namespacePrefix,
      ownerDocument: this
    });
  }

  // https://dom.spec.whatwg.org/#dom-document-adoptnode
  adoptNode(node) {
    if (node.nodeType === NODE_TYPE.DOCUMENT_NODE) {
      throw DOMException.create(this._globalObject, [ 'Cannot adopt a document node', 'NotSupportedError' ]);
    } else if (ShadowRoot.isImpl(node)) {
      throw DOMException.create(this._globalObject, [ 'Cannot adopt a shadow root', 'HierarchyRequestError' ]);
    }

    this._adoptNode(node);

    return node;
  }

  // https://dom.spec.whatwg.org/#concept-node-adopt
  _adoptNode(node) {
    const newDocument = this;
    const oldDocument = node._ownerDocument;

    const parent = domSymbolTree.parent(node);
    if (parent) {
      parent._remove(node);
    }

    if (oldDocument !== newDocument) {
      for (const inclusiveDescendant of shadowIncludingInclusiveDescendantsIterator(node)) {
        inclusiveDescendant._ownerDocument = newDocument;
      }

      for (const inclusiveDescendant of shadowIncludingInclusiveDescendantsIterator(node)) {
        if (inclusiveDescendant._ceState === 'custom') {
          enqueueCECallbackReaction(inclusiveDescendant, 'adoptedCallback', [
            idlUtils.wrapperForImpl(oldDocument),
            idlUtils.wrapperForImpl(newDocument)
          ]);
        }
      }

      for (const inclusiveDescendant of shadowIncludingInclusiveDescendantsIterator(node)) {
        if (inclusiveDescendant._adoptingSteps) {
          inclusiveDescendant._adoptingSteps(oldDocument);
        }
      }
    }
  }
}

// @ts-ignore
Document.prototype.getElementsByTagName = memoizeQuery(function(qualifiedName) {
  return listOfElementsWithQualifiedName(qualifiedName, this);
});

// @ts-ignore
Document.prototype.getElementsByTagNameNS = memoizeQuery(function(namespace, localName) {
  return listOfElementsWithNamespaceAndLocalName(namespace, localName, this);
});

// @ts-ignore
Document.prototype.getElementsByClassName = memoizeQuery(function getElementsByClassName(classNames) {
  return listOfElementsWithClassNames(classNames, this);
});
