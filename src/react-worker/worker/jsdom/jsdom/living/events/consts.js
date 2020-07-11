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
  BridgeDocumentMethods: {
    createElement: 'document:createElement',
    createTextNode: 'document:createTextNode'
  }
};
