export interface ApplicationErrorOptions {
  description?: string | Iterable<string>
  solution?: string | Iterable<string>
  data?: unknown
  cause?: unknown
}
