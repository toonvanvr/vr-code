import { initTRPC } from '@trpc/server'
import {
  CreateHTTPContextOptions,
  createHTTPServer,
} from '@trpc/server/adapters/standalone'
import { z } from 'zod'
import { Module } from './model/module.model'
function createContext(opts: CreateHTTPContextOptions) {
  return {}
}
type Context = Awaited<ReturnType<typeof createContext>>
const t = initTRPC.context<Context>().create()

let appModule: Module

const appRouter = t.router({
  createModule: t.procedure
    .input(
      z.object({
        symbol: z.string(),
      })
    )
    .query(({ input: { symbol } }) => {
      appModule = new Module({ symbol })
    }),
})

// Export the app router type to be imported on the client side
export type AppRouter = typeof appRouter

// Create HTTP server
const { listen } = createHTTPServer({
  router: appRouter,
  createContext,
})
