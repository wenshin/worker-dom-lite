"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../fetch/Headers-impl.js");

const Function = require("./Function.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "Headers";

const IteratorPrototype = Object.create(utils.IteratorPrototype, {
  next: {
    value: function next() {
      const internal = this && this[utils.iterInternalSymbol];
      if (!internal) {
        throw new TypeError("next() called on a value that is not an iterator prototype object");
      }

      const { target, kind, index } = internal;
      const values = Array.from(target[implSymbol]);
      const len = values.length;
      if (index >= len) {
        return { value: undefined, done: true };
      }

      const pair = values[index];
      internal.index = index + 1;
      return utils.iteratorResult(pair.map(utils.tryWrapperForImpl), kind);
    },
    writable: true,
    enumerable: true,
    configurable: true
  },
  [Symbol.toStringTag]: {
    value: "Headers Iterator",
    configurable: true
  }
});

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.createDefaultIterator = (target, kind) => {
  const iterator = Object.create(IteratorPrototype);
  Object.defineProperty(iterator, utils.iterInternalSymbol, {
    value: { target, kind, index: 0 },
    configurable: true
  });
  return iterator;
};

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("Headers", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window", "Worker"]);

exports.install = globalObject => {
  class Headers {
    constructor() {
      return exports.setup(Object.create(new.target.prototype), globalObject, arguments);
    }

    append(name, value) {
      const esValue = this || globalObject;

      return esValue[implSymbol].append(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    delete(name) {
      const esValue = this || globalObject;

      return esValue[implSymbol].delete(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    get(name) {
      const esValue = this || globalObject;

      return esValue[implSymbol].get(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    has(name) {
      const esValue = this || globalObject;

      return esValue[implSymbol].has(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    set(name, value) {
      const esValue = this || globalObject;

      return esValue[implSymbol].set(
        ...Array.prototype.map.call(arguments, v => (v && v[implSymbol] ? v[implSymbol] : v))
      );
    }

    keys() {
      if (!exports.is(this)) {
        throw new TypeError("'keys' called on an object that is not a valid instance of Headers.");
      }
      return exports.createDefaultIterator(this, "key");
    }

    values() {
      if (!exports.is(this)) {
        throw new TypeError("'values' called on an object that is not a valid instance of Headers.");
      }
      return exports.createDefaultIterator(this, "value");
    }

    entries() {
      if (!exports.is(this)) {
        throw new TypeError("'entries' called on an object that is not a valid instance of Headers.");
      }
      return exports.createDefaultIterator(this, "key+value");
    }

    forEach(callback) {
      if (!exports.is(this)) {
        throw new TypeError("'forEach' called on an object that is not a valid instance of Headers.");
      }
      if (arguments.length < 1) {
        throw new TypeError("Failed to execute 'forEach' on 'iterable': 1 argument required, " + "but only 0 present.");
      }
      callback = Function.convert(callback, {
        context: "Failed to execute 'forEach' on 'iterable': The callback provided as parameter 1"
      });
      const thisArg = arguments[1];
      let pairs = Array.from(this[implSymbol]);
      let i = 0;
      while (i < pairs.length) {
        const [key, value] = pairs[i].map(utils.tryWrapperForImpl);
        callback.call(thisArg, value, key, this);
        pairs = Array.from(this[implSymbol]);
        i++;
      }
    }
  }
  Object.defineProperties(Headers.prototype, {
    append: { enumerable: true },
    delete: { enumerable: true },
    get: { enumerable: true },
    has: { enumerable: true },
    set: { enumerable: true },
    keys: { enumerable: true },
    values: { enumerable: true },
    entries: { enumerable: true },
    forEach: { enumerable: true },
    [Symbol.toStringTag]: { value: "Headers", configurable: true },
    [Symbol.iterator]: { value: Headers.prototype.entries, configurable: true, writable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = Headers;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Headers
  });
};
