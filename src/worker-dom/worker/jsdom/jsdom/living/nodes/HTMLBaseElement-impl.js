// const whatwgURL = require("whatwg-url");
const HTMLElementImpl = require('./HTMLElement-impl').implementation;
// const { fallbackBaseURL } = require('../helpers/document-base-url');

class HTMLBaseElementImpl extends HTMLElementImpl {
  get href() {
    const url = this.hasAttributeNS(null, 'href') ? this.getAttributeNS(null, 'href') : '';
    return url;

    // const document = this._ownerDocument;
    // const parsed = whatwgURL.parseURL(url, { baseURL: fallbackBaseURL(document) });

    // if (parsed === null) {
    //   return url;
    // }

    // return whatwgURL.serializeURL(parsed);
    // return whatwgURL.serializeURL(parsed);
  }

  set href(value) {
    this.setAttributeNS(null, 'href', value);
  }
}

module.exports = {
  implementation: HTMLBaseElementImpl
};
