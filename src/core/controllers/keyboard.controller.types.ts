import { Commandable } from '../actions/types'

export interface KeyboardControllerOptions<T extends Commandable<any>> {
  target: T
}
