'use strict';

// const { CookieJar } = require('tough-cookie');

const NodeImpl = require('./Node-impl').implementation;
const idlUtils = require('../generated/utils');
const NODE_TYPE = require('../node-type');
const { mixin, memoizeQuery } = require('../../utils');
const { firstChildWithLocalName, firstChildWithLocalNames } = require('../helpers/traversal');
const { domSymbolTree } = require('../helpers/internal-constants');
const eventAccessors = require('../helpers/create-event-accessor');
const { asciiLowercase, stripAndCollapseASCIIWhitespace } = require('../helpers/strings');
const { HTML_NS, SVG_NS } = require('../helpers/namespaces');
const DOMException = require('domexception/webidl2js-wrapper');
// const History = require('../generated/History');
// const Location = require('../generated/Location');
// const HTMLCollection = require('../generated/HTMLCollection');
const NodeList = require('../generated/NodeList');
const validateName = require('../helpers/validate-names').name;
const { validateAndExtract } = require('../helpers/validate-names');
const { fireAnEvent } = require('../helpers/events');
const { shadowIncludingInclusiveDescendantsIterator } = require('../helpers/shadow-dom');
const { enqueueCECallbackReaction } = require('../helpers/custom-elements');
const { createElement, internalCreateElementNSSteps } = require('../helpers/create-element');

const GlobalEventHandlersImpl = require('./GlobalEventHandlers-impl').implementation;
const NonElementParentNodeImpl = require('./NonElementParentNode-impl').implementation;
const ParentNodeImpl = require('./ParentNode-impl').implementation;

const {
  clone,
  listOfElementsWithQualifiedName,
  listOfElementsWithNamespaceAndLocalName,
  listOfElementsWithClassNames
} = require('../node');
const generatedAttr = require('../generated/Attr');
const Comment = require('../generated/Comment');
const ProcessingInstruction = require('../generated/ProcessingInstruction');
const CDATASection = require('../generated/CDATASection');
const Text = require('../generated/Text');
const DocumentFragment = require('../generated/DocumentFragment');
const DOMImplementation = require('../generated/DOMImplementation');
const TreeWalker = require('../generated/TreeWalker');
const NodeIterator = require('../generated/NodeIterator');
const Range = require('../generated/Range');
const documents = require('../documents.js');

const CustomEvent = require('../generated/CustomEvent');
const ErrorEvent = require('../generated/ErrorEvent');
const Event = require('../generated/Event');
const FocusEvent = require('../generated/FocusEvent');
const HashChangeEvent = require('../generated/HashChangeEvent');
const KeyboardEvent = require('../generated/KeyboardEvent');
const MessageEvent = require('../generated/MessageEvent');
const MouseEvent = require('../generated/MouseEvent');
const PopStateEvent = require('../generated/PopStateEvent');
const ProgressEvent = require('../generated/ProgressEvent');
const TouchEvent = require('../generated/TouchEvent');
const UIEvent = require('../generated/UIEvent');

const RequestManager = require('../../browser/resources/request-manager');
const AsyncResourceQueue = require('../../browser/resources/async-resource-queue');
const ResourceQueue = require('../../browser/resources/resource-queue');
// const PerDocumentResourceLoader = require('../../browser/resources/per-document-resource-loader');

function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

function toLastModifiedString(date) {
  return (
    pad(date.getMonth() + 1) +
    '/' +
    pad(date.getDate()) +
    '/' +
    date.getFullYear() +
    ' ' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds())
  );
}

const eventInterfaceTable = {
  customevent: CustomEvent,
  errorevent: ErrorEvent,
  event: Event,
  events: Event,
  focusevent: FocusEvent,
  hashchangeevent: HashChangeEvent,
  htmlevents: Event,
  keyboardevent: KeyboardEvent,
  messageevent: MessageEvent,
  mouseevent: MouseEvent,
  mouseevents: MouseEvent,
  popstateevent: PopStateEvent,
  progressevent: ProgressEvent,
  svgevents: Event,
  touchevent: TouchEvent,
  uievent: UIEvent,
  uievents: UIEvent
};

