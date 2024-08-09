import { defaultOrderHandler } from '../actions/default-order-handler.js'
import { globalActions } from '../actions/global-actions.js'
import { ActionSet, Commandable, CommandResult } from '../actions/types.js'
import { Func } from './func.js'
import { ICreateFunc } from './interfaces/create-func.interface.js'

export class Scope implements Commandable<Scope>, ICreateFunc {
  private static readonly actions: ActionSet<Scope> = new Set([
    globalActions.createFunction,
  ])

  public actions = Scope.actions
  public order = defaultOrderHandler
  public readonly functions = new Set()

  constructor() {}

  createFunc(): CommandResult<{ func: Func }> {
    const func = new Func({ parentScope: this })
    this.functions.add(func)
    const { effects: editEffects } = func.name.edit()
    return {
      data: { func },
      effects: [{ type: 'focus', target: func }, ...editEffects],
    }
  }
}
