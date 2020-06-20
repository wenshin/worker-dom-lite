import DOMException from 'domexception/webidl2js-wrapper';
import NODE_TYPE from 'jsdom/lib/jsdom/living/node-type';
import { nodeRoot } from 'jsdom/lib/jsdom/living/helpers/node';
import { domSymbolTree } from 'jsdom/lib/jsdom/living/helpers/internal-constants';
import { queueTreeMutationRecord } from 'jsdom/lib/jsdom/living/helpers/mutation-observers';

import { setAnExistingAttributeValue } from 'jsdom/lib/jsdom/living/attributes';

import { enqueueCECallbackReaction, tryUpgradeElement } from 'jsdom/lib/jsdom/living/helpers/custom-elements';
import {
  isShadowRoot,
  shadowIncludingRoot,
  assignSlot,
  assignSlotableForTree,
  assignSlotable,
  signalSlotChange,
  isSlot,
  shadowIncludingInclusiveDescendantsIterator,
  shadowIncludingDescendantsIterator
} from 'jsdom/lib/jsdom/living/helpers/shadow-dom';
import EventTarget from './EventTarget';
import NodeList from './NodeList';
import JSDOMDocument from './Document';

// https://dom.spec.whatwg.org/#concept-tree-host-including-inclusive-ancestor
function isHostInclusiveAncestor(nodeImplA, nodeImplB) {
  for (const ancestor of domSymbolTree.ancestorsIterator(nodeImplB)) {
    if (ancestor === nodeImplA) {
      return true;
    }
  }

  const rootImplB = nodeRoot(nodeImplB);
  if (rootImplB._host) {
    return isHostInclusiveAncestor(nodeImplA, rootImplB._host);
  }

  return false;
}

class Node extends EventTarget {
  name: string;
  tagName: string;
  nodeType: number;
  target: Element;
  _qualifiedName: string;
  _ownerDocument: JSDOMDocument;
  _childNodesList: NodeList;
  _lastFocusedElement: Node;
  _version: number;
  _type: number;
  _memoizedQueries: { [key: string]: any };
  _registeredObserverList: any[];
  _referencedRanges: Set<any>;
  _childrenList: any;
  _attached: boolean;
  _globalObject: any;
  _shadowRoot: Element;
  _assignedNodes: any[];
  _value: string;
  _data: string;

  constructor(options: { ownerDocument?: JSDOMDocument }) {
    super();

    domSymbolTree.initialize(this);

    this._ownerDocument = options.ownerDocument;

    this._childNodesList = null;
    this._childrenList = null;
    this._version = 0;
    this._memoizedQueries = {};
    this._registeredObserverList = [];
    this._referencedRanges = new Set();
    this._globalObject = {};
  }

  _getTheParent() {
    return domSymbolTree.parent(this);
  }

  get parentNode() {
    return domSymbolTree.parent(this);
  }

  getRootNode(options) {
    return options.composed ? shadowIncludingRoot(this) : nodeRoot(this);
  }

  get nodeName() {
    switch (this.nodeType) {
      case NODE_TYPE.ELEMENT_NODE:
        return this.tagName;
      case NODE_TYPE.ATTRIBUTE_NODE:
        return this._qualifiedName;
      case NODE_TYPE.TEXT_NODE:
        return '#text';
      case NODE_TYPE.CDATA_SECTION_NODE:
        return '#cdata-section';
      case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
        return this.target;
      case NODE_TYPE.COMMENT_NODE:
        return '#comment';
      case NODE_TYPE.DOCUMENT_NODE:
        return '#document';
      case NODE_TYPE.DOCUMENT_TYPE_NODE:
        return this.name;
      case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
        return '#document-fragment';
    }

    // should never happen
    return null;
  }

  get firstChild() {
    return domSymbolTree.firstChild(this);
  }

  // https://dom.spec.whatwg.org/#connected
  // https://dom.spec.whatwg.org/#dom-node-isconnected
  get isConnected() {
    const root = shadowIncludingRoot(this);
    return root && root.nodeType === NODE_TYPE.DOCUMENT_NODE;
  }

  get ownerDocument() {
    return this.nodeType === NODE_TYPE.DOCUMENT_NODE ? null : this._ownerDocument;
  }

