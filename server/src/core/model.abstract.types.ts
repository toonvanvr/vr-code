import { UUID } from '../util/types'

export interface ModelOptions {
  /**
   * Used for imports. A new UUID will be generated when not given.
   */
  id?: UUID

  /**
   * Make the model publicly accessible
   */
  isPublic?: boolean
}
