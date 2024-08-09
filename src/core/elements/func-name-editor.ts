import { defaultOrderHandler } from '../actions/default-order-handler.js'
import { globalActions } from '../actions/global-actions.js'
import {
  ActionSet,
  CommandResult,
  DefaultCommandable,
} from '../actions/types.js'
import { FuncNameEditorOptions } from './func-name-editor.types.js'
import { FuncName } from './func-name.js'
import { IAccept } from './interfaces/accept.interface.js'
import { ICancel } from './interfaces/cancel.interface.js'

export class FuncNameEditor
  implements DefaultCommandable<FuncNameEditor>, ICancel, IAccept
{
  readonly input: HTMLInputElement

  public static readonly actions: ActionSet<FuncNameEditor> = new Set([
    globalActions.cancel,
    globalActions.accept,
  ])

  public readonly name: FuncName

  public actions = FuncNameEditor.actions
  public order = defaultOrderHandler

  constructor({ name }: FuncNameEditorOptions) {
    this.name = name
    this.input = document.createElement('input')
    this.input.type = 'text'
    document.body.appendChild(this.input)
    this.input.focus()
  }

  cancel(): CommandResult {
    this.destroy()
    return {
      effects: [{ type: 'blur' }],
    }
  }

  accept(): CommandResult {
    this.name.value = this.input.value
    console.log('Func name = ', this.name.value)
    this.destroy()
    return {
      effects: [{ type: 'blur' }],
    }
  }

  private destroy() {
    this.input.remove()
  }
}
