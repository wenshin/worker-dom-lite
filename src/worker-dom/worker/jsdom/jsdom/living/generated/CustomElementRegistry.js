"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../custom-elements/CustomElementRegistry-impl.js");

const CustomElementConstructor = require("./CustomElementConstructor.js");
const ElementDefinitionOptions = require("./ElementDefinitionOptions.js");
const Node = require("./Node.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "CustomElementRegistry";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("CustomElementRegistry", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window"]);

exports.install = globalObject => {
  class CustomElementRegistry {
    constructor() {
      throw new TypeError("Illegal constructor");
    }

    define(name, constructor) {
      const esValue = this || globalObject;

      return esValue[implSymbol].define(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get(name) {
      const esValue = this || globalObject;

      return esValue[implSymbol].get(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    whenDefined(name) {
      try {
        const esValue = this || globalObject;

        return utils.tryWrapperForImpl(
          esValue[implSymbol].whenDefined(
            ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
          )
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }

    upgrade(root) {
      const esValue = this || globalObject;

      return esValue[implSymbol].upgrade(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }
  }
  Object.defineProperties(CustomElementRegistry.prototype, {
    define: { enumerable: true },
    get: { enumerable: true },
    whenDefined: { enumerable: true },
    upgrade: { enumerable: true },
    [Symbol.toStringTag]: { value: "CustomElementRegistry", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = CustomElementRegistry;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: CustomElementRegistry
  });
};
