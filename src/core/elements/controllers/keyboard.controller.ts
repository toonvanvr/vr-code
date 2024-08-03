import { getDomPath } from '../../../util/dom.js'
import { ApplicationController } from '../../abstract/application.controller.js'

export class KeyboardController extends ApplicationController {
  #handleKeyPress = ({
    key,
    shiftKey,
    ctrlKey,
    altKey,
    metaKey,
    target,
  }: KeyboardEvent): void => {
    console.log({ key, shiftKey, ctrlKey, altKey, metaKey, target })
  }
  #attachEventListener = (): void => {
    this.root?.addEventListener('keypress', this.#handleKeyPress)
  }
  #detachEventListener = (): void => {
    this.root?.removeEventListener('keypress', this.#handleKeyPress)
  }
  onAttach(): void {
    this.root?.addEventListener('focus', this.#attachEventListener)
    this.root?.addEventListener('focusin', this.#attachEventListener)
    this.root?.addEventListener('focusout', this.#detachEventListener)
    this.root?.addEventListener('blur', this.#detachEventListener)
    if (this.root && document.activeElement) {
      if (getDomPath(document.activeElement).includes(this.root)) {
        this.#attachEventListener()
      }
    }
  }

  onDetach(): void {
    this.root?.removeEventListener('focusin', this.#attachEventListener)
    this.root?.removeEventListener('focusout', this.#detachEventListener)
  }
}