  get lastChild() {
    return domSymbolTree.lastChild(this);
  }

  get childNodes() {
    if (!this._childNodesList) {
      this._childNodesList = new NodeList({
        element: this,
        query: () => domSymbolTree.childrenToArray(this)
      });
    } else {
      this._childNodesList._update();
    }

    return this._childNodesList;
  }

  get nextSibling() {
    return domSymbolTree.nextSibling(this);
  }

  get previousSibling() {
    return domSymbolTree.previousSibling(this);
  }

  _clearMemoizedQueries() {
    this._memoizedQueries = {};
    const myParent = domSymbolTree.parent(this);
    if (myParent) {
      myParent._clearMemoizedQueries();
    }
  }

  _descendantRemoved(parent, child) {
    const myParent = domSymbolTree.parent(this);
    if (myParent) {
      myParent._descendantRemoved(parent, child);
    }
  }

  _descendantAdded(parent, child) {
    const myParent = domSymbolTree.parent(this);
    if (myParent) {
      myParent._descendantAdded(parent, child);
    }
  }

  _attach() {
    this._attached = true;

    for (const child of domSymbolTree.childrenIterator(this)) {
      if (child._attach) {
        child._attach();
      }
    }
  }

  _detach() {
    this._attached = false;

    if (this._ownerDocument && this._ownerDocument._lastFocusedElement === this) {
      this._ownerDocument._lastFocusedElement = null;
    }

    for (const child of domSymbolTree.childrenIterator(this)) {
      if (child._detach) {
        child._detach();
      }
    }
  }

  // https://dom.spec.whatwg.org/#dom-node-textcontent
  get textContent() {
    switch (this.nodeType) {
      case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
      case NODE_TYPE.ELEMENT_NODE: {
        let text = '';
        for (const child of domSymbolTree.treeIterator(this, {})) {
          if (child.nodeType === NODE_TYPE.TEXT_NODE || child.nodeType === NODE_TYPE.CDATA_SECTION_NODE) {
            text += child.nodeValue;
          }
        }
        return text;
      }

      case NODE_TYPE.ATTRIBUTE_NODE: {
        return this._value;
      }

      case NODE_TYPE.TEXT_NODE:
      case NODE_TYPE.CDATA_SECTION_NODE: // CDATASection is a subclass of Text
      case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
      case NODE_TYPE.COMMENT_NODE: {
        return this._data;
      }

      default: {
        return null;
      }
    }
  }

  set textContent(value) {
    if (value === null) {
      value = '';
    }

    switch (this.nodeType) {
      case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
      case NODE_TYPE.ELEMENT_NODE: {
        // https://dom.spec.whatwg.org/#string-replace-all
        let nodeImpl = null;

        if (value !== '') {
          nodeImpl = this._ownerDocument.createTextNode(value);
        }

        this._replaceAll(nodeImpl);
        break;
      }

      case NODE_TYPE.ATTRIBUTE_NODE: {
        setAnExistingAttributeValue(this, value);
        break;
      }

      case NODE_TYPE.TEXT_NODE:
      case NODE_TYPE.CDATA_SECTION_NODE: // CDATASection is a subclass of Text
      case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
      case NODE_TYPE.COMMENT_NODE: {
        break;
      }
    }
  }

  // https://dom.spec.whatwg.org/#dom-node-insertbefore
  insertBefore(nodeImpl, childImpl) {
    return this._preInsert(nodeImpl, childImpl);
  }

  // https://dom.spec.whatwg.org/#dom-node-appendchild
  appendChild(nodeImpl) {
    return this._append(nodeImpl);
  }

  // https://dom.spec.whatwg.org/#dom-node-removechild
  removeChild(oldChildImpl) {
    return this._preRemove(oldChildImpl);
  }

