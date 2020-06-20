/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/**
 * HTML nodeType values that represent the type of the node
 */

export const ELEMENT_NODE = 1;
export const TEXT_NODE = 3;
export const COMMENT_NODE = 8;
export const DOCUMENT_NODE = 9;
export const DOCUMENT_FRAGMENT_NODE = 11;

const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
const MATH_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

export const Namespaces = {
  html: HTML_NAMESPACE,
  mathml: MATH_NAMESPACE,
  svg: SVG_NAMESPACE
};

function getOwnerDocumentFromRootContainer(rootContainerElement: Element | Document): Document {
  return rootContainerElement.nodeType === DOCUMENT_NODE
    ? rootContainerElement as Document
    : rootContainerElement.ownerDocument;
}

// Assumes there is no parent namespace.
export function getIntrinsicNamespace(type: string): string {
  switch (type) {
    case 'svg':
      return SVG_NAMESPACE;
    case 'math':
      return MATH_NAMESPACE;
    default:
      return HTML_NAMESPACE;
  }
}

export function createElement(
  type: string,
  props: Object,
  rootContainerElement: Element | Document,
  parentNamespace: string
): Element {
  let isCustomComponentTag;

  // We create tags in the namespace of their parent container, except HTML
  // tags get no namespace.
  const ownerDocument: Document = getOwnerDocumentFromRootContainer(rootContainerElement);
  let domElement: Element;
  let namespaceURI = parentNamespace;
  if (namespaceURI === HTML_NAMESPACE) {
    namespaceURI = getIntrinsicNamespace(type);
  }
  if (namespaceURI === HTML_NAMESPACE) {
    if (type === 'script') {
      // Create the script via .innerHTML so its "parser-inserted" flag is
      // set to true and it does not execute
      const div = ownerDocument.createElement('div');
      div.innerHTML = '<script><' + '/script>'; // eslint-disable-line
      // This is guaranteed to yield a script element.
      const firstChild = (div.firstChild as unknown) as HTMLScriptElement;
      domElement = div.removeChild(firstChild);
    } else if (typeof (props as any).is === 'string') {
      // $FlowIssue `createElement` should be updated for Web Components
      domElement = ownerDocument.createElement(type, { is: (props as any).is });
    } else {
      // Separate else branch instead of using `props.is || undefined` above because of a Firefox bug.
      // See discussion in https://github.com/facebook/react/pull/6896
      // and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
      domElement = ownerDocument.createElement(type);
      // Normally attributes are assigned in `setInitialDOMProperties`, however the `multiple` and `size`
      // attributes on `select`s needs to be added before `option`s are inserted.
      // This prevents:
      // - a bug where the `select` does not scroll to the correct option because singular
      //  `select` elements automatically pick the first item #13222
      // - a bug where the `select` set the first item as selected despite the `size` attribute #14239
      // See https://github.com/facebook/react/issues/13222
      // and https://github.com/facebook/react/issues/14239
      if (type === 'select') {
        const node = (domElement as unknown) as HTMLSelectElement;
        if ((props as any).multiple) {
          node.multiple = true;
        } else if ((props as any).size) {
          // Setting a size greater than 1 causes a select to behave like `multiple=true`, where
          // it is possible that no option is selected.
          //
          // This is only necessary when a select in "single selection mode".
          node.size = (props as any).size;
        }
      }
    }
  } else {
    domElement = ownerDocument.createElementNS(namespaceURI, type);
  }

  return domElement;
}

export function createTextNode(text: string, rootContainerElement: Element | Document): Text {
  return getOwnerDocumentFromRootContainer(rootContainerElement).createTextNode(text);
}
