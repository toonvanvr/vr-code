import { BehaviorSubject, Observable, distinctUntilChanged, share } from 'rxjs'
import { Model } from '../core/model.abstract'
import { ScopeOptions } from './scope.model.types'

export class Scope extends Model {
  #symbol$: BehaviorSubject<string | null>
  #symbol$$?: Observable<string | null>
  public setSymbol(value: string) {
    this.#symbol$.next(value)
  }
  public get symbol$(): Observable<string | null> {
    return (this.#symbol$$ ||= this.#symbol$.pipe(
      distinctUntilChanged(),
      share()
    ))
  }

  constructor({ symbol = null, ...superArgs }: ScopeOptions = {}) {
    super(superArgs)
    this.#symbol$ = new BehaviorSubject(symbol)
  }
}
