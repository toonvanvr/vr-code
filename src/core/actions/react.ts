import { ReactionMap } from './react.types'
import { ReactionCommand } from './types'

export function react<C extends keyof ReactionMap>(
  command: C,
  payload: ReactionMap[C]
): ReactionCommand {
  return { command, payload }
}