  // https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
  _preInsertValidity(nodeImpl, childImpl) {
    const { nodeType, nodeName } = nodeImpl;
    const { nodeType: parentType, nodeName: parentName } = this;

    if (
      parentType !== NODE_TYPE.DOCUMENT_NODE &&
      parentType !== NODE_TYPE.DOCUMENT_FRAGMENT_NODE &&
      parentType !== NODE_TYPE.ELEMENT_NODE
    ) {
      throw DOMException.create(this._globalObject, [
        `Node can't be inserted in a ${parentName} parent.`,
        'HierarchyRequestError'
      ]);
    }

    if (isHostInclusiveAncestor(nodeImpl, this)) {
      throw DOMException.create(this._globalObject, [
        'The operation would yield an incorrect node tree.',
        'HierarchyRequestError'
      ]);
    }

    if (childImpl && domSymbolTree.parent(childImpl) !== this) {
      throw DOMException.create(this._globalObject, [ 'The child can not be found in the parent.', 'NotFoundError' ]);
    }

    if (
      nodeType !== NODE_TYPE.DOCUMENT_FRAGMENT_NODE &&
      nodeType !== NODE_TYPE.DOCUMENT_TYPE_NODE &&
      nodeType !== NODE_TYPE.ELEMENT_NODE &&
      nodeType !== NODE_TYPE.TEXT_NODE &&
      nodeType !== NODE_TYPE.CDATA_SECTION_NODE && // CData section extends from Text
      nodeType !== NODE_TYPE.PROCESSING_INSTRUCTION_NODE &&
      nodeType !== NODE_TYPE.COMMENT_NODE
    ) {
      throw DOMException.create(this._globalObject, [
        `${nodeName} node can't be inserted in parent node.`,
        'HierarchyRequestError'
      ]);
    }

    if (
      (nodeType === NODE_TYPE.TEXT_NODE && parentType === NODE_TYPE.DOCUMENT_NODE) ||
      (nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE && parentType !== NODE_TYPE.DOCUMENT_NODE)
    ) {
      throw DOMException.create(this._globalObject, [
        `${nodeName} node can't be inserted in ${parentName} parent.`,
        'HierarchyRequestError'
      ]);
    }

    if (parentType === NODE_TYPE.DOCUMENT_NODE) {
      const nodeChildren = domSymbolTree.childrenToArray(nodeImpl);
      const parentChildren = domSymbolTree.childrenToArray(this);

      switch (nodeType) {
        case NODE_TYPE.DOCUMENT_FRAGMENT_NODE: {
          const nodeChildrenElements = nodeChildren.filter((child) => child.nodeType === NODE_TYPE.ELEMENT_NODE);
          if (nodeChildrenElements.length > 1) {
            throw DOMException.create(this._globalObject, [
              `Invalid insertion of ${nodeName} node in ${parentName} node.`,
              'HierarchyRequestError'
            ]);
          }

          const hasNodeTextChildren = nodeChildren.some((child) => child.nodeType === NODE_TYPE.TEXT_NODE);
          if (hasNodeTextChildren) {
            throw DOMException.create(this._globalObject, [
              `Invalid insertion of ${nodeName} node in ${parentName} node.`,
              'HierarchyRequestError'
            ]);
          }

          if (
            nodeChildrenElements.length === 1 &&
            (parentChildren.some((child) => child.nodeType === NODE_TYPE.ELEMENT_NODE) ||
              (childImpl && childImpl.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE) ||
              (childImpl &&
                domSymbolTree.nextSibling(childImpl) &&
                domSymbolTree.nextSibling(childImpl).nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE))
          ) {
            throw DOMException.create(this._globalObject, [
              `Invalid insertion of ${nodeName} node in ${parentName} node.`,
              'HierarchyRequestError'
            ]);
          }
          break;
        }

        case NODE_TYPE.ELEMENT_NODE:
          if (
            parentChildren.some((child) => child.nodeType === NODE_TYPE.ELEMENT_NODE) ||
            (childImpl && childImpl.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE) ||
            (childImpl &&
              domSymbolTree.nextSibling(childImpl) &&
              domSymbolTree.nextSibling(childImpl).nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE)
          ) {
            throw DOMException.create(this._globalObject, [
              `Invalid insertion of ${nodeName} node in ${parentName} node.`,
              'HierarchyRequestError'
            ]);
          }
          break;

        case NODE_TYPE.DOCUMENT_TYPE_NODE:
          if (
            parentChildren.some((child) => child.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE) ||
            (childImpl &&
              domSymbolTree.previousSibling(childImpl) &&
              domSymbolTree.previousSibling(childImpl).nodeType === NODE_TYPE.ELEMENT_NODE) ||
            (!childImpl && parentChildren.some((child) => child.nodeType === NODE_TYPE.ELEMENT_NODE))
          ) {
            throw DOMException.create(this._globalObject, [
              `Invalid insertion of ${nodeName} node in ${parentName} node.`,
              'HierarchyRequestError'
            ]);
          }
          break;
      }
    }
  }

