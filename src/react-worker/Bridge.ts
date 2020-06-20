import events from 'events';
import { genId } from './utils';
import {
  Bridge,
  BridgeCode,
  BridgePayload,
  InvokeCallback,
  BridgeTransport,
  EventEmitterOptions,
  SubscribeCallback,
  PayloadOptions
} from './interface';

export function newPayload(options: PayloadOptions) {
  return {
    id: genId(),
    code: options.code || BridgeCode.OK,
    ...options
  };
}

export function getBridgeName(namespace: string, method: string) {
  return `${namespace}:${method}`;
}

export const BRIDGE_READY_EVENT = getBridgeName('bridge', 'ready');

const INVOKE_NAME = 'invoke';
const EVENT_NAME = 'event';
const INNER_PREFIX = '$$';

function getInnerName(name: string) {
  return `${INNER_PREFIX}:${name}`;
}

function isInnerName(name: string, prefix?: string) {
  return name.startsWith(`${INNER_PREFIX}:${prefix || ''}`);
}

function getInvokeName(method: string) {
  return getInnerName(`${INVOKE_NAME}:${method}`);
}

function getEventName(name: string) {
  return getInnerName(`${EVENT_NAME}:${name}`);
}

class BridgeImpl extends events.EventEmitter implements Bridge {
  private invokeResponseHandler: {
    [invokeName: string]: {
      [id: string]: InvokeCallback | null;
    };
  };

  private invokeRequestHandler: {
    [invokeName: string]: Function;
  };

  private transport: BridgeTransport;

  private isReady: boolean;

  name: string;

  constructor(options: EventEmitterOptions) {
    super(options);
    this.name = options.name || 'Bridge';
    this.isReady = false;
    this.transport = options.transport;
    this.transport.onMessage((payload) => {
      this.emit(payload.name, payload);
    });
    this.invokeRequestHandler = {};
    this.invokeResponseHandler = {};
  }

  invoke(method: string, args: any[], cb?: InvokeCallback): Promise<any> | undefined {
    console.debug(this.name, 'Invoke', method, args);
    const name = getInvokeName(method);
    const payload = newPayload({ name, args });
    this.transport.postMessage(payload);

    if (!this.invokeResponseHandler[name]) {
      this.invokeResponseHandler[name] = this.invokeResponseHandler[name] || {};
    }

    if (cb) {
      this.invokeResponseHandler[name][payload.id] = cb;
    } else {
      return new Promise((resolve, reject) => {
        this.invokeResponseHandler[name][payload.id] = (err: Error | null, data: any) => {
          if (err) {
            console.error(this.name, `InvokeResponseError: ${err.message}, ${name}, ${payload.id}`);
            reject(err);
          } else {
            resolve(data);
          }
        };
      });
    }
  }

  invokeSync(method: string, params: any): any {
    throw new Error('not support sync invoking');
  }

  registerInvokeHandlers(namespace: string, handlers: { [method: string]: Function }): this {
    Object.keys(handlers).forEach((method) => {
      const name = getInvokeName(`${namespace}:${method}`);
      this.invokeRequestHandler[name] = handlers[method];
    });
    return this;
  }

  unregisterInvokeHandlers(namespace: string, methods: string[]): this {
    methods.forEach((method) => {
      const name = getInvokeName(`${namespace}:${method}`);
      delete this.invokeRequestHandler[name];
    });
    return this;
  }

  publish(name: string, data?: any): this {
    console.debug(this.name, 'Publish', name, data);
    if (name === BRIDGE_READY_EVENT) {
      this.isReady = true;
    }
    const id = genId();
    this.transport.postMessage({
      id,
      data,
      name: getEventName(name),
      code: BridgeCode.OK
    });
    return this;
  }

  subscribe(name: string, cb: SubscribeCallback): this {
    if (name === BRIDGE_READY_EVENT && this.isReady) {
      cb(null);
      return this;
    }
    return this.on(getEventName(name), cb);
  }

  unsubscribe(name: string, cb?: SubscribeCallback): this {
    if (cb) {
      return this.off(getEventName(name), cb);
    }
    return this.removeAllListeners(name);
  }

  emit(name: string, payload: BridgePayload): boolean {
    if (isInnerName(name, INVOKE_NAME)) {
      if (payload.invokeId) {
        // invoke response
        this.handleInvokeResponseEvent(payload);
      } else {
        // invoke request
        this.handleInvokeRequestEvent(payload);
      }
      return true;
    }

    if (name === getEventName(BRIDGE_READY_EVENT)) {
      this.isReady = true;
    }

    return super.emit(name, payload.data);
  }

  private handleInvokeResponseEvent(payload: BridgePayload) {
    const { name, code, invokeId = '', message, data } = payload;
    const map = this.invokeResponseHandler[name];
    const invoke = map && map[invokeId];
    if (!invoke) {
      throw new Error(`BridgeInvokeError: no invoke response handler for ${name} ${invokeId}`);
    }

    let err: Error | null = null;
    if (code !== BridgeCode.OK) {
      err = new Error(message || 'unknown error');
    }
    invoke(err, data);
    this.invokeResponseHandler[name][invokeId] = null;
  }

  private handleInvokeRequestEvent(payload: BridgePayload) {
    const { id, name, args = [] } = payload;
    const invoke = this.invokeRequestHandler[name];
    if (!invoke) {
      const payload = newPayload({
        name,
        invokeId: id,
        code: BridgeCode.INVOKE_RESPONSE_ERR,
        message: `no invoke request handler for ${name}`
      });
      this.transport.postMessage(payload);
      return;
    }

    try {
      Promise.resolve(invoke(...args)).then(
        (data: any) => {
          const payload = newPayload({ name, invokeId: id, data });
          this.transport.postMessage(payload);
        },
        (err: Error) => {
          const payload = newPayload({
            name,
            invokeId: id,
            code: BridgeCode.INVOKE_RESPONSE_ERR,
            message: err.stack
          });
          this.transport.postMessage(payload);
        }
      );
    } catch (err) {
      const payload = newPayload({
        name,
        invokeId: id,
        code: BridgeCode.INVOKE_RESPONSE_ERR,
        message: err.stack
      });
      this.transport.postMessage(payload);
    }
  }

  on(name: string, cb: SubscribeCallback): this {
    return super.on(name, cb);
  }

  once(name: string, cb: SubscribeCallback): this {
    return super.once(name, cb);
  }

  off(name: string, cb: SubscribeCallback): this {
    return super.off(name, cb);
  }
}

export default BridgeImpl;
