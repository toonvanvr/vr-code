import { ICancel } from '../elements/interfaces/cancel.interface.js'
import { ICreateFunc } from '../elements/interfaces/create-func.interface.js'
import { IDelete } from '../elements/interfaces/delete.interface.js'
import { IEdit } from '../elements/interfaces/edit.interface.js'
import { ISave } from '../elements/interfaces/save.interface.js'
import { Action } from './action.js'
import { KeyBind } from './key-bind.js'
import { Command } from './types.js'

export const globalActions = {
  createFunction: new Action<ICreateFunc>({
    name: 'create function',
    description: 'Create a new function',
    execute(command: Command) {
      const { effects } = this.createFunc()
      return {
        received: true,
        bubble: false,
        effects,
      }
    },
    keyBinds: new Set([new KeyBind('F')]),
  }),

  cancel: new Action<ICancel>({
    name: 'cancel',
    description: 'Cancel the current action',
    execute(command: Command) {
      const { effects } = this.cancel()
      return {
        received: true,
        bubble: false,
        effects,
      }
    },
    keyBinds: new Set([new KeyBind('Escape')]),
  }),

  edit: new Action<IEdit>({
    name: 'edit',
    description: 'Edit the target',
    execute(command: Command) {
      const { effects } = this.edit()
      return {
        received: true,
        bubble: false,
        effects,
      }
    },
    keyBinds: new Set([new KeyBind('Enter')]),
  }),

  delete: new Action<IDelete>({
    name: 'delete',
    description: 'Delete the target',
    execute(command: Command) {
      const { effects } = this.delete()
      return {
        received: true,
        bubble: false,
        effects,
      }
    },
    keyBinds: new Set([new KeyBind('Backspace'), new KeyBind('Delete')]),
  }),

  save: new Action<ISave>({
    name: 'save',
    description: 'Save the target',
    execute(command: Command) {
      const { effects } = this.save()
      return {
        received: true,
        bubble: false,
        effects,
      }
    },
    keyBinds: new Set([new KeyBind('Enter')]),
  }),
} as const
