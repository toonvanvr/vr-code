import { Commandable } from '../actions/types.js'
import { assertExhausted } from '../util/typescript.js'
import { KeyboardControllerOptions } from './keyboard.controller.types.js'

export class KeyboardController {
  target: Commandable<any>

  constructor({ target }: KeyboardControllerOptions) {
    this.target = target

    document.addEventListener('keydown', (keyboard) => {
      const { effects } = this.target.order({ keyboard })

      for (const effect of effects) {
        switch (effect.type) {
          case 'focus':
            this.target = effect.target
            console.log('focus', this.target)
            break
          default:
            assertExhausted(effect.type)
        }
      }
    })
  }
}
