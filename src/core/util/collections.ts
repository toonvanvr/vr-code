export class History<T> {
  private readonly raw: T[]
  private cursor = 0
  private position = 0
  private size = 1

  constructor(value: T, { length }: { length: number }) {
    this.raw = new Array<T>(length)
    this.raw[this.cursor] = value
    console.log(this)
  }

  public push(value: T): T {
    this.cursor = (this.cursor + 1) % this.raw.length
    this.size = Math.min(this.size + 1, this.raw.length)
    this.position = this.size - 1
    this.raw[this.cursor] = value
    console.log('pushed', this, this.raw)
    return value
  }

  public back(): T {
    if (this.size === 1) {
      return this.raw[this.cursor]
    }
    this.cursor = (this.cursor - 1 + this.raw.length) % this.raw.length
    this.position = Math.max(this.position - 1, 0)
    return this.raw[this.cursor]
  }

  public backAndEraseFuture(): T {
    if (this.size === 1) {
      return this.raw[this.cursor]
    }
    this.cursor = (this.cursor - 1 + this.raw.length) % this.raw.length
    this.position = Math.max(this.position - 1, 0)
    this.size = this.position + 1
    return this.raw[this.cursor]
  }

  public forward(): T | null {
    if (this.size === 0 || this.position === this.size) {
      return null
    }
    const value = this.raw[this.cursor]
    this.cursor = (this.cursor + 1) % this.raw.length
    this.position = Math.min(this.position + 1, this.size)
    return value
  }

  public get current(): T {
    return this.raw[this.cursor]
  }
}
