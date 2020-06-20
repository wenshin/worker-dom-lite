import { IPCObjectManager } from '../../ipc-object';
import { Bridge } from '../../interface';

export function registerReconcilerHandlers(bridge: Bridge, ipcObjectManager: IPCObjectManager) {
  const handlers = {
    /**
     This is where react-reconciler wants to create an instance of UI element in terms of the target. Since our target here is the DOM, we will create document.createElement and type is the argument that contains the type string like div or img or h1 etc. The initial values of domElement attributes can be set in this function from the newProps argument
    */
    createInstance: (type, newProps) => {
      const domElement = document.createElement(type);
      Object.keys(newProps).forEach((propName) => {
        const propValue = newProps[propName];
        if (propName === 'children') {
          if (typeof propValue === 'string' || typeof propValue === 'number') {
            domElement.textContent = propValue;
          }
        } else if (propName === 'onClick') {
          domElement.addEventListener('click', propValue);
        } else if (propName === 'className') {
          domElement.setAttribute('class', propValue);
        } else {
          const propValue = newProps[propName];
          domElement.setAttribute(propName, propValue);
        }
      });
      return domElement;
    },
    appendInitialChild: (parent, child) => {
      parent.appendChild(child);
    },
    appendChild(parent, child) {
      parent.appendChild(child);
    },
    appendChildToContainer: (parent, child) => {
      parent.appendChild(child);
    },
    commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
      Object.keys(newProps).forEach((propName) => {
        const propValue = newProps[propName];
        if (propName === 'children') {
          if (typeof propValue === 'string' || typeof propValue === 'number') {
            domElement.textContent = propValue;
          }
        } else {
          const propValue = newProps[propName];
          domElement.setAttribute(propName, propValue);
        }
      });
    },
    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.text = newText;
    },
    removeChild(parentInstance, child) {
      parentInstance.removeChild(child);
    }
  };

  bridge.registerInvokeHandlers('reconciler', handlers);
}
