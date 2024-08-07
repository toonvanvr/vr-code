export function cloneTemplate(
  id: `${string}-template`,
  alter?: (template: DocumentFragment) => void
): DocumentFragment {
  const { content } = document
    .getElementById(id)!
    .cloneNode(true) as HTMLTemplateElement

  alter?.(content)
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
