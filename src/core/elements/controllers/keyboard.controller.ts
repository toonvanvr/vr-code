import { ApplicationController } from '../../abstract/application.controller.js'
import { ApplicationElement } from '../../abstract/application.element.js'
import { DeveloperError } from '../../errors/developer.error.js'
import { ScopeElement } from '../scope.element.js'

export class KeyboardController extends ApplicationController {
  #target!: ApplicationElement
  #handleKeyPress = this.handleKeyPress.bind(this)

  set target(element: ApplicationElement | null | undefined) {
    if (!element) {
      throw new DeveloperError('Must focus an element')
    }
    if (this.#target) {
      this.#target.removeEventListener('keypress', this.#handleKeyPress)
    }
    console.log('adding event listener')
    element.addEventListener('keypress', this.#handleKeyPress)
    this.#target = element
  }

  get target(): ApplicationElement {
    if (!this.#target) {
      throw new DeveloperError('Must focus an element first')
    }
    return this.#target
  }

  onAttach(): void {
    this.target = this.root?.querySelector('vr-code-scope')
  }

  onDetach(): void {
    this.target = null
  }

  handleKeyPress({
    key,
    shiftKey,
    ctrlKey,
    altKey,
    metaKey,
  }: KeyboardEvent): void {
    console.log({ key, shiftKey, ctrlKey, altKey, metaKey })
    switch (key) {
      case 'f':
        break
      case 'F':
        if (this.target instanceof ScopeElement) {
          this.target.addFunction()
        }
        break
    }
  }
}
