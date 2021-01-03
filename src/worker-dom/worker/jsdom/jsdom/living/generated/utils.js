'use strict';

// Returns "Type(value) is Object" in ES terminology.
function isObject(value) {
  return (typeof value === 'object' && value !== null) || typeof value === 'function';
}

const hasOwn = Function.prototype.call.bind(Object.prototype.hasOwnProperty);

const wrapperSymbol = Symbol('wrapper');
const implSymbol = Symbol('impl');
const sameObjectCaches = Symbol('SameObject caches');
const ctorRegistrySymbol = Symbol.for('[webidl2js]  constructor registry');

function getSameObject(wrapper, prop, creator) {
  if (!wrapper[sameObjectCaches]) {
    wrapper[sameObjectCaches] = Object.create(null);
  }

  if (prop in wrapper[sameObjectCaches]) {
    return wrapper[sameObjectCaches][prop];
  }

  wrapper[sameObjectCaches][prop] = creator();
  return wrapper[sameObjectCaches][prop];
}

function wrapperForImpl(impl) {
  return impl ? impl[wrapperSymbol] : null;
}

function implForWrapper(wrapper) {
  return wrapper ? wrapper[implSymbol] : null;
}

function tryWrapperForImpl(impl) {
  const wrapper = wrapperForImpl(impl);
  return wrapper ? wrapper : impl;
}

function tryImplForWrapper(wrapper) {
  const impl = implForWrapper(wrapper);
  return impl ? impl : wrapper;
}

const iterInternalSymbol = Symbol('internal');
const IteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function*() {}).prototype);

function isArrayIndexPropName(P) {
  if (typeof P !== 'string') {
    return false;
  }
  const i = P >>> 0;
  if (i === Math.pow(2, 32) - 1) {
    return false;
  }
  const s = `${i}`;
  if (P !== s) {
    return false;
  }
  return true;
}

const byteLengthGetter = Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, 'byteLength').get;
function isArrayBuffer(value) {
  try {
    byteLengthGetter.call(value);
    return true;
  } catch (e) {
    return false;
  }
}

function iteratorResult([ key, value ], kind) {
  let result;
  switch (kind) {
    case 'key':
      result = key;
      break;
    case 'value':
      result = value;
      break;
    case 'key+value':
      result = [ key, value ];
      break;
  }
  return { value: result, done: false };
}

function is(IImpl, value) {
  return isObject(value) && hasOwn(value, implSymbol) && value[implSymbol] instanceof IImpl.implementation;
}

function isImpl(IImpl, value) {
  return isObject(value) && value instanceof IImpl.implementation;
}

function convert(IImpl, value, { context = 'The provided value' } = {}) {
  if (is(value, IImpl)) {
    return implForWrapper(value);
  }
}

function makeWrapper(name, globalObject) {
  if (globalObject[ctorRegistrySymbol] === undefined) {
    throw new Error('Internal error: invalid global object');
  }

  const ctor = globalObject[ctorRegistrySymbol][name];
  if (ctor === undefined) {
    throw new Error(`Internal error: constructor ${name} is not installed on the passed global object`);
  }

  return Object.create(ctor.prototype);
}

const supportsPropertyIndex = Symbol('supports property index');
const supportedPropertyIndices = Symbol('supported property indices');
const supportsPropertyName = Symbol('supports property name');
const supportedPropertyNames = Symbol('supported property names');
const indexedGet = Symbol('indexed property get');
const indexedSetNew = Symbol('indexed property set new');
const indexedSetExisting = Symbol('indexed property set existing');
const namedGet = Symbol('named property get');
const namedSetNew = Symbol('named property set new');
const namedSetExisting = Symbol('named property set existing');
const namedDelete = Symbol('named property delete');

const asyncIteratorNext = Symbol('async iterator get the next iteration result');
const asyncIteratorReturn = Symbol('async iterator return steps');
const asyncIteratorInit = Symbol('async iterator initialization steps');
const asyncIteratorEOI = Symbol('async iterator end of iteration');

