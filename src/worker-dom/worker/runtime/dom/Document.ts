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

import { Element, NS_NAME_TO_CLASS } from './Element';
import { HTMLElement } from './HTMLElement';
import './HTMLAnchorElement';
import './HTMLButtonElement';
import './HTMLCanvasElement';
import './HTMLDataElement';
import './HTMLDataListElement';
import './HTMLEmbedElement';
import './HTMLFieldSetElement';
import './HTMLFormElement';
import './HTMLIFrameElement';
import './HTMLImageElement';
import './HTMLInputElement';
import './HTMLLabelElement';
import './HTMLLinkElement';
import './HTMLMapElement';
import './HTMLMeterElement';
import './HTMLModElement';
import './HTMLOListElement';
import './HTMLOptionElement';
import './HTMLProgressElement';
import './HTMLQuoteElement';
import './HTMLScriptElement';
import './HTMLSelectElement';
import './HTMLSourceElement';
import './HTMLStyleElement';
import './HTMLTableCellElement';
import './HTMLTableColElement';
import './HTMLTableElement';
import './HTMLTableRowElement';
import './HTMLTableSectionElement';
import './HTMLTimeElement';
import { matchChildElement } from './matchElements';
import { NamespaceURI } from './Node';
import { Text } from './Text';
import { Comment } from './Comment';
import { DocumentFragment } from './DocumentFragment';
import { PostMessage } from '../worker-thread';
import { NodeType, HTML_NAMESPACE } from '../TransferrableNodes';
import { WorkerDOMGlobalScope, GlobalScope } from '../WorkerDOMGlobalScope';

const DOCUMENT_NAME = '#document';

export class Document extends Element {
  public defaultView: WorkerDOMGlobalScope;
  public documentElement: Document;
  public body: Element;

  // Internal variables.
  public postMessage: PostMessage;
  public addGlobalEventListener: Function;
  public removeGlobalEventListener: Function;

  constructor(global: GlobalScope) {
    super(NodeType.DOCUMENT_NODE, DOCUMENT_NAME, HTML_NAMESPACE, null);
    // Element uppercases its nodeName, but Document doesn't.
    this.nodeName = DOCUMENT_NAME;
    this.documentElement = this; // TODO(choumx): Should be the <html> element.

    this.defaultView = Object.assign(global, {
      $cargo: global.$ipcObjectManager.addSource('Window', global),
      document: this,
      addEventListener: this.addEventListener.bind(this),
      removeEventListener: this.removeEventListener.bind(this)
    });
    this.$bridge = global.$bridge;
    this.$ipcObjectManager = global.$ipcObjectManager;
    this.$cargo = this.$ipcObjectManager.addSource('Document', this);
  }

  public createElement(name: string): Element {
    return this.createElementNS(HTML_NAMESPACE, name.toLowerCase());
  }

  public createElementNS(namespaceURI: NamespaceURI, localName: string): Element {
    const constructor = NS_NAME_TO_CLASS[`${namespaceURI}:${localName}`] || HTMLElement;
    return new constructor(NodeType.ELEMENT_NODE, localName, namespaceURI, this);
  }

  /**
   * Note: Unlike DOM, Event subclasses (e.g. MouseEvent) are not instantiated based on `type`.
   * @param type
   */
  public createEvent(type: string): Event {
    return new Event(type, { bubbles: false, cancelable: false });
  }

  public createTextNode(text: string): Text {
    return new Text(text, this);
  }

  public createComment(text: string): Comment {
    return new Comment(text, this);
  }

  public createDocumentFragment(): DocumentFragment {
    return new DocumentFragment(this);
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
   * @return Element with matching id attribute.
   */
  public getElementById(id: string): Element | null {
    return matchChildElement(this.body, (element) => element.id === id);
  }
}
