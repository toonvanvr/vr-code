import { defaultOrderHandler } from '../actions/default-order-handler.js'
import { globalActions } from '../actions/global-actions.js'
import {
  ActionSet,
  CommandResult,
  DefaultCommandable,
} from '../actions/types.js'
import { FuncNameEditorOptions } from './func-name-editor.types.js'
import { FuncName } from './func-name.js'
import { ICancel } from './interfaces/cancel.interface.js'

export class FuncNameEditor
  implements DefaultCommandable<FuncNameEditor>, ICancel
{
  public static readonly actions: ActionSet<FuncNameEditor> = new Set([
    globalActions.cancel,
  ])

  public readonly name: FuncName

  public actions = FuncNameEditor.actions
  public order = defaultOrderHandler

  constructor({ name }: FuncNameEditorOptions) {
    this.name = name
  }

  cancel(): CommandResult {
    return {
      effects: [{ type: 'focus', target: this.name }],
    }
  }
}
