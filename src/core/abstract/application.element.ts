import { getDomPath } from '../../util/dom.js'
import type { RootElement } from '../elements/root.element.js'
import { DeveloperError } from '../errors/developer.error.js'

export abstract class ApplicationElement extends HTMLElement {
  protected static readonly actions: ((...args: any[]) => any)[] = []

  protected root: RootElement | null = null

  constructor() {
    super()
  }

  connectedCallback(): void {
    // Assert and assign `this.root`
    if (this.tagName === 'vr-code') {
      this.root = this as unknown as RootElement
    } else {
      const root = this.closest('vr-code')

      if (root?.tagName === 'VR-CODE') {
        this.root = root as RootElement
      } else {
        throw new DeveloperError('Root element not found', {
          solution: `One of the dom parent nodes must be an application root element`,
          data: getDomPath(this),
        })
      }
    }
  }

  disconnectedCallback(): void {}
}
