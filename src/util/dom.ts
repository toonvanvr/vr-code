export function getDomPath(node: Node) {
  return [...iterateDomPath(node)]
}

export function* iterateDomPath(node: Node | null | undefined) {
  while (node) {
    yield node
    node = node.parentNode
  }
}
