"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../nodes/HTMLMediaElement-impl.js");

const TextTrackKind = require("./TextTrackKind.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const HTMLElement = require("./HTMLElement.js");

const interfaceName = "HTMLMediaElement";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("HTMLMediaElement", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  HTMLElement._internalSetup(wrapper, globalObject);
};

exports.setup = (wrapper, globalObject, constructorArgs = [], privateData = {}) => {
  privateData.wrapper = wrapper;

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper;
};

exports.new = globalObject => {
  const wrapper = utils.makeWrapper(HTMLMediaElement, globalObject);

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: Object.create(Impl.implementation.prototype),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper[implSymbol];
};

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  if (globalObject.HTMLElement === undefined) {
    throw new Error("Internal error: attempting to evaluate HTMLMediaElement before HTMLElement");
  }
  class HTMLMediaElement extends globalObject.HTMLElement {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    load() {
      const esValue = this || globalObject;

      return esValue[implSymbol].load();
    }

    canPlayType(type) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].canPlayType(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    play() {
      try {
        const esValue = this || globalObject;

        return utils.tryWrapperForImpl(esValue[implSymbol].play());
      } catch (e) {
        return Promise.reject(e);
      }
    }

    pause() {
      const esValue = this || globalObject;

      return esValue[implSymbol].pause();
    }

    addTextTrack(kind) {
      const esValue = this || globalObject;

      return utils.tryWrapperForImpl(
        esValue[implSymbol].addTextTrack(
          ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
        )
      );
    }

    get src() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "src");
      if (value === null) {
        return "";
      }
      return conversions.USVString(value);
    }

    set src(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "src", V);
    }

    get currentSrc() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["currentSrc"];
    }

    get crossOrigin() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "crossorigin");
      return value === null ? "" : value;
    }

    set crossOrigin(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "crossorigin", V);
    }

    get networkState() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["networkState"];
    }

    get preload() {
      const esValue = this || globalObject;

      const value = esValue[implSymbol].getAttributeNS(null, "preload");
      return value === null ? "" : value;
    }

    set preload(V) {
      const esValue = this || globalObject;

      esValue[implSymbol].setAttributeNS(null, "preload", V);
    }

    get buffered() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["buffered"]);
    }

    get readyState() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["readyState"];
    }

    get seeking() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["seeking"];
    }

    get currentTime() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["currentTime"];
    }

    set currentTime(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["currentTime"] = V;
    }

    get duration() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["duration"];
    }

    get paused() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["paused"];
    }

    get defaultPlaybackRate() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["defaultPlaybackRate"];
    }

    set defaultPlaybackRate(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["defaultPlaybackRate"] = V;
    }

    get playbackRate() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["playbackRate"];
    }

    set playbackRate(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["playbackRate"] = V;
    }

    get played() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["played"]);
    }

    get seekable() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["seekable"]);
    }

    get ended() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["ended"];
    }

    get autoplay() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "autoplay");
    }

    set autoplay(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "autoplay", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "autoplay");
      }
    }

    get loop() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "loop");
    }

    set loop(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "loop", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "loop");
      }
    }

    get controls() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "controls");
    }

    set controls(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "controls", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "controls");
      }
    }

    get volume() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["volume"];
    }

    set volume(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["volume"] = V;
    }

    get muted() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["muted"];
    }

    set muted(V) {
      const esValue = this || globalObject;
      esValue[implSymbol]["muted"] = V;
    }

    get defaultMuted() {
      const esValue = this || globalObject;

      return esValue[implSymbol].hasAttributeNS(null, "muted");
    }

    set defaultMuted(V) {
      const esValue = this || globalObject;

      if (V) {
        esValue[implSymbol].setAttributeNS(null, "muted", "");
      } else {
        esValue[implSymbol].removeAttributeNS(null, "muted");
      }
    }

    get audioTracks() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "audioTracks", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["audioTracks"]);
      });
    }

    get videoTracks() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "videoTracks", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["videoTracks"]);
      });
    }

    get textTracks() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "textTracks", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["textTracks"]);
      });
    }
  }
  Object.defineProperties(HTMLMediaElement.prototype, {
    load: { enumerable: true },
    canPlayType: { enumerable: true },
    play: { enumerable: true },
    pause: { enumerable: true },
    addTextTrack: { enumerable: true },
    src: { enumerable: true },
    currentSrc: { enumerable: true },
    crossOrigin: { enumerable: true },
    networkState: { enumerable: true },
    preload: { enumerable: true },
    buffered: { enumerable: true },
    readyState: { enumerable: true },
    seeking: { enumerable: true },
    currentTime: { enumerable: true },
    duration: { enumerable: true },
    paused: { enumerable: true },
    defaultPlaybackRate: { enumerable: true },
    playbackRate: { enumerable: true },
    played: { enumerable: true },
    seekable: { enumerable: true },
    ended: { enumerable: true },
    autoplay: { enumerable: true },
    loop: { enumerable: true },
    controls: { enumerable: true },
    volume: { enumerable: true },
    muted: { enumerable: true },
    defaultMuted: { enumerable: true },
    audioTracks: { enumerable: true },
    videoTracks: { enumerable: true },
    textTracks: { enumerable: true },
    [Symbol.toStringTag]: { value: "HTMLMediaElement", configurable: true },
    NETWORK_EMPTY: { value: 0, enumerable: true },
    NETWORK_IDLE: { value: 1, enumerable: true },
    NETWORK_LOADING: { value: 2, enumerable: true },
    NETWORK_NO_SOURCE: { value: 3, enumerable: true },
    HAVE_NOTHING: { value: 0, enumerable: true },
    HAVE_METADATA: { value: 1, enumerable: true },
    HAVE_CURRENT_DATA: { value: 2, enumerable: true },
    HAVE_FUTURE_DATA: { value: 3, enumerable: true },
    HAVE_ENOUGH_DATA: { value: 4, enumerable: true }
  });
  Object.defineProperties(HTMLMediaElement, {
    NETWORK_EMPTY: { value: 0, enumerable: true },
    NETWORK_IDLE: { value: 1, enumerable: true },
    NETWORK_LOADING: { value: 2, enumerable: true },
    NETWORK_NO_SOURCE: { value: 3, enumerable: true },
    HAVE_NOTHING: { value: 0, enumerable: true },
    HAVE_METADATA: { value: 1, enumerable: true },
    HAVE_CURRENT_DATA: { value: 2, enumerable: true },
    HAVE_FUTURE_DATA: { value: 3, enumerable: true },
    HAVE_ENOUGH_DATA: { value: 4, enumerable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = HTMLMediaElement;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: HTMLMediaElement
  });
};
