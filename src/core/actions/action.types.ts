import { KeyBind } from './key-bind.js'
import { Executor } from './types.js'

export interface ActionOptions<Target> {
  name: string
  description: string
  execute: Executor<Target>
  keyBinds: Iterable<KeyBind>
}
