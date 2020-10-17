"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../constraint-validation/ValidityState-impl.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "ValidityState";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("ValidityState", globalObject);
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
  const wrapper = utils.makeWrapper(ValidityState, globalObject);

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
  class ValidityState {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    get valueMissing() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["valueMissing"];
    }

    get typeMismatch() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["typeMismatch"];
    }

    get patternMismatch() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["patternMismatch"];
    }

    get tooLong() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["tooLong"];
    }

    get tooShort() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["tooShort"];
    }

    get rangeUnderflow() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["rangeUnderflow"];
    }

    get rangeOverflow() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["rangeOverflow"];
    }

    get stepMismatch() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["stepMismatch"];
    }

    get badInput() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["badInput"];
    }

    get customError() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["customError"];
    }

    get valid() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["valid"];
    }
  }
  Object.defineProperties(ValidityState.prototype, {
    valueMissing: { enumerable: true },
    typeMismatch: { enumerable: true },
    patternMismatch: { enumerable: true },
    tooLong: { enumerable: true },
    tooShort: { enumerable: true },
    rangeUnderflow: { enumerable: true },
    rangeOverflow: { enumerable: true },
    stepMismatch: { enumerable: true },
    badInput: { enumerable: true },
    customError: { enumerable: true },
    valid: { enumerable: true },
    [Symbol.toStringTag]: { value: "ValidityState", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = ValidityState;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: ValidityState
  });
};
