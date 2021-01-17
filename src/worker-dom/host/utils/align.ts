import domAlign from 'dom-align';
import { AlignConfig } from '../../interface';

const LAYER_CONTAINER_CLASS = '__dom_align_layer_container__';

/**
 * 1. popup in scroll element
 * 2. popup in body
 * 3. modal、drawer in body
 * 4. popup in modal、drawer
 * 5. popup in popup
 */
function isScrollElem(elem: HTMLElement) {
  if (elem === document.body) return true;

  let hasScroll = elem.scrollHeight > elem.clientHeight || elem.clientWidth > elem.clientHeight;
  // Get the computed style of the body element
  const cStyle = (elem as any).currentStyle || window.getComputedStyle(elem, '');

  // Check the overflow and overflowY properties for "auto" and "visible" values
  return (
    cStyle.overflow === 'visible' ||
    cStyle.overflowX === 'visible' ||
    cStyle.overflowY === 'visible' ||
    (hasScroll && cStyle.overflow === 'auto') ||
    (hasScroll && cStyle.overflowX === 'auto') ||
    (hasScroll && cStyle.overflowY === 'auto')
  );
}

function createLayer(viewportElem: HTMLElement) {
  const div = document.createElement('div');
  div.classList.add(LAYER_CONTAINER_CLASS);
  div.style.position = 'absolute';
  div.style.top = '0px';
  div.style.left = '0px';
  div.style.width = '100%';
  div.style.height = '0';
  viewportElem.appendChild(div);
  return div;
}

function getLayer(targetElem: HTMLElement, useScrollElement: boolean = true): Element {
  let viewport: HTMLElement = document.body;
  let layer: Element | null = null;
  for (let p = targetElem.parentElement; p && p !== document.body; p = p.parentElement) {
    if (useScrollElement && isScrollElem(p)) {
      viewport = p;
    }

    const layers = p.getElementsByClassName(LAYER_CONTAINER_CLASS);
    // popup 中二次唤起 popup，那么需要和父级 popup 使用相同的 layer
    if (layers.length) {
      layer = layers[0];
    }
  }

  if (!layer) {
    // 当没有找到默认的 layer 则新建一个 layer
    layer = createLayer(viewport);
  }

  return layer;
}

export default function align(params: {
  elem: HTMLElement;
  triggerElem: HTMLElement;
  alignConfig: AlignConfig;
  autoUseScrollContainer?: boolean;
  container?: HTMLElement | null;
}) {
  const c = params.container || getLayer(params.triggerElem, params.autoUseScrollContainer);
  if (params.elem.parentNode !== c) {
    c.appendChild(params.elem);
  }
  return domAlign(params.elem, params.triggerElem, params.alignConfig);
}
