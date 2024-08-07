export function cloneTemplate<SelectorMap extends Record<string, string>>(
  id: `${string}-template`,
  children: SelectorMap = {} as SelectorMap,
  alter?: (
    elements: Record<keyof SelectorMap, HTMLElement>,
    document: DocumentFragment
  ) => void
): DocumentFragment {
  const { content } = document
    .getElementById(id)!
    .cloneNode(true) as HTMLTemplateElement

  alter?.(getChildren(content, children), content)
  return content
}

export function getChildren<SelectorMap extends Record<string, string>>(
  parent: ParentNode,
  children: SelectorMap
): Record<keyof SelectorMap, HTMLElement> {
  return Object.fromEntries(
    Object.entries(children).map(([name, selector]) => [
      name,
      parent.querySelector(selector),
    ])
  ) as Record<keyof SelectorMap, HTMLElement>
}
