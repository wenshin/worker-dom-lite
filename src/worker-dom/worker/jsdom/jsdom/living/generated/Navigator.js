"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../navigator/Navigator-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "Navigator";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("Navigator", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

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
  const wrapper = utils.makeWrapper(Navigator, globalObject);

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
  class Navigator {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    javaEnabled() {
      const esValue = this || globalObject;

      return esValue[implSymbol].javaEnabled();
    }

    get appCodeName() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["appCodeName"];
    }

    get appName() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["appName"];
    }

    get appVersion() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["appVersion"];
    }

    get platform() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["platform"];
    }

    get product() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["product"];
    }

    get productSub() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["productSub"];
    }

    get userAgent() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["userAgent"];
    }

    get vendor() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["vendor"];
    }

    get vendorSub() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["vendorSub"];
    }

    get language() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["language"];
    }

    get languages() {
      const esValue = this || globalObject;
      return utils.tryWrapperForImpl(esValue[implSymbol]["languages"]);
    }

    get onLine() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["onLine"];
    }

    get cookieEnabled() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["cookieEnabled"];
    }

    get plugins() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "plugins", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["plugins"]);
      });
    }

    get mimeTypes() {
      const esValue = this || globalObject;
      return utils.getSameObject(this, "mimeTypes", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["mimeTypes"]);
      });
    }

    get hardwareConcurrency() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["hardwareConcurrency"];
    }
  }
  Object.defineProperties(Navigator.prototype, {
    javaEnabled: { enumerable: true },
    appCodeName: { enumerable: true },
    appName: { enumerable: true },
    appVersion: { enumerable: true },
    platform: { enumerable: true },
    product: { enumerable: true },
    productSub: { enumerable: true },
    userAgent: { enumerable: true },
    vendor: { enumerable: true },
    vendorSub: { enumerable: true },
    language: { enumerable: true },
    languages: { enumerable: true },
    onLine: { enumerable: true },
    cookieEnabled: { enumerable: true },
    plugins: { enumerable: true },
    mimeTypes: { enumerable: true },
    hardwareConcurrency: { enumerable: true },
    [Symbol.toStringTag]: { value: "Navigator", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = Navigator;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Navigator
  });
};
