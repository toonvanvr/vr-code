import type { ApplicationElement } from './abstract/application.element.js'
import { ApplicationOptions } from './application.types.js'
import { KeyboardController } from './elements/controllers/keyboard.controller.js'
import { RootElement } from './elements/root.element.js'
import { ScopeElement } from './elements/scope.element.js'
import { DeveloperError } from './errors/developer.error.js'
export class Application {
  /** List of {@link ApplicationElement}s to be registered as custom elements */
  static readonly elements = [RootElement, ScopeElement, KeyboardController]

  /** HTML tag for the root element and prefix for custom elements */
  public readonly htmlTag: string

  constructor({ htmlTag }: ApplicationOptions) {
    this.htmlTag = htmlTag
    this.registerHtmlElements()

    console.debug(this)
  }

  registerHtmlElements() {
    const definitions = Application.elements.map((constructor) => ({
      constructor,
      tag:
        constructor.name === RootElement.name
          ? this.htmlTag
          : `${this.htmlTag}${constructor.name
              .replace(/Element$/, '')
              .replace(/([A-Z])/g, '-$1')
              .toLowerCase()}`,
    }))

    // Debug info
    console.debug(
      'Registering custom HTML elements:',
      definitions.map(({ tag }) => `\n• <${tag}>`).join()
    )

    // Assert no HTML tag namespace collisions
    const collisions = definitions.filter(
      ({ tag }) => customElements.get(tag) !== undefined
    )

    if (collisions.length) {
      const collision = collisions.length > 1 ? 'collisions' : 'collision'
      throw new DeveloperError(`HTML Custom Element namespace ${collision}`, {
        description: collisions.map(
          ({ tag, constructor }) => `<${tag}> → ${constructor.name}`
        ),
        solution: `Provide another value for ${this.constructor.name}({ htmlTag: '${this.htmlTag}' })`,
      }).toString()
    }

    // Register the elements
    for (const { tag, constructor } of definitions) {
      customElements.define(tag, constructor)
    }
  }
}
