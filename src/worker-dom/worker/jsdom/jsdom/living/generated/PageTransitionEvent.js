"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../events/PageTransitionEvent-impl.js");

const PageTransitionEventInit = require("./PageTransitionEventInit.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const Event = require("./Event.js");

const interfaceName = "PageTransitionEvent";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("PageTransitionEvent", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  Event._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  if (globalObject.Event === undefined) {
    throw new Error("Internal error: attempting to evaluate PageTransitionEvent before Event");
  }
  class PageTransitionEvent extends globalObject.Event {
    constructor(type) {
      return exports.setup(Object.create(new.target.prototype), globalObject, arguments);
    }

    get persisted() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["persisted"];
    }
  }
  Object.defineProperties(PageTransitionEvent.prototype, {
    persisted: { enumerable: true },
    [Symbol.toStringTag]: { value: "PageTransitionEvent", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = PageTransitionEvent;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: PageTransitionEvent
  });
};
