/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Event, EventHandler, AddEventListenerOptions } from '../Event';
import { NodeType } from '../TransferrableNodes';
import { BridgeNodeMethods, BridgeNodeEvents, BridgeEventTargetMethods } from '../../consts';
import { Bridge } from '../../../interface';
import { IPCObjectManager, IPCCargo, IPCCargoType } from '../../../ipc-object';

export type NodeName = '#comment' | '#document' | '#document-fragment' | '#text' | string;
export type NamespaceURI = string;

/**
 * Propagates a property change for a Node to itself and all childNodes.
 * @param node Node to start applying change to
 * @param property Property to modify
 * @param value New value to apply
 */
export const propagate = (node: Node, property: string | number, value: any): void => {
  node[property] = value;
  node.childNodes.forEach((child) => propagate(child, property, value));
};

function isUseBridge(elem: Node, callback: Function) {
  // react dev will create a custom element react just used internal
  return (
    callback &&
    elem.$cargo &&
    elem.$cargo.type !== 'EventTarget' &&
    elem.$cargo.type !== 'Window' &&
    elem.nodeName &&
    elem.nodeName.toLowerCase() !== 'react'
  );
}

// https://developer.mozilla.org/en-US/docs/Web/API/Node
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
//
// Please note, in this implmentation Node doesn't extend EventTarget.
// This is intentional to reduce the number of classes.

export abstract class Node {
  [index: string]: any; // TODO(choumx): Remove this typing escape hatch.
  public ownerDocument: Node; // TODO(choumx): Should be a Document.
  // https://drafts.csswg.org/selectors-4/#scoping-root
  public scopingRoot: Node;
  public nodeType: NodeType;
  public nodeName: NodeName;
  public childNodes: Node[] = [];
  public parentNode: Node | null = null;
  public isConnected: boolean = false;
  public $bridge: Bridge;
  public $ipcObjectManager: IPCObjectManager;
  public $cargo: IPCCargo;
  public abstract cloneNode(deep: boolean): Node;
  private eventHandlers: {
    [index: string]: EventHandler[];
  } = {};

  constructor(nodeType: NodeType, nodeName: NodeName, ownerDocument: Node | null, overrideIndex?: number) {
    this.nodeType = nodeType;
    this.nodeName = nodeName;
    this.scopingRoot = this;

    this.ownerDocument = ownerDocument || this;
    this.$cargo = this.ownerDocument.$ipcObjectManager.addSource('Node', this);
  }

  // Unimplemented Properties
  // Node.baseURI – https://developer.mozilla.org/en-US/docs/Web/API/Node/baseURI

  // Unimplemented Methods
  // Node.compareDocumentPosition() – https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
  // Node.getRootNode() – https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode
  // Node.isDefaultNamespace() – https://developer.mozilla.org/en-US/docs/Web/API/Node/isDefaultNamespace
  // Node.isEqualNode() – https://developer.mozilla.org/en-US/docs/Web/API/Node/isEqualNode
  // Node.isSameNode() – https://developer.mozilla.org/en-US/docs/Web/API/Node/isSameNode
  // Node.lookupPrefix() – https://developer.mozilla.org/en-US/docs/Web/API/Node/lookupPrefix
  // Node.lookupNamespaceURI() – https://developer.mozilla.org/en-US/docs/Web/API/Node/lookupNamespaceURI
  // Node.normalize() – https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize

  // Implemented at Element/Text layer
  // Node.nodeValue – https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue
  // Node.cloneNode – https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode

  /**
   * Getter returning the text representation of Element.childNodes.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
   * @return text from all childNodes.
   */
  get textContent(): string {
    return this.getTextContent();
  }

