import { Autocomplete } from '../util/types.js'
import { Action } from './action.js'
import { ReactionMap } from './react.types.js'

export type ReactionCommand =
  | {
      command: Autocomplete<string, keyof ReactionMap>
      payload?: any
    }
  | {
      command: 'focus'
      payload: Commandable<any>
    }

export type Command = {
  keyboard?: KeyboardEvent
  command?: Autocomplete<string, keyof ReactionMap>
  payload?: any
}

export type EventPropagation = {
  received: boolean
  bubble: boolean
  reactions: ReactionCommand[]
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
