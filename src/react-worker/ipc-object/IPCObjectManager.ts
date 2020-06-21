import { Bridge } from '../interface';
import { isIPCCargo, IPCCargo, IPCCargoImpl, IPCCargoType, IPC_NAMESPACE, IPCObject } from './IPCObject';
import { MirrorCreatorMap } from './mirror';
import { PackerMap } from './packer';
import { getBridgeName } from '../Bridge';

export const IPC_REMOVE_EVENT = 'IPCObjectManager:remove';

export class IPCObjectManager {
  bridge: Bridge;
  objMapById: Map<string, IPCObject> = new Map();
  cargoMapById: Map<string, IPCCargo> = new Map();
  cargoMapByObj: WeakMap<any, IPCCargo> = new WeakMap();

  constructor(bridge: Bridge) {
    this.bridge = bridge;
    this.bridge.subscribe(IPC_REMOVE_EVENT, (cargo: IPCCargo) => {
      this.remove(cargo);
    });
  }

  addSource(type: IPCCargoType | string, source: IPCObject): IPCCargo {
    let cargo = this.cargoMapByObj.get(source);
    if (cargo) {
      return cargo;
    }

    cargo = new IPCCargoImpl(type);
    this.cargoMapById.set(cargo.id, cargo);
    this.cargoMapByObj.set(source, cargo);
    this.objMapById.set(cargo.id, source);

    if (type === IPCCargoType.FUNCTION || type === IPCCargoType.EVENT_CALLBACK) {
      // 函数的 IPCObj 是否应该封装起来
      this.bridge.subscribe(getBridgeName(IPC_NAMESPACE, cargo.id), (args: any) => {
        // @ts-ignore
        const packer = PackerMap[cargo.type];
        const newArgs = packer && packer.unpack ? packer.unpack(this, ...args) : args;
        return (source as Function)(...newArgs);
      });
    }
    return cargo;
  }

  addMirror(cargo: IPCCargo, mirror?: IPCObject): void {
    if (!isIPCCargo(cargo)) return;
    if (!mirror) {
      const creator = MirrorCreatorMap[cargo.type];
      if (!creator) {
        return;
      }
      const packer = PackerMap[cargo.type];
      mirror = MirrorCreatorMap[cargo.type](this, cargo, packer && packer.pack) as IPCObject;
    }

    if (!this.cargoMapByObj.has(mirror)) {
      this.cargoMapById.set(cargo.id, cargo);
      this.cargoMapByObj.set(mirror, cargo);
      this.objMapById.set(cargo.id, mirror);
    }
  }

  remove(cargo: IPCCargo): void {
    if (isIPCCargo(cargo)) {
      const cg = this.cargoMapById.get(cargo.id);
      if (cg) {
        const obj = this.objMapById.get(cg.id);
        if (obj) {
          this.cargoMapByObj.delete(obj);
          this.objMapById.delete(cg.id);

          if (cg.type === IPCCargoType.FUNCTION || cg.type === IPCCargoType.EVENT_CALLBACK) {
            // 函数的 IPCObj 是否应该封装起来
            this.bridge.unsubscribe(getBridgeName(IPC_NAMESPACE, cg.id));
          }
        }
        this.cargoMapById.delete(cargo.id);
      }
    }
  }

  removeByObject(obj: IPCObject): IPCCargo | undefined {
    const cargo = this.cargoMapByObj.get(obj);
    if (cargo) {
      this.remove(cargo);
    }
    return cargo;
  }

  removeRemote(cargo: IPCCargo) {
    if (!isIPCCargo(cargo)) return;
    this.bridge.publish(IPC_REMOVE_EVENT, cargo);
  }

  getObject<T extends IPCObject>(cargo: IPCCargo): T | undefined {
    if (!isIPCCargo(cargo)) return;
    return this.objMapById.get(cargo.id) as T;
  }

  getCargoByObject(obj: IPCObject): IPCCargo | undefined {
    return this.cargoMapByObj.get(obj);
  }
}
