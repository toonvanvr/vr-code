import {
  Command,
  DefaultCommandable,
  EventPropagation,
  OrderHandler,
} from './types.js'

export const defaultOrderHandler = function <
  Target extends DefaultCommandable<Target>
>(this: Target, command: Command): EventPropagation {
  console.groupCollapsed(
    `order: ${
      command.keyboard ? `Keyboard: ${command.keyboard.key}` : command.command
    }`
  )
  console.log('target\n', this)
  console.log('command\n', command)
  const propagation: EventPropagation = {
    received: false,
    bubble: true,
    reactions: [],
  }

  for (const action of this.actions) {
    const { received, bubble, reactions } = action.receive(this, command)
    propagation.received ||= received
    propagation.bubble &&= bubble
    propagation.reactions.push(...reactions)
    if (!bubble) {
      break
    }
  }

  console.log('propagation\n', propagation)
  console.groupEnd()
  return propagation
} satisfies OrderHandler<any>
