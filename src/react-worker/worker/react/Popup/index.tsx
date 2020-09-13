import React, { ReactNode, Fragment, createRef, RefObject } from 'react';
import ReactDOM from 'react-dom';
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
  // default is true
  autoUseScrollContainer?: boolean;
  getContainer?: () => HTMLElement;
  renderPopup: (arg: RenderArg) => ReactNode;
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
    this.setState({ isShow: true });
  };

  handleClose = () => {
    this.isShowCache = false;
    setTimeout(() => {
      this.setState({ isShow: this.isShowCache });
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
    const popupArgs = {
      ref: this.popupElemRef,
      align: alignConfig,
      isShow,
      close: this.handleClose,
      open: this.handleOpen
    };

    const triggerArgRef = {
      ref: this.triggerElemRef,
      align: alignConfig,
      isShow,
      close: this.handleClose,
      open: this.handleOpen
    };
    let popup = this.props.renderPopup(popupArgs);
    return (
      <Fragment>
        {this.props.children(triggerArgRef)}
        {isShow && ReactDOM.createPortal(popup, this.wrapperElem)}
      </Fragment>
    );
  }
}
