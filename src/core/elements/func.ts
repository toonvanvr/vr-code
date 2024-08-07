import { defaultOrderHandler } from '../actions/default-order-handler.js'
import { ActionSet, DefaultCommandable } from '../actions/types.js'

export class Func implements DefaultCommandable<Func> {
  actions: ActionSet<Func> = new Set()
  order = defaultOrderHandler
}
