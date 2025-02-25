import { Hono } from 'hono'
import { z, ZodError } from 'zod'
import { zValidator } from '@hono/zod-validator'

import { pgPool, postgresClient } from '@/db/index.ts'
export const users = new Hono<{ Bindings: Bindings }>().basePath('/user')

users.post(
  '/create',
  zValidator(
    'json',
    z.object({
      username: z.string().min(4).max(150).nullable(),
      fullName: z.string().min(4).max(150),
      email: z.string().email().min(10).max(180),
      password: z.string().min(8).max(255),
      document: z.string().min(11).max(11),
      phone: z.string().min(11).max(11).nullable(),
    })
  ),
  async ctx => {
    const requestBody = ctx.req.valid('json')

    try {
      const client = new pgPool({
        connectionString: ctx.env.NODE_ENV === 'development' ? ctx.env.DATABASE_URL : ctx.env.SUPABASE_URL,
      })
      const drizzle = postgresClient(client)
      /* Continue */
    } catch (errors) {
      /* Código abaixo precisa ser refatorado/testado/ignorado */
      if (errors instanceof ZodError) {
        const validationErrors = errors as ZodError<unknown>
        const objectErrors: Record<string, string> = {}

        for (const err of [validationErrors]) {
          if (!err.name) return

          objectErrors[String(err.name)] = err.message
        }

        return ctx.json({ errors: objectErrors }, 400)
      }

      console.error(errors)

      return ctx.json({ error: 'Internal Server Error' }, 500)
    }
  }
)
