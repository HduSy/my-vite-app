import EventEmitter from "oh-my-mitt"
import { IEventHandler } from "oh-my-mitt/lib/types"

export function fire(name: string, res: any) {
  EventEmitter.emit(name, res)
}

export function receive(name: string, callback: IEventHandler) {
  EventEmitter.on(name, callback)
}