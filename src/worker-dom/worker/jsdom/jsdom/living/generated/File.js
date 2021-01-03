"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../file-api/File-impl.js");

const Blob = require("./Blob.js");
const FilePropertyBag = require("./FilePropertyBag.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "File";

exports.is = utils.is.bind(utils);
exports.isImpl = utils.isImpl.bind(utils, Impl);
exports.convert = utils.convert.bind(utils);

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = utils.makeWrapper("File", globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  Blob._internalSetup(wrapper, globalObject);
};

exports.setup = utils.getSetUp(exports, Impl);

const exposed = new Set(["Window", "Worker"]);

exports.install = globalObject => {
  if (globalObject.Blob === undefined) {
    throw new Error("Internal error: attempting to evaluate File before Blob");
  }
  class File extends globalObject.Blob {
    constructor(fileBits, fileName) {
      return exports.setup(Object.create(new.target.prototype), globalObject, arguments);
    }

    get name() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["name"];
    }

    get lastModified() {
      const esValue = this || globalObject;
      return esValue[implSymbol]["lastModified"];
    }
  }
  Object.defineProperties(File.prototype, {
    name: { enumerable: true },
    lastModified: { enumerable: true },
    [Symbol.toStringTag]: { value: "File", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = File;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: File
  });
};
