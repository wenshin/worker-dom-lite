const { IPCCargoType } = require('../../../ipc-object');

function getIPCMethod(method: string) {
  return `EventTarget:${method}`;
}

class EventTargetImpl {
  constructor(globalObject, args, privateData) {
    const { bridge, ipcObjectManager } = privateData.options;
    this.$bridge = bridge;
    this.$ipcObjectManager = ipcObjectManager;
    this.$cargo = this.$ipcObjectManager.addSource(IPCCargoType.ELEMENT, this);
  }

  addEventListener(type, callback, ...args) {
    const cb = this.$ipcObjectManager.addSource(IPCCargoType.FUNCTION, callback);
    this.$bridge.invoke(getIPCMethod('addEventListener'), [ this.$cargo, type, cb, ...args ], (err) => {
      if (err) {
        this.$ipcObjectManager.removeByObject(callback);
      }
    });
  }

  removeEventListener(type, callback, ...args) {
    const cb = this.$ipcObjectManager.removeByObject(callback);
    this.$bridge.invoke(getIPCMethod('removeEventListener'), [ this.$cargo, type, cb, ...args ]).then(() => {
      // 保证删除远端的缓存
      this.$ipcObjectManager.removeRemote(cb);
    });
  }

  dispatchEvent(eventImpl) {
    throw new Error('EventTarget.dispatchEvent not implemented');
  }

  // https://dom.spec.whatwg.org/#get-the-parent
  _getTheParent() {
    return null;
  }
}

module.exports = {
  implementation: EventTargetImpl
};
