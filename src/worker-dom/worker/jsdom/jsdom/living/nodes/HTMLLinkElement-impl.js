const HTMLElementImpl = require('./HTMLElement-impl').implementation;

// Important reading: "appropriate times to obtain the resource" in
// https://html.spec.whatwg.org/multipage/semantics.html#link-type-stylesheet

class HTMLLinkElementImpl extends HTMLElementImpl {
  constructor(globalObject, args, privateData) {
    super(globalObject, args, privateData);

    this.sheet = null;
  }

  get relList() {
    return this._relList;
  }

  _attach() {
    super._attach();
  }

  _attrModified(name, value, oldValue) {
    super._attrModified(name, value, oldValue);

    if (name === 'rel' && this._relList !== undefined) {
      this._relList.attrModified();
    }
  }

  get _accept() {
    return 'text/css,*/*;q=0.1';
  }
}

module.exports = {
  implementation: HTMLLinkElementImpl
};