class DocumentImpl extends NodeImpl {
  constructor(globalObject, args, privateData) {
    super(globalObject, args, privateData);

    this._initGlobalEvents();

    this._ownerDocument = this;
    this.nodeType = NODE_TYPE.DOCUMENT_NODE;
    if (!privateData.options) {
      privateData.options = {};
    }
    if (!privateData.options.parsingMode) {
      privateData.options.parsingMode = 'xml';
    }
    if (!privateData.options.encoding) {
      privateData.options.encoding = 'UTF-8';
    }
    if (!privateData.options.contentType) {
      privateData.options.contentType = privateData.options.parsingMode === 'xml' ? 'application/xml' : 'text/html';
    }

    this._parsingMode = privateData.options.parsingMode;

    this._implementation = DOMImplementation.createImpl(this._globalObject, [], {
      ownerDocument: this
    });

    this._defaultView = privateData.options.defaultView || null;
    this._global = privateData.options.global;
    this._ids = Object.create(null);
    this._attached = true;
    this._currentScript = null;
    this._pageShowingFlag = false;
    this._cookieJar = privateData.options.cookieJar;
    this._parseOptions = privateData.options.parseOptions;
    this._scriptingDisabled = privateData.options.scriptingDisabled;
    // if (this._cookieJar === undefined) {
    //   this._cookieJar = new CookieJar(null, { looseMode: true });
    // }

    this.contentType = privateData.options.contentType;
    this._encoding = privateData.options.encoding;

    const urlOption = privateData.options.url === undefined ? 'about:blank' : privateData.options.url;
    // const parsed = whatwgURL.parseURL(urlOption);
    // if (parsed === null) {
    //   throw new TypeError(`Could not parse "${urlOption}" as a URL`);
    // }

    // this._URL = parsed;
    // this._origin = whatwgURL.serializeURLOrigin(parsed);

    // this._location = Location.createImpl(this._globalObject, [], { relevantDocument: this });
    // this._history = History.createImpl(this._globalObject, [], {
    //   window: this._defaultView,
    //   document: this,
    //   actAsIfLocationReloadCalled: () => this._location.reload()
    // });

    this._workingNodeIterators = [];
    this._workingNodeIteratorsMax =
      privateData.options.concurrentNodeIterators === undefined
        ? 10
        : Number(privateData.options.concurrentNodeIterators);

    if (isNaN(this._workingNodeIteratorsMax)) {
      throw new TypeError("The 'concurrentNodeIterators' option must be a Number");
    }

    if (this._workingNodeIteratorsMax < 0) {
      throw new RangeError("The 'concurrentNodeIterators' option must be a non negative Number");
    }

    this._referrer = privateData.options.referrer || '';
    this._lastModified = toLastModifiedString(privateData.options.lastModified || new Date());
    this._asyncQueue = new AsyncResourceQueue();
    this._queue = new ResourceQueue({ asyncQueue: this._asyncQueue, paused: false });
    this._deferQueue = new ResourceQueue({ paused: true });
    this._requestManager = new RequestManager();
    this._currentDocumentReadiness = privateData.options.readyState || 'loading';

    this._lastFocusedElement = null;

    // this._resourceLoader = new PerDocumentResourceLoader(this);

    // Each Document in a browsing context can also have a latest entry. This is the entry for that Document
    // to which the browsing context's session history was most recently traversed. When a Document is created,
    // it initially has no latest entry.
    this._latestEntry = null;

    // https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#throw-on-dynamic-markup-insertion-counter
    this._throwOnDynamicMarkupInsertionCounter = 0;

    // ywx:
    this.$cargo.type = 'Document';
    this.$cargo.info = { nodeName: this.nodeName };
  }

  _getTheParent(event) {
    if (event.type === 'load' || !this._defaultView) {
      return null;
    }

    return idlUtils.implForWrapper(this._defaultView);
  }

