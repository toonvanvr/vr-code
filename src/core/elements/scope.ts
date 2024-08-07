import { defaultOrderHandler } from '../actions/default-order-handler.js'
import { globalActions } from '../actions/global-actions.js'
import { ActionSet, Commandable } from '../actions/types.js'
import { Func } from './func.js'
import { ICreateFunc } from './interfaces/create-func.interface.js'

export class Scope implements Commandable<Scope>, ICreateFunc {
  private static readonly actions: ActionSet<Scope> = new Set([
    globalActions.createFunction,
  ])

  public actions = Scope.actions
  public order = defaultOrderHandler
  public functions = new Set()

  constructor() {}

  createFunction(): Func {
    const func = new Func()
    this.functions.add(func)
    return func
  }
}
