import { ICancel } from '../elements/interfaces/cancel.interface.js'
import { ICreateFunc } from '../elements/interfaces/create-func.interface.js'
import { Action } from './action.js'
import { KeyBind } from './key-bind.js'
import { react } from './react.js'
import { Command } from './types.js'

export const globalActions = {
  createFunction: new Action<ICreateFunc>({
    name: 'create function',
    description: 'Create a new function',
    execute(command: Command) {
      try {
        const { func } = this.createFunc()
        return {
          received: true,
          bubble: false,
          reactions: [react('focus', func)],
        }
      } catch (cause: unknown) {
        return {
          received: true,
          bubble: false,
          reactions: [],
        }
      }
    },
    keyBinds: new Set([new KeyBind('F')]),
  }),
  cancel: new Action<ICancel>({
    name: 'cancel',
    description: 'Cancel the current action',
    execute(command: Command) {
      const { focus: newTarget } = this.cancel()
      return {
        received: true,
        bubble: false,
        reactions: newTarget ? [react('focus', newTarget)] : [],
      }
    },
    keyBinds: new Set([new KeyBind('Escape')]),
  }),
} as const
