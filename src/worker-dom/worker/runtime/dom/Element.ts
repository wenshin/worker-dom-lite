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

import { Node, NodeName, NamespaceURI } from './Node';
import { ParentNode } from './ParentNode';
import { DOMTokenList, synchronizedAccessor } from './DOMTokenList';
import { Attr, matchPredicate as matchAttrPredicate } from './Attr';
import { CSSStyleDeclaration } from '../css/CSSStyleDeclaration';
import { matchChildrenElements } from './matchElements';
import { reflectProperties } from './enhanceElement';
// import { TransferrableKeys } from '../../transfer/TransferrableKeys';
import { NodeType, HTML_NAMESPACE } from '../TransferrableNodes';
import { Event } from '../Event';
import { BridgeElementEvents, BridgeElementMethods, BridgeDocumentMethods } from '../../consts';

export const NS_NAME_TO_CLASS: { [key: string]: typeof Element } = {};
export const registerSubclass = (
  localName: string,
  subclass: typeof Element,
  namespace: string = HTML_NAMESPACE
): any => (NS_NAME_TO_CLASS[`${namespace}:${localName}`] = subclass);

// interface PropertyBackedAttributes {
//   [key: string]: [(el: Element) => string | null, (el: Element, value: string) => string | boolean];
// }

// export function definePropertyBackedAttributes(defineOn: typeof Element, attributes: PropertyBackedAttributes) {
//   const sub = Object.create(defineOn[TransferrableKeys.propertyBackedAttributes]);
//   defineOn[TransferrableKeys.propertyBackedAttributes] = Object.assign(sub, attributes);
// }

interface ClientRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * There are six kinds of elements, each having different start/close tag semantics.
 * @see https://html.spec.whatwg.org/multipage/syntax.html#elements-2
 */
enum ElementKind {
  NORMAL,
  VOID
  // The following element kinds have no special handling in worker-dom yet
  // and are lumped into the NORMAL kind.
  /*
  FOREIGN,
  TEMPLATE,
  RAW_TEXT,
  ESCAPABLE_RAW,
  */
}

/**
 * @see https://html.spec.whatwg.org/multipage/syntax.html#void-elements
 */
const VOID_ELEMENTS: string[] = [
  'AREA',
  'BASE',
  'BR',
  'COL',
  'EMBED',
  'HR',
  'IMG',
  'INPUT',
  'LINK',
  'META',
  'PARAM',
  'SOURCE',
  'TRACK',
  'WBR'
];

export class Element extends ParentNode {
  private _classList: DOMTokenList;

  public localName: NodeName;
  public attributes: Attr[] = [];
  public style: CSSStyleDeclaration = new CSSStyleDeclaration(this);
  public namespaceURI: NamespaceURI;

  /**
   * Element "kind" dictates certain behaviors e.g. start/end tag semantics.
   * @see https://html.spec.whatwg.org/multipage/syntax.html#elements-2
   */
  private kind: ElementKind;

  constructor(
    nodeType: NodeType,
    localName: NodeName,
    namespaceURI: NamespaceURI,
    ownerDocument: Node | null,
    overrideIndex?: number
  ) {
    super(nodeType, localName.toUpperCase(), ownerDocument, overrideIndex);
    this.namespaceURI = namespaceURI || HTML_NAMESPACE;
    this.localName = localName;
    this.kind = VOID_ELEMENTS.includes(this.tagName) ? ElementKind.VOID : ElementKind.NORMAL;
    this.$cargo = this.ownerDocument.$ipcObjectManager.addSource('Element', this);
    this.$cargo.info = { nodeName: this.nodeName };
    if ([ 'html', 'head', 'body' ].indexOf(localName.toLowerCase()) < 0) {
      this.$hostCreated = false;
      this.$bridge
        .invoke(BridgeDocumentMethods.createElement, [ this.$cargo, localName ])
        .then(() => (this.$hostCreated = true));
    } else {
      this.$hostCreated = true;
    }
  }

  // Unimplemented properties
  // Element.clientHeight – https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight
  // Element.clientLeft – https://developer.mozilla.org/en-US/docs/Web/API/Element/clientLeft
  // Element.clientTop – https://developer.mozilla.org/en-US/docs/Web/API/Element/clientTop
  // Element.clientWidth – https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
  // set Element.innerHTML – https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
  // NonDocumentTypeChildNode.nextElementSibling – https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling
  // Element.prefix – https://developer.mozilla.org/en-US/docs/Web/API/Element/prefix
  // NonDocummentTypeChildNode.previousElementSibling – https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling
  // Element.scrollHeight – https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
  // Element.scrollLeft – https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
  // Element.scrollLeftMax – https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeftMax
  // Element.scrollTop – https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
  // Element.scrollTopMax – https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTopMax
  // Element.scrollWidth – https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollWidth
  // Element.shadowRoot – !! CustomElements – https://developer.mozilla.org/en-US/docs/Web/API/Element/shadowRoot
  // Element.slot – !! CustomElements – https://developer.mozilla.org/en-US/docs/Web/API/Element/slot
  // Element.tabStop – https://developer.mozilla.org/en-US/docs/Web/API/Element/tabStop
  // Element.undoManager – https://developer.mozilla.org/en-US/docs/Web/API/Element/undoManager
  // Element.undoScope – https://developer.mozilla.org/en-US/docs/Web/API/Element/undoScope

