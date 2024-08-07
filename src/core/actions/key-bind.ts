export class KeyBind {
  constructor(public readonly key: string) {}

  match({ key }: KeyboardEvent): boolean {
    return this.key === key
  }
}
