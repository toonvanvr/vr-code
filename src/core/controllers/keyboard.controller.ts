import { Controller } from '../abstract/controller.class.js'
import { Application } from '../application.js'

export class KeyboardController extends Controller {
  application: Application | null = null

  attach(application: Application) {
    if (!this.application) {
      this.application = application
    } else {
      throw new Error(`${this.constructor.name} already attached`)
    }

    return this
  }

  detach() {
    this.application = null

    return this
  }
}