  // Unimplemented Methods
  // Element.attachShadow() – !! CustomElements – https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
  // Element.animate() – https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
  // Element.closest() – https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
  // Element.getAttributeNames() – https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttributeNames
  // Element.getBoundingClientRect() – https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
  // Element.getClientRects() – https://developer.mozilla.org/en-US/docs/Web/API/Element/getClientRects
  // Element.getElementsByTagNameNS() – https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagNameNS
  // Element.insertAdjacentElement() – https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
  // Element.insertAdjacentHTML() – https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
  // Element.insertAdjacentText() – https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentText
  // Element.matches() – https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
  // Element.releasePointerCapture() – https://developer.mozilla.org/en-US/docs/Web/API/Element/releasePointerCapture
  // Element.requestFullscreen() – https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen
  // Element.requestPointerLock() – https://developer.mozilla.org/en-US/docs/Web/API/Element/requestPointerLock
  // Element.scrollIntoView() – https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  // Element.setCapture() – https://developer.mozilla.org/en-US/docs/Web/API/Element/setCapture
  // Element.setPointerCapture() – https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture

  // Partially implemented Mixin Methods
  // Both Element.querySelector() and Element.querySelector() are only implemented for the following simple selectors:
  // - Element selectors
  // - ID selectors
  // - Class selectors
  // - Attribute selectors
  // Element.querySelector() – https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector
  // Element.querySelectorAll() – https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll

  // Mixins not implemented
  // Slotable.assignedSlot – https://developer.mozilla.org/en-US/docs/Web/API/Slotable/assignedSlot

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML
   * @return string representation of serialized HTML describing the Element and its descendants.
   */
  // get outerHTML(): string {}

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
   * @return string representation of serialized HTML describing the Element's descendants.
   */
  // get innerHTML(): string {}

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
   * @param html The raw html string to parse.
   */
  // set innerHTML(html: string) {}

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
   * @param text new text replacing all childNodes content.
   */
  set textContent(text: string) {
    // TODO(KB): Investigate removing all children in a single .splice to childNodes.
    this.childNodes.slice().forEach((child: Node) => child.remove());
    this.appendChild(this.ownerDocument.createTextNode(text));
  }

