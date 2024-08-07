import { Action } from '../actions/action.js'
import { cloneTemplate, getChildren } from '../util/ui.js'

export function listActions(actions: Action<any>[]) {
  const actionList = document.querySelector('.action-list') as HTMLDivElement

  for (const action of actions) {
    const clone = cloneTemplate('action-template', (container) => {
      const el = getChildren(container, {
        name: '.action-name',
        description: '.action-description',
        keybinds: '.action-keybinds',
      })

      el.name.innerHTML = action.name
      el.description.innerHTML = action.description

      for (const keybind of action.keyBinds) {
        el.keybinds.append(cloneTemplate('action-keybind-template'))
      }
    })
    actionList.append(clone)
  }
}
