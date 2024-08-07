import { Action } from '../actions/action.js'
import { cloneTemplate } from '../util/ui.js'

export function listActions(actions: Action<any>[]) {
  const actionList = document.querySelector('.action-list') as HTMLDivElement

  for (const action of actions) {
    const clone = cloneTemplate(
      'action-template',
      {
        name: '.action-name',
        description: '.action-description',
        keyBinds: '.action-keybinds',
      },
      ({ name, description, keyBinds }) => {
        name.innerHTML = action.name
        description.innerHTML = action.description

        for (const { key } of action.keyBinds) {
          keyBinds.append(
            cloneTemplate(
              'action-keybind-template',
              { keyBind: '.action-keybind' },
              ({ keyBind }) => {
                keyBind.innerText = key
              }
            )
          )
        }
      }
    )
    actionList.append(clone)
  }
}
