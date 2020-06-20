import idlUtils from 'jsdom/lib/jsdom/living/generated/utils';

export default class NodeList {
  _list: any[];
  _isLive: boolean;
  _version: number;
  _element: { _version: number };
  _query: () => any[];

  constructor(options: { nodes?: any[]; element: { _version: number }; query: () => any[] }) {
    if (options.nodes) {
      this._list = [ ...options.nodes ];
      this._isLive = false;
    } else {
      this._list = [];
      this._isLive = true;
      this._version = -1;
      this._element = options.element;
      this._query = options.query;
      this._update();
    }
  }
  get length() {
    this._update();
    return this._list.length;
  }
  item(index) {
    this._update();
    return this._list[index] || null;
  }
  _update() {
    if (this._isLive) {
      if (this._version < this._element._version) {
        const snapshot = this._query();
        for (let i = 0; i < snapshot.length; i++) {
          this._list[i] = snapshot[i];
        }
        this._list.length = snapshot.length;
        this._version = this._element._version;
      }
    }
  }
  get [idlUtils.supportedPropertyIndices]() {
    this._update();
    return this._list.keys();
  }
}
