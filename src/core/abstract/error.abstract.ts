import { AbstractErrorOptions } from './error.abstract.types.js'

function msg<T extends undefined | string | Iterable<string>>(
  msg: T
): T extends string | Iterable<string> ? string : null {
  if (msg === undefined) {
    return null as T extends string | Iterable<string> ? string : null
  } else {
    return (typeof msg === 'string' ? msg : [...msg].join('\n')) as T extends
      | string
      | Iterable<string>
      ? string
      : null
  }
}

export abstract class AbstractError extends Error {
  public readonly description: string | undefined
  public readonly solution: string | undefined
  public readonly data: unknown | undefined
  public readonly cause: unknown | undefined

  constructor(
    message: string | Iterable<string>,
    { description, solution, cause, data }: AbstractErrorOptions = {}
  ) {
    super(msg(message), { cause })
    this.description = description ? msg(description) : undefined
    this.solution = solution ? msg(solution) : undefined
    this.data = data
    this.cause = cause
  }

  toString() {
    const { message, description, solution, data } = this

    let msg = `${this.constructor.name}: ${message}`
    if (description) {
      msg += `\n\n${description}`
    }
    if (solution) {
      msg += `\n\n${solution}`
    }
    if (data) {
      msg += '(reference data available in error object for debugger)'
    }
    if (this.stack) {
      msg += `\n\n${this.stack}`
    }
    if (this.cause) {
      msg += `\n\nCaused by: ${this.cause}`
    }

    return msg
  }
}
