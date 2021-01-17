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

import { HTMLElement } from './dom/HTMLElement';
import { SVGElement } from './dom/SVGElement';
import { HTMLAnchorElement } from './dom/HTMLAnchorElement';
import { HTMLButtonElement } from './dom/HTMLButtonElement';
import { HTMLCanvasElement } from './dom/HTMLCanvasElement';
import { HTMLDataElement } from './dom/HTMLDataElement';
import { HTMLEmbedElement } from './dom/HTMLEmbedElement';
import { HTMLFieldSetElement } from './dom/HTMLFieldSetElement';
import { HTMLFormElement } from './dom/HTMLFormElement';
import { HTMLIFrameElement } from './dom/HTMLIFrameElement';
import { HTMLImageElement } from './dom/HTMLImageElement';
import { HTMLInputElement } from './dom/HTMLInputElement';
import { HTMLLabelElement } from './dom/HTMLLabelElement';
import { HTMLLinkElement } from './dom/HTMLLinkElement';
import { HTMLMapElement } from './dom/HTMLMapElement';
import { HTMLMeterElement } from './dom/HTMLMeterElement';
import { HTMLModElement } from './dom/HTMLModElement';
import { HTMLOListElement } from './dom/HTMLOListElement';
import { HTMLOptionElement } from './dom/HTMLOptionElement';
import { HTMLProgressElement } from './dom/HTMLProgressElement';
import { HTMLQuoteElement } from './dom/HTMLQuoteElement';
import { HTMLScriptElement } from './dom/HTMLScriptElement';
import { HTMLSelectElement } from './dom/HTMLSelectElement';
import { HTMLSourceElement } from './dom/HTMLSourceElement';
import { HTMLStyleElement } from './dom/HTMLStyleElement';
import { HTMLTableCellElement } from './dom/HTMLTableCellElement';
import { HTMLTableColElement } from './dom/HTMLTableColElement';
import { HTMLTableElement } from './dom/HTMLTableElement';
import { HTMLTableRowElement } from './dom/HTMLTableRowElement';
import { HTMLTableSectionElement } from './dom/HTMLTableSectionElement';
import { HTMLTimeElement } from './dom/HTMLTimeElement';
import { Document } from './dom/Document';
// import { initialize } from './initialize';
import { MutationObserver } from './MutationObserver';
import { Event as WorkerDOMEvent } from './Event';
import { Text } from './dom/Text';
import { HTMLDataListElement } from './dom/HTMLDataListElement';
import { CharacterData } from './dom/CharacterData';
import { Comment } from './dom/Comment';
import { DOMTokenList } from './dom/DOMTokenList';
import { DocumentFragment } from './dom/DocumentFragment';
import { Element } from './dom/Element';
import { rafPolyfill, cafPolyfill } from './AnimationFrame';
import { IPCObjectManager } from '../../ipc-object';
import { Bridge } from '../../interface';

const globalScope = {
  innerWidth: 0,
  innerHeight: 0,
  CharacterData,
  Comment,
  DOMTokenList,
  Document,
  DocumentFragment,
  Element,
  HTMLAnchorElement,
  HTMLButtonElement,
  HTMLCanvasElement,
  HTMLDataElement,
  HTMLDataListElement,
  HTMLElement,
  HTMLEmbedElement,
  HTMLFieldSetElement,
  HTMLFormElement,
  HTMLIFrameElement,
  HTMLImageElement,
  HTMLInputElement,
  HTMLLabelElement,
  HTMLLinkElement,
  HTMLMapElement,
  HTMLMeterElement,
  HTMLModElement,
  HTMLOListElement,
  HTMLOptionElement,
  HTMLProgressElement,
  HTMLQuoteElement,
  HTMLScriptElement,
  HTMLSelectElement,
  HTMLSourceElement,
  HTMLStyleElement,
  HTMLTableCellElement,
  HTMLTableColElement,
  HTMLTableElement,
  HTMLTableRowElement,
  HTMLTableSectionElement,
  HTMLTimeElement,
  SVGElement,
  Text,
  Event: WorkerDOMEvent,
  MutationObserver,
  requestAnimationFrame: self.requestAnimationFrame || rafPolyfill,
  cancelAnimationFrame: self.cancelAnimationFrame || cafPolyfill
};

const noop = () => void 0;

// export const hydrate = initialize;

// WorkerDOM.Document.defaultView ends up being the window object.
// React requires the classes to exist off the window object for instanceof checks.
export function createWindow(globalExtends: { bridge: Bridge; ipcObjectManager: IPCObjectManager }) {
  const document = new Document(
    Object.assign(self, globalScope, {
      $bridge: globalExtends.bridge,
      $ipcObjectManager: globalExtends.ipcObjectManager
    })
  );
  // TODO(choumx): Avoid polluting Document's public API.
  document.postMessage = postMessage.bind(self) || noop;
  document.addGlobalEventListener = addEventListener.bind(self);
  document.removeGlobalEventListener = removeEventListener.bind(self) || noop;

  document.isConnected = true;
  document.appendChild((document.body = document.createElement('body')));

  return document.defaultView;
}
