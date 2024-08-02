import type { Controller } from "./abstract/controller.class.js";
import { ApplicationOptions } from "./application.types.js";
import { KeyboardController } from "./controllers/keyboard.controller.js";
import { ApplicationElement } from "./elements/application.element.js";

export class Application {
  /** HTML tag for the root element and prefix for custom elements */
  public readonly htmlTag: string;

  /** Input interfaces extending {@link Controller} */
  public readonly controllers = new Set([new KeyboardController()]);

  constructor({ htmlTag }: ApplicationOptions) {
    this.htmlTag = htmlTag;
    this.registerHtmlElements();
  }

  registerHtmlElements() {
    const elements = [{ tag: this.htmlTag, Element: ApplicationElement }];

    // Assert no HTML tag namespace collisions
    const namespaceCollisions = elements
      .map(({ tag }) => customElements.get(tag))
      .filter((v) => v !== undefined);

    if (namespaceCollisions.length) {
      throw new Error(
        `Custom element${
          namespaceCollisions.length > 1 ? "s" : ""
        } already registered: ${namespaceCollisions
          .map((v) => v?.name)
          .join(", ")}`
      );
    }

    // Register the elements
    for (const { tag, Element } of elements) {
      customElements.define(tag, Element);
    }
  }
}
