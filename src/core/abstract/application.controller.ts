import { ApplicationElement } from './application.element.js'

export abstract class ApplicationController extends ApplicationElement {
  abstract onAttach(): void
  abstract onDetach(): void

  connectedCallback(): void {
    super.connectedCallback()
    this.onAttach()
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.onDetach()
  }
}
