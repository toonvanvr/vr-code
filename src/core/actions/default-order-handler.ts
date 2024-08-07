import {
  Command,
  DefaultCommandable,
  EventPropagation,
  OrderHandler,
} from './types.js'

export const defaultOrderHandler = function <
  Target extends DefaultCommandable<Target>
>(this: Target, command: Command): EventPropagation {
  if (command.keyboard) {
    const keys = []
    if (command.keyboard.ctrlKey) keys.unshift('Ctrl')
    if (command.keyboard.shiftKey) keys.unshift('Shift')
    if (command.keyboard.altKey) keys.unshift('Alt')
    if (command.keyboard.metaKey) keys.unshift('Meta')
    if (!['Ctrl', 'Alt', 'Meta', 'Shift'].includes(command.keyboard.key)) {
      keys.push(command.keyboard.key)
    }
    const keysStr = keys.map((key) => `[${key}]`).join('+')
    console.groupCollapsed(`${this.constructor.name} → ${keysStr}`)
  } else {
    console.groupCollapsed(`${this.constructor.name} → ${command.command}`)
  }
  console.log('target\n', this)
  console.log('command\n', command)
  const propagation: EventPropagation = {
    received: false,
    bubble: true,
    effects: [],
  }

  for (const action of this.actions) {
    const { received, bubble, effects } = action.receive(this, command)
    propagation.received ||= received
    propagation.bubble &&= bubble
    propagation.effects.push(...effects)
    if (!bubble) {
      break
    }
  }

  console.log('propagation\n', propagation)
  console.groupEnd()
  return propagation
} satisfies OrderHandler<any>
