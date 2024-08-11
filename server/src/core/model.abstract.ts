import { BehaviorSubject, distinctUntilChanged, Observable, share } from 'rxjs'
import { UUID } from '../util/types'
import { ModelOptions } from './model.abstract.types'

export abstract class Model {
  /**
   * The unique identifier of this model
   *
   * A UUIDV4 is used to support importing/exporting of values
   */
  public readonly id: UUID

  #isPublic$: BehaviorSubject<boolean>
  #isPublic$$?: Observable<boolean>
  get isPublic$(): Observable<boolean> {
    return (this.#isPublic$$ ||= this.#isPublic$.pipe(
      distinctUntilChanged(),
      share()
    ))
  }
  setIsPublic$(value: boolean) {
    this.#isPublic$.next(value)
  }

  constructor({
    id = crypto.randomUUID(),
    isPublic = true,
  }: ModelOptions = {}) {
    this.id = id
    this.#isPublic$ = new BehaviorSubject(isPublic)
  }

  /**
   * Serialize the model to a plain object
   *
   *
   */
  serialize() {
    return {
      id: this.id,
      isPublic: this.#isPublic$.value,
    }
  }
}
