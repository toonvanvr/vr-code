import { Commandable } from '../actions/types.js'
import { History } from '../util/collections.js'
import { assertExhausted } from '../util/typescript.js'
import { KeyboardControllerOptions } from './keyboard.controller.types.js'

export class KeyboardController {
  public readonly targetHistory: History<Commandable<any>>

  constructor({ target }: KeyboardControllerOptions) {
    this.targetHistory = new History(target, { length: 10 })

    document.addEventListener('keydown', (keyboard) => {
      const { effects } = this.targetHistory.current.order({ keyboard })

      for (const effect of effects) {
        const type = effect.type
        switch (type) {
          case 'focus': {
            console.log('focus', effect.target)
            this.targetHistory.push(effect.target)
            break
          }
          case 'blur': {
            const target = this.targetHistory.back()
            console.log('blur', target)
            break
          }
          case 'delete': {
            const target = this.targetHistory.backAndEraseFuture()
            console.log('delete history and go back to', target)
            break
          }
          default: {
            assertExhausted(type)
          }
        }
      }

      keyboard.stopImmediatePropagation()
      keyboard.stopPropagation()
      return false
    })
  }
}