  get compatMode() {
    return this._parsingMode === 'xml' || this.doctype ? 'CSS1Compat' : 'BackCompat';
  }
  get charset() {
    return this._encoding;
  }
  get characterSet() {
    return this._encoding;
  }
  get inputEncoding() {
    return this._encoding;
  }
  get doctype() {
    for (const childNode of domSymbolTree.childrenIterator(this)) {
      if (childNode.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE) {
        return childNode;
      }
    }
    return null;
  }
  get location() {
    return this._defaultView ? this._location : null;
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

  get implementation() {
    return this._implementation;
  }
  set implementation(implementation) {
    this._implementation = implementation;
  }

  get defaultView() {
    return this._defaultView;
  }

  get currentScript() {
    return this._currentScript;
  }

  get readyState() {
    return this._currentDocumentReadiness;
  }

  set readyState(state) {
    this._currentDocumentReadiness = state;
    fireAnEvent('readystatechange', this);
  }

  hasFocus() {
    return Boolean(this._lastFocusedElement);
  }

  _descendantRemoved(parent, child) {
    if (child.tagName === 'STYLE') {
      this.styleSheets._remove(child.sheet);
    }

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

  open() {
    let child = domSymbolTree.firstChild(this);
    while (child) {
      this.removeChild(child);
      child = domSymbolTree.firstChild(this);
    }
    this._modified();
    return this;
  }
  close(noQueue) {
    // In some cases like when creating an empty iframe, I want to emit the
    // events right away to avoid problems if later I asign the property src.
    if (noQueue) {
      this.readyState = 'complete';

      fireAnEvent('DOMContentLoaded', this, undefined, { bubbles: true });
      fireAnEvent('load', this);

      return;
    }
    this._queue.resume();

    const dummyPromise = Promise.resolve();

    const onDOMContentLoad = () => {
      const doc = this;
      function dispatchEvent() {
        // https://html.spec.whatwg.org/#the-end
        doc.readyState = 'interactive';
        fireAnEvent('DOMContentLoaded', doc, undefined, { bubbles: true });
      }

      return new Promise((resolve) => {
        if (!this._deferQueue.tail) {
          dispatchEvent();
          return resolve();
        }

        this._deferQueue.setListener(() => {
          dispatchEvent();
          resolve();
        });

        return this._deferQueue.resume();
      });
    };

    const onLoad = () => {
      const doc = this;
      function dispatchEvent() {
        doc.readyState = 'complete';
        fireAnEvent('load', doc);
      }

      return new Promise((resolve) => {
        if (this._asyncQueue.count() === 0) {
          dispatchEvent();
          return resolve();
        }

        return this._asyncQueue.setListener(() => {
          dispatchEvent();
          resolve();
        });
      });
    };

    this._queue.push(dummyPromise, onDOMContentLoad, null);
    // Set the readyState to 'complete' once all resources are loaded.
    // As a side-effect the document's load-event will be dispatched.
    this._queue.push(dummyPromise, onLoad, null, true);
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

  set body(value) {
    if (
      value === null ||
      value._namespaceURI !== HTML_NS ||
      (value._localName !== 'body' && value._localName !== 'frameset')
    ) {
      throw DOMException.create(this._globalObject, [
        'Cannot set the body to null or a non-body/frameset element',
        'HierarchyRequestError'
      ]);
    }

    const bodyElement = this.body;
    if (value === bodyElement) {
      return;
    }

    if (bodyElement !== null) {
      bodyElement.parentNode._replace(value, bodyElement);
      return;
    }

    const { documentElement } = this;
    if (documentElement === null) {
      throw DOMException.create(this._globalObject, [
        'Cannot set the body when there is no document element',
        'HierarchyRequestError'
      ]);
    }

    documentElement._append(value);
  }

  _runPreRemovingSteps(oldNode) {
    for (const activeNodeIterator of this._workingNodeIterators) {
      activeNodeIterator._preRemovingSteps(oldNode);
    }
  }

  createEvent(type) {
    const typeLower = type.toLowerCase();
    const eventWrapper = eventInterfaceTable[typeLower] || null;

    if (!eventWrapper) {
      throw DOMException.create(this._globalObject, [
        'The provided event type ("' + type + '") is invalid',
        'NotSupportedError'
      ]);
    }

    const impl = eventWrapper.createImpl(this._globalObject, [ '' ]);
    impl._initializedFlag = false;
    return impl;
  }

  createRange() {
    return Range.createImpl(this._globalObject, [], {
      start: { node: this, offset: 0 },
      end: { node: this, offset: 0 }
    });
  }

  createProcessingInstruction(target, data) {
    validateName(this._globalObject, target);

    if (data.includes('?>')) {
      throw DOMException.create(this._globalObject, [
        'Processing instruction data cannot contain the string "?>"',
        'InvalidCharacterError'
      ]);
    }

    return ProcessingInstruction.createImpl(this._globalObject, [], {
      ownerDocument: this,
      target,
      data
    });
  }

  // https://dom.spec.whatwg.org/#dom-document-createcdatasection
  createCDATASection(data) {
    if (this._parsingMode === 'html') {
      throw DOMException.create(this._globalObject, [
        'Cannot create CDATA sections in HTML documents',
        'NotSupportedError'
      ]);
    }

    if (data.includes(']]>')) {
      throw DOMException.create(this._globalObject, [
        'CDATA section data cannot contain the string "]]>"',
        'InvalidCharacterError'
      ]);
    }

    return CDATASection.createImpl(this._globalObject, [], {
      ownerDocument: this,
      data
    });
  }

  createTextNode(data) {
    return Text.createImpl(this._globalObject, [], {
      ownerDocument: this,
      data
    });
  }

  createComment(data) {
    return Comment.createImpl(this._globalObject, [], {
      ownerDocument: this,
      data
    });
  }

  // https://dom.spec.whatwg.org/#dom-document-createelement
  createElement(localName, options) {
    validateName(this._globalObject, localName);

    if (this._parsingMode === 'html') {
      localName = asciiLowercase(localName);
    }

    let isValue = null;
    if (options && options.is !== undefined) {
      isValue = options.is;
    }

    const namespace = this._parsingMode === 'html' || this.contentType === 'application/xhtml+xml' ? HTML_NS : null;

    return createElement(this, localName, namespace, null, isValue, true, options && options.cargo);
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

    if (this._parsingMode === 'html') {
      localName = asciiLowercase(localName);
    }

    return this._createAttribute({ localName });
  }

  createAttributeNS(namespace, name) {
    if (namespace === undefined) {
      namespace = null;
    }
    namespace = namespace !== null ? String(namespace) : namespace;

    const extracted = validateAndExtract(this._globalObject, namespace, name);
    return this._createAttribute({
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

  // TODO: Add callback interface support to `webidl2js`
  createTreeWalker(root, whatToShow, filter) {
    return TreeWalker.createImpl(this._globalObject, [], { root, whatToShow, filter });
  }

  createNodeIterator(root, whatToShow, filter) {
    const nodeIterator = NodeIterator.createImpl(this._globalObject, [], { root, whatToShow, filter });

    this._workingNodeIterators.push(nodeIterator);
    while (this._workingNodeIterators.length > this._workingNodeIteratorsMax) {
      const toInactivate = this._workingNodeIterators.shift();
      toInactivate._working = false;
    }

    return nodeIterator;
  }

  importNode(node, deep) {
    if (node.nodeType === NODE_TYPE.DOCUMENT_NODE) {
      throw DOMException.create(this._globalObject, [ 'Cannot import a document node', 'NotSupportedError' ]);
    }

    return clone(node, this, deep);
  }

  // https://dom.spec.whatwg.org/#dom-document-adoptnode
  adoptNode(node) {
    if (node.nodeType === NODE_TYPE.DOCUMENT_NODE) {
      throw DOMException.create(this._globalObject, [ 'Cannot adopt a document node', 'NotSupportedError' ]);
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
  // The clear(), captureEvents(), and releaseEvents() methods must do nothing
  clear() {}

  captureEvents() {}

  releaseEvents() {}

  get hidden() {
    if (this._defaultView && this._defaultView._pretendToBeVisual) {
      return false;
    }

    return true;
  }

  get visibilityState() {
    if (this._defaultView && this._defaultView._pretendToBeVisual) {
      return 'visible';
    }

    return 'prerender';
  }

  // https://w3c.github.io/selection-api/#extensions-to-document-interface
  getSelection() {
    return this._defaultView ? this._defaultView._selection : null;
  }

  // Needed to ensure that the resulting document has the correct prototype chain:
  // https://dom.spec.whatwg.org/#concept-node-clone says "that implements the same interfaces as node".
  _cloneDocument() {
    const copy = documents.createImpl(this._globalObject, {
      contentType: this.contentType,
      encoding: this._encoding,
      parsingMode: this._parsingMode
    });

    copy._URL = this._URL;
    copy._origin = this._origin;
    return copy;
  }
}

eventAccessors.createEventAccessor(DocumentImpl.prototype, 'readystatechange');
mixin(DocumentImpl.prototype, GlobalEventHandlersImpl.prototype);
mixin(DocumentImpl.prototype, NonElementParentNodeImpl.prototype);
mixin(DocumentImpl.prototype, ParentNodeImpl.prototype);

DocumentImpl.prototype.getElementsByTagName = memoizeQuery(function(qualifiedName) {
  return listOfElementsWithQualifiedName(qualifiedName, this);
});

DocumentImpl.prototype.getElementsByTagNameNS = memoizeQuery(function(namespace, localName) {
  return listOfElementsWithNamespaceAndLocalName(namespace, localName, this);
});

DocumentImpl.prototype.getElementsByClassName = memoizeQuery(function getElementsByClassName(classNames) {
  return listOfElementsWithClassNames(classNames, this);
});

module.exports = {
  implementation: DocumentImpl
};
