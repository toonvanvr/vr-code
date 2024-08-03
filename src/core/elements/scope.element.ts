import { ApplicationElement } from '../abstract/application.element.js'
import { RootElement } from './root.element.js'

export class ScopeElement extends ApplicationElement {
  public static readonly actions = [ScopeElement.prototype.addFunction]

  constructor() {
    super()
    this.tabIndex = 1
  }

  connectedCallback(): void {
    if (this.parentElement instanceof RootElement) {
      this.focus()
    }
  }

  addFunction() {
    const fn = this.ownerDocument.createElement('vr-code-function')
    this.appendChild(fn)
  }
}
