export enum BridgeCode {
  OK = 0,
  NO_INVOKE_HANDLER = 1,
  INVOKE_RESPONSE_ERR = 3
}

export interface BridgePayload {
  id: string;
  name: string;
  code: BridgeCode;
  message?: string;
  invokeId?: string;
  args?: any[];
  data?: any;
}

export type PayloadOptions = Omit<BridgePayload, 'id' | 'code'> & { code?: BridgeCode };

export type InvokeCallback = (err: Error | null, data: any) => void;

export type SubscribeCallback = (data: any) => void;

export interface BridgeTransport {
  name: string;
  postMessage(payload: BridgePayload, transfer?: Transferable[]): void;
  onMessage(cb: (payload: BridgePayload) => void): void;
}

export interface TransportTransferPayload {
  $channel: string;
  payload: any;
}

export interface EventEmitterOptions {
  transport: BridgeTransport;
  name?: string;
  /**
   * Enables automatic capturing of promise rejection.
   */
  captureRejections?: boolean;
}

/**
 *  bridge 实现以下功能
 *
 *   -> invoke method
 *     -> register invokeResponseHandler
 *     -> transport.postMessage
 *       - call invokeRequestHandler
 *     <- transport.postMessage response data (succ or fail), with invoke id
 *   <- call invokeResponseHandler
 *
 *   -> publish event
 *     -> transport.postMessage event data
 *       - call eventHandlers
 *
 *   -> subscribe event
 *     -> register eventHandlers
 *
 */
export interface Bridge extends NodeJS.EventEmitter {
  name: string;
  /**
   * 异步调用沙盒方法
   * @param method 规则具体参考「底层通信事件名约定」
   * @param params
   * @param cb optional, 如果不传，返回 Promise 对象
   * @returns
   */
  invoke(method: string, params: any, cb?: InvokeCallback): Promise<any> | undefined;

  /**
   * 同步调用沙盒方法
   * @param method
   * @param params
   */
  invokeSync(method: string, params: any): any;

  // 注册响应 bridge invoke 的方法
  registerInvokeHandlers(namespace: string, handlers: { [method: string]: Function }): this;

  // 取消注册响应 bridge invoke 的方法
  unregisterInvokeHandlers(namespace: string, methods: string[]): this;

  /**
   * 给沙盒发送事件
   * @param payload Payload
   */
  publish(name: string, data?: any): this;

  /**
   * 监听另一个线程或则进程的事件
   */
  subscribe(name: string, cb: SubscribeCallback): this;

  /**
   * 取消监听另一个线程或则进程的事件
   */
  unsubscribe(name: string, cb?: SubscribeCallback): this;

  /**
   * 触发 Bridge.on 方法监听的事件
   * @param name 格式 (type::)?name，type 没有时为 event 类型，和 on/once/off 方法的 name 参数相同
   * @param data
   */
  emit(name: string, payload: BridgePayload): boolean;

  // 多次监听 emit 触发的某个事件
  on(name: string, cb: SubscribeCallback): this;

  // 单次监听 emit 触发的事件
  once(name: string, cb: SubscribeCallback): this;

  // 取消 on 事件监听
  off(name: string, cb: SubscribeCallback): this;
}
