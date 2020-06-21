export function assertBridgeEventData(event: string, data?: any) {
  if (!data || !data.elemCargo) {
    throw createEventDataError(event, 'elemCargo is needed!');
  }
}

export function createEventDataError(event: string, reason: string): Error {
  return new Error(`BridgeHostError: Event ${event} data argument is invalid, the reason is [${reason}]`);
}
