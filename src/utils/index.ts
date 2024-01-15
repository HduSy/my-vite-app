import mitter, { IEventHandler } from 'oh-my-mitt';

export { base64toBlob } from './base64-blob.ts';
export { getCoordinate } from './getCoordinate.ts';
export { showToast } from './showToast.ts';
export { throttle } from './throttle';

export function fire(name: string, res: any) {
  mitter.emit(name, res)
}

export function receive(name: string, callback: IEventHandler) {
  mitter.on(name, callback)
}