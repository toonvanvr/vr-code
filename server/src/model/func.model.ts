import { distinctUntilChanged, Observable, share } from 'rxjs'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { Model } from '../core/model.abstract'
import { FuncOptions } from './func.model.types'
export class Func extends Model {
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

  constructor({ symbol = null, ...superArgs }: FuncOptions = {}) {
    super(superArgs)
    this.#symbol$ = new BehaviorSubject(symbol)
  }
}
