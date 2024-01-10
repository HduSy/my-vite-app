// import { debounce } from 'lodash-es'
// import EventEmitter from "oh-my-mitt"
// import { IEventHandler } from "oh-my-mitt/lib/types"
export { base64toBlob } from './base64-blob.ts';
export { getCoordinate } from './getCoordinate.ts';
export { showToast } from './showToast.ts';
export { throttle } from './throttle';

export function fire(name: string, res: any) {
  // EventEmitter.emit(name, res)
}

export function receive(name: string, callback: IEventHandler) {
  // EventEmitter.on(name, callback)
}

// console.log(debounce);

// console.log('import.meta.env', import.meta.env.TEAT_APIENV)