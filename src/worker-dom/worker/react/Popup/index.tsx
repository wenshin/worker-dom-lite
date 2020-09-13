import React, { ReactNode, Fragment, createRef, RefObject } from 'react';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';
import { TransitionProps, TransitionStatus } from 'react-transition-group/Transition';
// import alignElement from '../../../host/utils/align';
import { AlignConfig, Point } from '../../../host/utils/align';

export interface RenderArg {
  ref: RefObject<HTMLElement>;
  isShow: boolean;
  close: Function;
  open: Function;
  align?: AlignConfig;
}

export interface PopupProps {
  align: AlignConfig;
  transition?: TransitionProps;
  // default is true
  autoUseScrollContainer?: boolean;
  getContainer?: () => HTMLElement;
  renderPopup: (arg: RenderArg & { transitionStatus?: TransitionStatus }) => ReactNode;
  children: (arg: RenderArg) => ReactNode;
}

interface PopupState {
  isShow: boolean;
  alignConfig?: AlignConfig;
}

const POPUP_WRAPPER_ID = '__popup_wrapper__';
const POPUP_ELEMENT_CLS = '__popup_element__';

function getWrapper(): HTMLElement {
  let wrapper = document.getElementById(POPUP_WRAPPER_ID);
  if (!wrapper) {
    const div = document.createElement('div');
    div.id = POPUP_WRAPPER_ID;
    div.style.display = 'none';
    document.body.appendChild(div);
    wrapper = div;
  }
  const elem = document.createElement('div');
  elem.className = POPUP_ELEMENT_CLS;
  elem.style.display = 'inline-block';
  wrapper.appendChild(elem);
  return elem;
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
export default class Popup extends React.PureComponent<PopupProps, PopupState> {
  popupElemRef = createRef<HTMLElement>();
  triggerElemRef = createRef<HTMLElement>();
  wrapperElem: HTMLElement;
  isShowCache: boolean;

  constructor(props: PopupProps) {
    super(props);
    this.state = {
      isShow: false
    };
    this.wrapperElem = getWrapper();
    this.isShowCache = false;
  }

  static getDerivedStateFromProps(props: PopupProps) {
    return {
      alignConfig: props.align || getDefaultAlign()
    };
  }

  handleOpen = () => {
    this.isShowCache = true;
    if (!this.state.isShow) {
      this.setState({ isShow: true });
    }
  };

  handleClose = () => {
    this.isShowCache = false;
    setTimeout(() => {
      if (this.state.isShow && !this.isShowCache) {
        this.setState({ isShow: this.isShowCache });
      }
    }, 100);
  };

  alignPopup() {
    const { isShow } = this.state;
    const { align, getContainer, autoUseScrollContainer } = this.props;
    if (isShow && this.popupElemRef.current && this.triggerElemRef.current) {
      (this.wrapperElem as any)
        .alignElement({
          triggerElem: this.triggerElemRef.current,
          container: getContainer && getContainer(),
          alignConfig: align || getDefaultAlign(),
          autoUseScrollContainer
        })
        .then((config: AlignConfig) => {
          this.setState({ alignConfig: config });
        });
      // test for host popup
      // alignElement({
      //   elem: this.wrapperElem,
      //   triggerElem: this.triggerElemRef.current,
      //   container: getContainer && getContainer(),
      //   alignConfig: align || getDefaultAlign(),
      //   autoUseScrollContainer
      // });
    }
  }

  componentDidMount() {
    this.alignPopup();
  }

  componentDidUpdate() {
    this.alignPopup();
  }

  componentWillUnmount() {
    this.wrapperElem.remove();
  }

  render() {
    const { isShow, alignConfig } = this.state;
    const { renderPopup, children, transition } = this.props;
    const popupArgs: RenderArg & { transitionStatus?: TransitionStatus } = {
      ref: this.popupElemRef,
      align: alignConfig,
      isShow,
      close: this.handleClose,
      open: this.handleOpen
    };

    const triggerArgs = {
      ref: this.triggerElemRef,
      align: alignConfig,
      isShow,
      close: this.handleClose,
      open: this.handleOpen
    };

    const popup = transition ? (
      <Transition {...transition} in={isShow}>
        {(status: TransitionStatus) => {
          popupArgs.transitionStatus = status;
          return renderPopup(popupArgs);
        }}
      </Transition>
    ) : (
      renderPopup(popupArgs)
    );

    return (
      <Fragment>
        {children(triggerArgs)}
        {isShow && ReactDOM.createPortal(popup, this.wrapperElem)}
      </Fragment>
    );
  }
}
