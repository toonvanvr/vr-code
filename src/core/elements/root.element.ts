import type { ApplicationController } from '../abstract/application.controller.js'
import { ApplicationElement } from '../abstract/application.element.js'

export class RootElement extends ApplicationElement {
  /** Input interfaces extending {@link ApplicationController} */
  public readonly controllers = new Set()

  constructor() {
    super()

    console.debug(this)
  }
}
