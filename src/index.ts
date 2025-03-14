import { env } from '@/config/env.ts'
import { app } from '@/server/index.ts'
import { serve } from '@hono/node-server'

/*
export default {
  fetch: app.fetch,
  port: env.HONO_PORT,
} */
serve({
  fetch: app.fetch,
  port: env.HONO_PORT,
})

console.log(`Server running in port ${env.HONO_PORT}`)