  /**
   * Getter returning the text representation of Element.childNodes.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
   * @return text from all childNodes.
   */
  get textContent(): string {
    return this.getTextContent();
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName
   * @return string tag name (i.e 'div')
   */
  get tagName(): string {
    return this.nodeName;
  }

  /**
   * Sets the value of an attribute on this element using a null namespace.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
   * @param name attribute name
   * @param value attribute value
   */
  public setAttribute(name: string, value: unknown): void {
    this.setAttributeNS(HTML_NAMESPACE, name, value);
  }

  /**
   * Get the value of an attribute on this Element with the null namespace.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute
   * @param name attribute name
   * @return value of a specified attribute on the element, or null if the attribute doesn't exist.
   */
  public getAttribute(name: string): string | null {
    return this.getAttributeNS(HTML_NAMESPACE, name);
  }

  /**
   * Remove an attribute from this element in the null namespace.
   *
   * Method returns void, so it is not chainable.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute
   * @param name attribute name
   */
  public removeAttribute(name: string): void {
    this.removeAttributeNS(HTML_NAMESPACE, name);
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttribute
   * @param name attribute name
   * @return Boolean indicating if the element has the specified attribute.
   */
  public hasAttribute(name: string): boolean {
    return this.hasAttributeNS(HTML_NAMESPACE, name);
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttributes
   * @return Boolean indicating if the element has any attributes.
   */
  public hasAttributes(): boolean {
    return this.attributes.length > 0;
  }

  /**
   * Sets the value of an attribute on this Element with the provided namespace.
   *
   * If the attribute already exists, the value is updated; otherwise a new attribute is added with the specified name and value.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttributeNS
   * @param namespaceURI
   * @param name attribute name
   * @param value attribute value
   */
  public setAttributeNS(namespaceURI: NamespaceURI, name: string, value: unknown): void {
    if (name) {
      const valueAsString = String(value);
      if (!this.attributes.find(matchAttrPredicate(namespaceURI, name))) {
        this.attributes.push({
          namespaceURI,
          name,
          value: valueAsString
        });
      }

      this.$bridge.publish(BridgeElementEvents.setAttributeNS, {
        elemCargo: this.$cargo,
        namespace: namespaceURI,
        name,
        value: valueAsString
      });
    }
  }

  /**
   * Get the value of an attribute on this Element with the specified namespace.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttributeNS
   * @param namespaceURI attribute namespace
   * @param name attribute name
   * @return value of a specified attribute on the element, or null if the attribute doesn't exist.
   */
  public getAttributeNS(namespaceURI: NamespaceURI, name: string): string | null {
    const attr = this.attributes.find(matchAttrPredicate(namespaceURI, name));
    return attr ? attr.value : null;
  }

  /**
   * Remove an attribute from this element in the specified namespace.
   *
   * Method returns void, so it is not chainable.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute
   * @param namespaceURI attribute namespace
   * @param name attribute name
   */
  public removeAttributeNS(namespaceURI: NamespaceURI, name: string): void {
    const index = this.attributes.findIndex(matchAttrPredicate(namespaceURI, name));
    if (index >= 0) {
      this.attributes.splice(index, 1);
      this.$bridge.publish(BridgeElementEvents.removeAttributeNS, {
        elemCargo: this.$cargo,
        namespace: namespaceURI,
        localName: name
      });
    }
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttributeNS
   * @param namespaceURI attribute namespace
   * @param name attribute name
   * @return Boolean indicating if the element has the specified attribute.
   */
  public hasAttributeNS(namespaceURI: NamespaceURI, name: string): boolean {
    return this.attributes.some(matchAttrPredicate(namespaceURI, name));
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
   * @param names contains one more more classnames to match on. Multiples are space seperated, indicating an AND operation.
   * @return Element array with matching classnames
   */
  public getElementsByClassName(names: string): Array<Element> {
    const inputClassList = names.split(' ');
    // TODO(KB) – Compare performance of [].some(value => DOMTokenList.contains(value)) and regex.
    // const classRegex = new RegExp(classNames.split(' ').map(name => `(?=.*${name})`).join(''));

    return matchChildrenElements(this, (element) =>
      inputClassList.some((inputClassName) => element.classList.contains(inputClassName))
    );
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
   * @param tagName the qualified name to look for. The special string "*" represents all elements.
   * @return Element array with matching tagnames
   */
  public getElementsByTagName(tagName: string): Array<Element> {
    const lowerTagName = tagName.toLowerCase();
    return matchChildrenElements(
      this,
      tagName === '*'
        ? (_) => true
        : (element) =>
            element.namespaceURI === HTML_NAMESPACE ? element.localName === lowerTagName : element.tagName === tagName
    );
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByName
   * @param name value of name attribute elements must have to be returned
   * @return Element array with matching name attributes
   */
  public getElementsByName(name: any): Array<Element> {
    const stringName = '' + name;
    return matchChildrenElements(this, (element) => element.getAttribute('name') === stringName);
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
   * @param deep boolean determines if the clone should include a recursive copy of all childNodes.
   * @return Element containing all current attributes and potentially childNode clones of the Element requested to be cloned.
   */
  public cloneNode(deep: boolean = false): Element {
    const clone: Element = this.ownerDocument.createElementNS(
      this.namespaceURI,
      this.namespaceURI === HTML_NAMESPACE ? this.tagName.toLowerCase() : this.tagName
    );
    this.attributes.forEach((attr) => clone.setAttribute(attr.name, attr.value));
    if (deep) {
      this.childNodes.forEach((child: Node) => clone.appendChild(child.cloneNode(deep)));
    }
    return clone;
  }

  /**
   * Return the ClientRect for an Element once determined by the main thread.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
   * @return Promise<ClientRect>
   *
   * Note: Edge and IE11 do not return the x/y value, but top/left are equivalent. Normalize the values here.
   */
  public getBoundingClientRectAsync(): Promise<ClientRect> {
    return this.$bridge.invoke<ClientRect>(BridgeElementMethods.getBoundingClientRect, {
      elemCargo: this.$cargo
    });
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click
  click() {
    const event = new Event('click', {});
    event.target = this;
    this.dispatchEvent(event);
  }

  public get classList(): DOMTokenList {
    return this._classList || (this._classList = new DOMTokenList(this, 'class'));
  }

  /**
   * custom methods
   * @param param0
   */
  alignElement({
    triggerElem,
    alignConfig,
    autoUseScrollContainer,
    container
  }: {
    triggerElem: Element;
    alignConfig: any;
    autoUseScrollContainer: boolean;
    container: Element;
  }) {
    return this.$bridge.invoke(BridgeElementMethods.alignElement, [
      {
        elemCargo: this.$cargo,
        triggerElemCargo: triggerElem.$cargo,
        alignConfig,
        autoUseScrollContainer,
        container: container && container.$cargo
      }
    ]);
  }
}
synchronizedAccessor(Element, 'classList', 'className');
reflectProperties([ { id: [ '' ] } ], Element);
