import { BehaviorSubject, Observable, distinctUntilChanged, share } from 'rxjs'
import { Model } from '../core/model.abstract'
import { ModuleOptions } from './module.model.types'

export class Module extends Model {
  #symbol$: BehaviorSubject<string>
  #symbol$$?: Observable<string>
  public setSymbol(value: string) {
    this.#symbol$.next(value)
  }
  public get symbol$(): Observable<string> {
    return (this.#symbol$$ ||= this.#symbol$.pipe(
      distinctUntilChanged(),
      share()
    ))
  }

  constructor({ symbol, ...superArgs }: ModuleOptions) {
    super(superArgs)
    this.#symbol$ = new BehaviorSubject(symbol)
  }

  serialize() {
    return {
      ...super.serialize(),
      symbol: this.#symbol$.value,
    }
  }
}
