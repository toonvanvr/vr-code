import { Action } from './action.js'

export type Effect =
  // TOOD: or generic
  {
    type: 'focus'
    target: Commandable<any>
  }

export type CommandResult<T = void> = { effects: Effect[] } & (T extends void
  ? {}
  : { data: T })

export type Command = {
  keyboard?: KeyboardEvent
  command?: string
  payload?: any
}

export type EventPropagation = {
  received: boolean
  bubble: boolean
  effects: Effect[]
}

export type Executor<Target> = (
  this: Target,
  command: Command
) => EventPropagation

export type OrderHandler<Target> = (
  this: Target,
  command: Command
) => EventPropagation

export type ActionSet<Target> = Set<Action<Target>>

export type Commandable<Target> = {
  order: OrderHandler<Target>
}

export type DefaultCommandable<Target> = Commandable<Target> & {
  actions: ActionSet<Target>
  bubble?: (command: Command) => void
}
