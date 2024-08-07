import { globalActions } from './core/actions/global-actions.js'
import { KeyboardController } from './core/controllers/keyboard.controller.js'
import { Scope } from './core/elements/scope.js'
import { listActions } from './core/ui/list-actions.js'

const root = new Scope()
const controller = new KeyboardController({ target: root })

listActions(Object.values(globalActions))
