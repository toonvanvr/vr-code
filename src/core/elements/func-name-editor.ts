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
import { ISave } from './interfaces/save.interface.js'

export class FuncNameEditor
  implements DefaultCommandable<FuncNameEditor>, ICancel, ISave
{
  readonly input: HTMLInputElement

  public static readonly actions: ActionSet<FuncNameEditor> = new Set([
    globalActions.cancel,
    globalActions.save,
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

  save(): CommandResult {
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
