import React, { ReactNode, Fragment, useState, useEffect, useCallback, useRef, MutableRefObject } from 'react';
import ReactDOM from 'react-dom';
// import align from '../../../host/utils/align';
import { AlignConfig, Point } from '../../../host/utils/align';

export interface RenderArg {
  ref: MutableRefObject<HTMLElement | null>;
  isShow: boolean;
  close: Function;
  open: Function;
  align?: AlignConfig;
}

export interface PopupProps {
  align: AlignConfig;
  // default is true
  autoUseScrollContainer?: boolean;
  getContainer?: () => HTMLElement;
  renderPopup: (arg: RenderArg) => ReactNode;
  children: (arg: RenderArg) => ReactNode;
}

interface PopupState {
  isShow: boolean;
  alignConfig: AlignConfig;
}

const POPUP_CONTAINER_ID = '__popup_container__';
const POPUP_ELEMENT_CLS = '__popup_element__';

function getDefaultContainer(): HTMLElement {
  let wrapper = document.getElementById(POPUP_CONTAINER_ID);
  if (!wrapper) {
    const div = document.createElement('div');
    div.id = POPUP_CONTAINER_ID;
    div.style.display = 'none';
    document.body.appendChild(div);
    wrapper = div;
  }
  const container = document.createElement('div');
  container.className = POPUP_ELEMENT_CLS;
  container.style.display = 'inline-block';
  wrapper.appendChild(container);
  return container;
}

function getDefaultAlign(): AlignConfig {
  return {
    points: [ Point.CC, Point.CC ],
    offset: [ 0, 0 ],
    targetOffset: [ 0, 0 ],
    overflow: { adjustX: true, adjustY: true }
  };
}

/**
 *
 * 1. first render
 * 2. mount and align
 * 3. change align config
 *
 * @example
 * ```
 * <Popup
 *   renderPopup={({ isShow, close, open }) => <div className="" >message</div>}
 * >
 *  {({ isShow, open, close }) => <span onClick={open}>click show</span>}
 * </Popup>
 * ```
 */
export default function Popup(props: PopupProps) {
  const [ isShow, setShow ] = useState(false);
  const [ alignConfig, setAlignConfig ] = useState<AlignConfig>(props.align);
  const close = useCallback(() => setShow(false), [ setShow ]);
  const open = useCallback(() => setShow(true), [ setShow ]);

  const containerRef = useRef<HTMLElement | null>(props.getContainer ? props.getContainer() : null);
  let wrapperRef = useRef<HTMLElement | null>(null);
  if (!wrapperRef.current) {
    wrapperRef.current = getDefaultContainer();
  }
  let popupElemRef = useRef<HTMLElement | null>(null);
  let triggerElemRef = useRef<HTMLElement | null>(null);

  let targetArgRef = useRef<RenderArg>({
    ref: triggerElemRef,
    align: alignConfig,
    isShow,
    close,
    open
  });

  let popupArgRef = useRef<RenderArg>({
    ref: popupElemRef,
    align: alignConfig,
    isShow,
    close,
    open
  });

  useEffect(
    () => {
      let container: HTMLElement | null = null;
      if (containerRef.current) {
        container = containerRef.current;
      }
      if (isShow && wrapperRef.current && popupElemRef.current && triggerElemRef.current) {
        (wrapperRef.current as any)
          .alignElement({
            triggerElem: triggerElemRef.current,
            container: containerRef.current,
            alignConfig: props.align || getDefaultAlign(),
            autoUseScrollContainer: props.autoUseScrollContainer
          })
          .then((config: AlignConfig) => setAlignConfig(config));
        // align({
        //   elem: wrapperRef.current,
        //   triggerElem: triggerElemRef.current,
        //   container: containerRef.current,
        //   alignConfig: props.align || getDefaultAlign(),
        //   autoUseScrollContainer: props.autoUseScrollContainer
        // });
      }
      return () => {
        container && container.remove();
      };
    },
    [ isShow, props.align, props.autoUseScrollContainer ]
  );

  let popup = props.renderPopup(popupArgRef.current);
  return (
    <Fragment>
      {props.children(targetArgRef.current)}
      {isShow && ReactDOM.createPortal(popup, wrapperRef.current)}
    </Fragment>
  );
}
