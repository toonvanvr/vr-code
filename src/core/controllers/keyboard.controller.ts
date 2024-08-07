import { Commandable } from '../actions/types.js'
import { KeyboardControllerOptions } from './keyboard.controller.types.js'

export class KeyboardController<T extends Commandable<any>> {
  target: T

  constructor({ target }: KeyboardControllerOptions<T>) {
    this.target = target

    document.addEventListener('keypress', (keyboard) => {
      const { reactions } = this.target.order({ keyboard })

      for (const { command, payload } of reactions) {
        switch (command) {
          case 'focus':
            console.log('focus', { target: payload })
            this.target = payload
            break
        }
      }
    })
  }
}
