import { defaultOrderHandler } from '../actions/default-order-handler.js'
import { globalActions } from '../actions/global-actions.js'
import {
  ActionSet,
  CommandResult,
  DefaultCommandable,
} from '../actions/types.js'
import { FuncName } from './func-name.js'
import { FuncOptions } from './func.types.js'
import { ICancel } from './interfaces/cancel.interface.js'
import { Scope } from './scope.js'

export class Func implements DefaultCommandable<Func>, ICancel {
  public static readonly actions: ActionSet<Func> = new Set([
    globalActions.cancel,
  ])

  private parentScope: Scope
  public readonly name: FuncName

  public actions: ActionSet<Func> = Func.actions
  public order = defaultOrderHandler

  constructor({ parentScope }: FuncOptions) {
    this.parentScope = parentScope
    this.name = new FuncName({ func: this })
  }

  cancel(): CommandResult {
    if (this.name.value) {
      return {
        effects: [{ type: 'blur' }],
      }
    } else {
      return {
        effects: [{ type: 'delete' }],
      }
    }
  }
}
