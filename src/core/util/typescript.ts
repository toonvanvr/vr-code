export function assertExhausted(value: never): asserts value is never {
  console.error('switch/case statement exhausted:', value)
  throw new Error(`switch/case statement exhausted: ${value}`)
}
