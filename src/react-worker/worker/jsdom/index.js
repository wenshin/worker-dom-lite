const idlUtils = require('./jsdom/living/generated/utils.js');
const { createWindow } = require('./jsdom/browser/Window.js');
const { parseIntoDocument } = require('./jsdom/browser/parser');

const window = Symbol('window');
// let sharedFragmentDocument = null;

class JSDOM {
  constructor(input, options = {}) {
    options = transformOptions(options, 'utf-8', null);

    this[window] = createWindow(options.windowOptions);

    const documentImpl = idlUtils.implForWrapper(this[window]._document);

    options.beforeParse(this[window]._globalProxy);

    parseIntoDocument(input, documentImpl);

    documentImpl.close();
  }

  get window() {
    // It's important to grab the global proxy, instead of just the result of `createWindow(...)`, since otherwise
    // things like `window.eval` don't exist.
    return this[window]._globalProxy;
  }
}

function transformOptions(options, encoding, mimeType) {
  const transformed = {
    windowOptions: {
      // Defaults
      url: 'about:blank',
      referrer: '',
      contentType: 'text/html',
      parsingMode: 'html',
      parseOptions: {
        sourceCodeLocationInfo: false,
        scriptingEnabled: false
      },
      runScripts: undefined,
      encoding,
      pretendToBeVisual: false,
      storageQuota: 5000000,

      // Defaults filled in later
      resourceLoader: undefined,
      virtualConsole: undefined,
      cookieJar: undefined,
      ...options.windowOptions
    },

    // Defaults
    beforeParse() {}
  };

  transformed.windowOptions.contentType = 'text/html';
  transformed.windowOptions.parsingMode = 'html';

  if (options.beforeParse !== undefined) {
    transformed.beforeParse = options.beforeParse;
  }

  if (options.pretendToBeVisual !== undefined) {
    transformed.windowOptions.pretendToBeVisual = Boolean(options.pretendToBeVisual);
  }

  if (options.storageQuota !== undefined) {
    transformed.windowOptions.storageQuota = Number(options.storageQuota);
  }

  return transformed;
}

export { JSDOM };
