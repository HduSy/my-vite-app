import mitt, { IEventHandler } from '../emitter';
export { base64toBlob } from './base64-blob.ts';
export { getCoordinate } from './getCoordinate.ts';
export { showToast } from './showToast.ts';
export { throttle } from './throttle';

export function fire(name: string, res: any) {
  mitt.emit(name, res)
}

export function receive(name: string, callback: IEventHandler) {
  mitt.on(name, callback)
}