module.exports = {
  BridgeCommonEvents: {
    initRuntime: 'common:init-runtime',
    setProperty: 'common:setProperty'
  },
  BridgeElementEvents: {
    setAttribute: 'Element:setAttribute',
    setAttributeNS: 'Element:setAttributeNS',
    removeAttribute: 'Element:removeAttribute',
    removeAttributeNS: 'Element:removeAttributeNS',
    toggleAttribute: 'Element:toggleAttribute'
  },
  BridgeNodeEvents: {
    removeChild: 'Node:removeChild'
  },
  BridgeElementMethods: {
    alignElement: 'Element:alignElement'
  },
  BridgeDocumentMethods: {
    createElement: 'document:createElement',
    createTextNode: 'document:createTextNode'
  }
};