  /**
   * Use `this.getTextContent()` instead of `super.textContent` to avoid incorrect or expensive ES5 transpilation.
   */
  protected getTextContent(): string {
    let textContent = '';
    const childNodes = this.childNodes;

    if (childNodes.length) {
      childNodes.forEach((childNode) => (textContent += childNode.textContent));
      return textContent;
    }
    return '';
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild
   * @return Node's first child in the tree, or null if the node has no children.
   */
  get firstChild(): Node | null {
    return this.childNodes[0] || null;
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/lastChild
   * @return The last child of a node, or null if there are no child elements.
   */
  get lastChild(): Node | null {
    return this.childNodes[this.childNodes.length - 1] || null;
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling
   * @return node immediately following the specified one in it's parent's childNodes, or null if one doesn't exist.
   */
  get nextSibling(): Node | null {
    if (this.parentNode === null) {
      return null;
    }

    const parentChildNodes = this.parentNode.childNodes;
    return parentChildNodes[parentChildNodes.indexOf(this) + 1] || null;
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/previousSibling
   * @return node immediately preceding the specified one in its parent's childNodes, or null if the specified node is the first in that list.
   */
  get previousSibling(): Node | null {
    if (this.parentNode === null) {
      return null;
    }

    const parentChildNodes = this.parentNode.childNodes;
    return parentChildNodes[parentChildNodes.indexOf(this) - 1] || null;
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes
   * @return boolean if the Node has childNodes.
   */
  public hasChildNodes(): boolean {
    return this.childNodes.length > 0;
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
   * @param otherNode
   * @return whether a Node is a descendant of a given Node
   */
  public contains(otherNode: Node | null): boolean {
    if (otherNode === this) {
      return true;
    }

    if (this.childNodes.length > 0) {
      if (this.childNodes.includes(this)) {
        return true;
      }
      return this.childNodes.some((child) => child.contains(otherNode));
    }
    return false;
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
   * @param child
   * @param referenceNode
   * @return child after it has been inserted.
   */
  public insertBefore(child: Node | null, referenceNode: Node | undefined | null): Node | null {
    if (child === null || child === this) {
      // The new child cannot contain the parent.
      return child;
    }
    // script is for safe case
    const isNoNeedChildren = [ 'html', 'head', 'body', 'script' ].indexOf(child.nodeName.toLowerCase()) > -1;
    const isNoNeedParent = [ '#document', 'html' ].indexOf(this.nodeName.toLowerCase()) > -1;
    const isEmptyText = this.nodeName.toLowerCase() === 'body' && child.nodeName === '#text';
    if (!isNoNeedParent && !isNoNeedChildren && !isEmptyText) {
      this.$bridge.invoke(BridgeNodeMethods.insertBefore, [
        this.$cargo,
        child.$cargo,
        referenceNode && referenceNode.$cargo
      ]);
    }

    if (child.nodeType === NodeType.DOCUMENT_FRAGMENT_NODE) {
      child.childNodes.slice().forEach((node: Node) => this.insertBefore(node, referenceNode));
      return child;
    } else if (!referenceNode) {
      child.remove();
      this.childNodes.push(child);
      return child;
    } else if (this.childNodes.indexOf(referenceNode) >= 0) {
      // Should only insertBefore direct children of this Node.
      child.remove();

      // Removing a child can cause this.childNodes to change, meaning we need to splice from its updated location.
      this.childNodes.splice(this.childNodes.indexOf(referenceNode), 0, child);
      this.onNodeInserted(child);

      return child;
    }

    return null;
  }

  /**
   * When a Node is inserted, this method is called (and can be extended by other classes)
   * @param child
   */
  protected onNodeInserted(child: Node): void {
    child.parentNode = this;
    propagate(child, 'isConnected', this.isConnected);
    propagate(child, 'scopingRoot', this.scopingRoot);
  }

  /**
   * When a node is removed, this method is called (and can be extended by other classes)
   * @param child
   */
  protected onNodeRemoved(child: Node): void {
    child.parentNode = null;
    propagate(child, 'isConnected', false);
    propagate(child, 'scopingRoot', child);
  }

  /**
   * Adds the specified childNode argument as the last child to the current node.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
   * @param child Child Node to append to this Node.
   * @return Node the appended node.
   */
  public appendChild(child: Node): Node {
    return this.insertBefore(child, null) as Node;
  }

  /**
   * Removes a child node from the current element.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
   * @param child Child Node to remove from this Node.
   * @return Node removed from the tree or null if the node wasn't attached to this tree.
   */
  public removeChild(child: Node): Node | null {
    const index = this.childNodes.indexOf(child);
    const exists = index >= 0;

    if (exists) {
      this.childNodes.splice(index, 1);
      this.$bridge.publish(BridgeNodeEvents.removeChild, {
        elemCargo: this.$cargo,
        childElemCargo: child.$cargo
      });

      return child;
    }

    return null;
  }

  /**
   * @param newChild
   * @param oldChild
   * @return child that was replaced.
   * @note `HierarchyRequestError` not handled e.g. newChild is an ancestor of current node.
   * @see https://dom.spec.whatwg.org/#concept-node-replace
   */
  public replaceChild(newChild: Node, oldChild: Node): Node {
    if (
      newChild === oldChild ||
      // In DOM, this throws DOMException: "The node to be replaced is not a child of this node."
      oldChild.parentNode !== this ||
      // In DOM, this throws DOMException: "The new child element contains the parent."
      newChild.contains(this)
    ) {
      return oldChild;
    }
    // If newChild already exists in the DOM, it is first removed.
    // TODO: Consider using a mutation-free API here to avoid two mutations
    // per replaceChild() call.
    newChild.remove();

    const index = this.childNodes.indexOf(oldChild);
    const nextSibling = this.childNodes[index + 1];
    // remove oldChild
    oldChild.remove();
    this.insertBefore(newChild, nextSibling);
    return oldChild;
  }

  /**
   * Removes this Node from the tree it belogs too.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
   */
  public remove(): void {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  }

  /**
   * Add an event listener to callback when a specific event type is dispatched.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   * @param type Event Type (i.e 'click')
   * @param handler Function called when event is dispatched.
   */
  public addEventListener(
    type: string,
    handler: EventHandler,
    options: AddEventListenerOptions | undefined = {}
  ): void {
    const lowerType = type.toLowerCase();
    const handlers: EventHandler[] = this.eventHandlers[lowerType];
    if (handlers) {
      handlers.push(handler);
    } else {
      this.eventHandlers[lowerType] = [ handler ];
    }

    if (isUseBridge(this, handler)) {
      const cb = this.$ipcObjectManager.addSource(IPCCargoType.EVENT_CALLBACK, handler);
      console.debug('Worker addEventListener', type, cb);
      this.$bridge.invoke(BridgeEventTargetMethods.addEventListener, [ this.$cargo, type, cb, options ], (err) => {
        if (err) {
          this.$ipcObjectManager.removeByObject(handler);
        }
      });
    }
  }

  /**
   * Remove a registered event listener for a specific event type.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
   * @param type Event Type (i.e 'click')
   * @param handler Function to stop calling when event is dispatched.
   */
  public removeEventListener(type: string, handler: EventHandler): void {
    const lowerType = type.toLowerCase();
    const handlers = this.eventHandlers[lowerType];
    const index = !!handlers ? handlers.indexOf(handler) : -1;

    if (index >= 0) {
      handlers.splice(index, 1);
      this.$bridge.invoke(BridgeEventTargetMethods.removeEventListener, [ this.$cargo, type, handler ], (err) => {
        if (err) {
          this.$ipcObjectManager.removeByObject(handler);
        }
      });
    }
  }

  /**
   * Dispatch an event for this Node.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
   * @param event Event to dispatch to this node and potentially cascade to parents.
   */
  public dispatchEvent(event: Event): boolean {
    let target: Node | null = (event.currentTarget = this);
    let handlers: EventHandler[] | null;
    let iterator: number;

    do {
      handlers = target && target.eventHandlers && target.eventHandlers[event.type.toLowerCase()];
      if (handlers) {
        for (iterator = handlers.length; iterator--; ) {
          if ((handlers[iterator].call(target, event) === false || event.ended) && event.cancelable) {
            break;
          }
        }
      }
    } while (event.bubbles && !(event.cancelable && event.stopped) && (target = target && target.parentNode));
    return !event.defaultPrevented;
  }
}
