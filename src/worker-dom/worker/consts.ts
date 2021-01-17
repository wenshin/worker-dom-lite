export enum BridgeCommonEvents {
  initRuntime = 'common:init-runtime',
  setProperty = 'common:setProperty'
}

export enum BridgeElementEvents {
  setAttribute = 'Element:setAttribute',
  setAttributeNS = 'Element:setAttributeNS',
  removeAttribute = 'Element:removeAttribute',
  removeAttributeNS = 'Element:removeAttributeNS',
  toggleAttribute = 'Element:toggleAttribute'
}

export enum BridgeEventTargetMethods {
  addEventListener = 'EventTarget:addEventListener',
  removeEventListener = 'EventTarget:removeEventListener'
}

export enum BridgeNodeEvents {
  removeChild = 'Node:removeChild'
}

export enum BridgeNodeMethods {
  insertBefore = 'Node:insertBefore'
}

export enum BridgeElementMethods {
  alignElement = 'Element:alignElement',
  getBoundingClientRect = 'Element:getBoundingClientRect'
}

export enum BridgeDocumentMethods {
  createElement = 'document:createElement',
  createTextNode = 'document:createTextNode'
}
