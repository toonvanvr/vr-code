import { defaultOrderHandler } from '../actions/default-order-handler.js'
import { globalActions } from '../actions/global-actions.js'
import {
  ActionSet,
  CommandResult,
  DefaultCommandable,
} from '../actions/types.js'
import { FuncNameEditor } from './func-name-editor.js'
import { FuncNameOptions } from './func-name.types.js'
import { Func } from './func.js'
import { ICancel } from './interfaces/cancel.interface.js'
import { IEdit } from './interfaces/edit.interface.js'

export class FuncName implements DefaultCommandable<FuncName>, ICancel, IEdit {
  public static readonly actions: ActionSet<FuncName> = new Set([
    globalActions.cancel,
    globalActions.edit,
  ])

  private func: Func
  actions: ActionSet<FuncName> = FuncName.actions
  public order = defaultOrderHandler

  public value: string | null = null

  constructor({ func }: FuncNameOptions) {
    this.func = func
  }

  edit(): CommandResult {
    const editor = new FuncNameEditor({ name: this })
    return {
      effects: [{ type: 'focus', target: editor }],
    }
  }

  cancel(): CommandResult {
    return {
      effects: [{ type: 'focus', target: this.func }],
    }
  }
}
