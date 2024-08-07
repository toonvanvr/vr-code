import { ActionOptions } from './action.types.js'
import { KeyBind } from './key-bind.js'
import { Command, EventPropagation, Executor } from './types.js'

export class Action<Target> {
  public readonly name: string
  public readonly description: string
  public readonly keyBinds = new Set<KeyBind>()
  public readonly execute: Executor<Target>

  constructor({ name, description, execute, keyBinds }: ActionOptions<Target>) {
    this.name = name
    this.description = description
    this.execute = execute
    for (const keyBind of keyBinds) {
      this.keyBinds.add(keyBind)
    }
  }

  receive(target: Target, command: Command): EventPropagation {
    const propagation: EventPropagation = {
      received: false,
      bubble: true,
      reactions: [],
    }

    if (command.keyboard) {
      for (const keyBind of this.keyBinds) {
        if (keyBind.match(command.keyboard)) {
          const { received, bubble, reactions } = this.execute.call(
            target,
            command
          )
          propagation.received ||= received
          propagation.bubble &&= bubble
          propagation.reactions.push(...reactions)
          if (!bubble) {
            break
          }
        }
      }
    }

    return propagation
  }
}
