import { Application } from '../application'

export abstract class Controller {
  constructor() {}

  abstract attach(application: Application): this
  abstract detach(): this
}
