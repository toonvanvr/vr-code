import { defaultOrderHandler } from '../actions/default-order-handler.js'
import { globalActions } from '../actions/global-actions.js'
import { ActionSet, DefaultCommandable } from '../actions/types.js'
import { FuncOptions } from './func.types.js'
import { ICancel } from './interfaces/cancel.interface.js'
import { Scope } from './scope.js'

export class Func implements DefaultCommandable<Func>, ICancel {
  public static readonly actions: ActionSet<Func> = new Set([
    globalActions.cancel,
  ])

  private parentScope: Scope

  actions: ActionSet<Func> = Func.actions
  order = defaultOrderHandler

  constructor({ parentScope }: FuncOptions) {
    this.parentScope = parentScope
  }

  cancel() {
    return {
      focus: this.parentScope,
    }
  }
}