  // https://dom.spec.whatwg.org/#concept-node-pre-insert
  _preInsert(nodeImpl, childImpl) {
    this._preInsertValidity(nodeImpl, childImpl);

    let referenceChildImpl = childImpl;
    if (referenceChildImpl === nodeImpl) {
      referenceChildImpl = domSymbolTree.nextSibling(nodeImpl);
    }

    this._ownerDocument._adoptNode(nodeImpl);

    this._insert(nodeImpl, referenceChildImpl, undefined);

    return nodeImpl;
  }

  // https://dom.spec.whatwg.org/#concept-node-insert
  _insert(nodeImpl, childImpl, suppressObservers) {
    const count = nodeImpl.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE ? domSymbolTree.childrenCount(nodeImpl) : 1;

    if (childImpl) {
      const childIndex = domSymbolTree.index(childImpl);

      for (const range of this._referencedRanges) {
        const { _start, _end } = range;

        if (_start.offset > childIndex) {
          range._setLiveRangeStart(this, _start.offset + count);
        }

        if (_end.offset > childIndex) {
          range._setLiveRangeEnd(this, _end.offset + count);
        }
      }
    }

    const nodesImpl =
      nodeImpl.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE ? domSymbolTree.childrenToArray(nodeImpl) : [ nodeImpl ];

    if (nodeImpl.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE) {
      let grandChildImpl;
      while ((grandChildImpl = domSymbolTree.firstChild(nodeImpl))) {
        nodeImpl._remove(grandChildImpl, true);
      }
    }

    if (nodeImpl.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE) {
      queueTreeMutationRecord(nodeImpl, [], nodesImpl, null, null);
    }

    const previousChildImpl = childImpl ? domSymbolTree.previousSibling(childImpl) : domSymbolTree.lastChild(this);

    for (const node of nodesImpl) {
      if (!childImpl) {
        domSymbolTree.appendChild(this, node);
      } else {
        domSymbolTree.insertBefore(childImpl, node);
      }

      if (
        this.nodeType === NODE_TYPE.ELEMENT_NODE &&
        this._shadowRoot !== null &&
        (node.nodeType === NODE_TYPE.ELEMENT_NODE || node.nodeType === NODE_TYPE.TEXT_NODE)
      ) {
        assignSlot(node);
      }

      if (node.nodeType === NODE_TYPE.TEXT_NODE || node.nodeType === NODE_TYPE.CDATA_SECTION_NODE) {
        this._childTextContentChangeSteps();
      }

      if (isSlot(this) && this._assignedNodes.length === 0 && isShadowRoot(nodeRoot(this))) {
        signalSlotChange(this);
      }

      const root = nodeRoot(node);
      if (isShadowRoot(root)) {
        assignSlotableForTree(root);
      }

      if (this._attached && nodeImpl._attach) {
        node._attach();
      }

      this._descendantAdded(this, node);

      for (const inclusiveDescendant of shadowIncludingInclusiveDescendantsIterator(node)) {
        if (inclusiveDescendant.isConnected) {
          if (inclusiveDescendant._ceState === 'custom') {
            enqueueCECallbackReaction(inclusiveDescendant, 'connectedCallback', []);
          } else {
            tryUpgradeElement(inclusiveDescendant);
          }
        }
      }
    }

    if (!suppressObservers) {
      queueTreeMutationRecord(this, nodesImpl, [], previousChildImpl, childImpl);
    }
  }

  // https://dom.spec.whatwg.org/#concept-node-append
  _append(nodeImpl) {
    return this._preInsert(nodeImpl, null);
  }

