import { Func } from '../func.js'

export interface ICreateFunc {
  createFunction(...args: any[]): Func
}
