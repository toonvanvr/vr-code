import { CommandResult } from '../../actions/types.js'
import { Func } from '../func.js'

export interface ICreateFunc {
  createFunc(): CommandResult<{ func: Func }>
}