  // https://dom.spec.whatwg.org/#concept-node-replace-all
  _replaceAll(nodeImpl) {
    if (nodeImpl !== null) {
      this._ownerDocument._adoptNode(nodeImpl);
    }

    const removedNodesImpl = domSymbolTree.childrenToArray(this);

    let addedNodesImpl;
    if (nodeImpl === null) {
      addedNodesImpl = [];
    } else if (nodeImpl.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE) {
      addedNodesImpl = domSymbolTree.childrenToArray(nodeImpl);
    } else {
      addedNodesImpl = [ nodeImpl ];
    }

    for (const childImpl of domSymbolTree.childrenIterator(this)) {
      this._remove(childImpl, true);
    }

    if (nodeImpl !== null) {
      this._insert(nodeImpl, null, true);
    }

    if (addedNodesImpl.length > 0 || removedNodesImpl.length > 0) {
      queueTreeMutationRecord(this, addedNodesImpl, removedNodesImpl, null, null);
    }
  }

  // https://dom.spec.whatwg.org/#concept-node-pre-remove
  _preRemove(childImpl) {
    if (domSymbolTree.parent(childImpl) !== this) {
      throw DOMException.create(this._globalObject, [
        'The node to be removed is not a child of this node.',
        'NotFoundError'
      ]);
    }

    this._remove(childImpl, null);

    return childImpl;
  }

  // https://dom.spec.whatwg.org/#concept-node-remove
  _remove(nodeImpl, suppressObservers) {
    const index = domSymbolTree.index(nodeImpl);

    for (const descendant of domSymbolTree.treeIterator(nodeImpl, {})) {
      for (const range of descendant._referencedRanges) {
        const { _start, _end } = range;

        if (_start.node === descendant) {
          range._setLiveRangeStart(this, index);
        }

        if (_end.node === descendant) {
          range._setLiveRangeEnd(this, index);
        }
      }
    }

    for (const range of this._referencedRanges) {
      const { _start, _end } = range;

      if (_start.node === this && _start.offset > index) {
        range._setLiveRangeStart(this, _start.offset - 1);
      }

      if (_end.node === this && _end.offset > index) {
        range._setLiveRangeEnd(this, _end.offset - 1);
      }
    }

    if (this._ownerDocument) {
      this._ownerDocument._runPreRemovingSteps(nodeImpl);
    }

    const oldPreviousSiblingImpl = domSymbolTree.previousSibling(nodeImpl);
    const oldNextSiblingImpl = domSymbolTree.nextSibling(nodeImpl);

    domSymbolTree.remove(nodeImpl);

    if (nodeImpl._assignedSlot) {
      assignSlotable(nodeImpl._assignedSlot);
    }

    if (isSlot(this) && this._assignedNodes.length === 0 && isShadowRoot(nodeRoot(this))) {
      signalSlotChange(this);
    }

    let hasSlotDescendant = isSlot(nodeImpl);
    if (!hasSlotDescendant) {
      for (const child of domSymbolTree.treeIterator(nodeImpl, {})) {
        if (isSlot(child)) {
          hasSlotDescendant = true;
          break;
        }
      }
    }

    if (hasSlotDescendant) {
      assignSlotableForTree(nodeRoot(this));
      assignSlotableForTree(nodeImpl);
    }

    nodeImpl._detach();
    this._descendantRemoved(this, nodeImpl);

    if (this.isConnected) {
      if (nodeImpl._ceState === 'custom') {
        enqueueCECallbackReaction(nodeImpl, 'disconnectedCallback', []);
      }

      for (const descendantImpl of shadowIncludingDescendantsIterator(nodeImpl)) {
        if (descendantImpl._ceState === 'custom') {
          enqueueCECallbackReaction(descendantImpl, 'disconnectedCallback', []);
        }
      }
    }

    if (!suppressObservers) {
      queueTreeMutationRecord(this, [], [ nodeImpl ], oldPreviousSiblingImpl, oldNextSiblingImpl);
    }

    if (nodeImpl.nodeType === NODE_TYPE.TEXT_NODE) {
      this._childTextContentChangeSteps();
    }
  }

  _childTextContentChangeSteps() {
    // Default: do nothing
  }
}

export default Node;
