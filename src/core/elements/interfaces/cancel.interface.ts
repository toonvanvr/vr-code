import { Commandable } from '../../actions/types.js'

export interface ICancel {
  cancel(): { focus?: Commandable<any> }
}
