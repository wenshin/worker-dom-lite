import { Bridge } from '../../interface';
import { IPCObjectManager, IPCCargo } from '../../ipc-object';
import align, { AlignConfig } from '../utils/align';

export function registerAlignHandlers(bridge: Bridge, ipcObjectManager: IPCObjectManager) {
  bridge.registerInvokeHandlers('Element', {
    alignElement(params: {
      elemCargo?: IPCCargo;
      triggerElemCargo?: IPCCargo;
      alignConfig?: AlignConfig;
      autoUseScrollContainer?: boolean;
      container?: IPCCargo;
    }) {
      const elem = params.elemCargo && ipcObjectManager.getObject<HTMLElement>(params.elemCargo);
      const triggerElem = params.triggerElemCargo && ipcObjectManager.getObject<HTMLElement>(params.triggerElemCargo);
      const containerElem = params.container && ipcObjectManager.getObject<HTMLElement>(params.container);
      if (!elem || !triggerElem || !params.alignConfig) {
        throw new Error(
          `Element:align arguments [${params.elemCargo}, ${params.triggerElemCargo}, ${params.alignConfig}] are invalid!`
        );
      }
      return align({
        elem,
        triggerElem,
        alignConfig: params.alignConfig,
        autoUseScrollContainer: params.autoUseScrollContainer,
        container: containerElem
      });
    }
  });
}