function getProxyHandler(idlInfo) {
  return {
    get(target, P, receiver) {
      const impl = target[implSymbol];
      if (impl) {
        return Reflect.get(impl, P, receiver);
      }
      return Reflect.get(target, P, receiver);
    },
    has(target, P) {
      return Reflect.has(target);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(target, P) {
      return Reflect.getOwnPropertyDescriptor(target, P);
    },
    set(target, P, V, receiver) {
      const impl = target[implSymbol];
      if (impl) {
        return Reflect.defineProperty(impl, P, V, receiver);
      }
      return Reflect.defineProperty(target, P, V, receiver);
    },
    defineProperty(target, P, desc) {
      const impl = target[implSymbol];
      if (impl) {
        return Reflect.defineProperty(impl, P, desc);
      }
      return Reflect.defineProperty(target, P, desc);
    },

    deleteProperty(target, P) {
      const impl = target[implSymbol];
      if (impl) {
        return Reflect.deleteProperty(impl, P, desc);
      }
      return Reflect.deleteProperty(target, P, desc);
    },

    preventExtensions() {
      return false;
    }
  };
}

// const isSupportsPropertyIndex = (idlInfo, O, index, indexedValue) => {
//   if (idlInfo.indexedUnsupportedValue) {
//     const func = idlInfo.indexedName ? idlInfo.indexedName : indexedGet;
//     const value = indexedValue || O[implSymbol][func](index);
//     return value !== idlInfo.indexedUnsupportedValue;
//   }
//   return O[implSymbol][supportsPropertyIndex](index);
// };

// const isSupportsPropertyName = (idlInfo, O, P, namedValue) => {
//   if (idlInfo.namedUnsupportedValue) {
//     const func = idlInfo.namedName ? idlInfo.namedName : namedGet;
//     const value = namedValue || O[implSymbol][func](P);
//     return value !== idlInfo.namedUnsupportedValue;
//   }
//   return O[implSymbol][supportsPropertyName](P);
// };

// const isNamedPropertyVisible = (idlInfo, P, O, supports = false) => {
//   let hasProp = idlInfo.overrideBuiltins ? !hasOwn(O, P) : !(P in O);
//   return supports ? hasProp : isSupportsPropertyName(O, P) && hasProp;
// };

function getSetUp(exports, Impl, setWrapperToProxy) {
  return (wrapper, globalObject, constructorArgs = [], privateData = {}) => {
    privateData.wrapper = wrapper;

    exports._internalSetup(wrapper, globalObject);
    Object.defineProperty(wrapper, implSymbol, {
      value: new Impl.implementation(globalObject, constructorArgs, privateData),
      configurable: true
    });

    setWrapperToProxy && setWrapperToProxy(wrapper, globalObject);

    wrapper[implSymbol][wrapperSymbol] = wrapper;
    if (Impl.init) {
      Impl.init(wrapper[implSymbol]);
    }
    return wrapper;
  };
}

module.exports = {
  is,
  isImpl,
  convert,
  isObject,
  makeWrapper,
  hasOwn,
  wrapperSymbol,
  implSymbol,
  getSameObject,
  getSetUp,
  getProxyHandler,
  ctorRegistrySymbol,
  wrapperForImpl,
  implForWrapper,
  tryWrapperForImpl,
  tryImplForWrapper,
  iterInternalSymbol,
  IteratorPrototype,
  AsyncIteratorPrototype,
  isArrayBuffer,
  isArrayIndexPropName,
  supportsPropertyIndex,
  // isSupportsPropertyIndex,
  supportedPropertyIndices,
  supportsPropertyName,
  // isSupportsPropertyName,
  // isNamedPropertyVisible,
  supportedPropertyNames,
  indexedGet,
  indexedSetNew,
  indexedSetExisting,
  namedGet,
  namedSetNew,
  namedSetExisting,
  namedDelete,
  asyncIteratorNext,
  asyncIteratorReturn,
  asyncIteratorInit,
  asyncIteratorEOI,
  iteratorResult
};
