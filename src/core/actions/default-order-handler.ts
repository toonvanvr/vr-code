import {
  Command,
  DefaultCommandable,
  EventPropagation,
  OrderHandler,
} from './types.js'

export const defaultOrderHandler = function <
  Target extends DefaultCommandable<Target>
>(this: Target, command: Command): EventPropagation {
  console.log('order', { target: this, command })
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

  console.log('stopped bubbling after', { target: this, command, propagation })
  return propagation
} satisfies OrderHandler<any>
