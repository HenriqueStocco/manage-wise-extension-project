import { z } from 'zod'
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'

import { pgPool, postgresClient } from '@/db/index.ts'
import { enterprisesTable } from '@/db/schemas/enterprises.ts'

export const enterprises = new Hono<{ Bindings: Bindings }>().basePath('/enterprises')

enterprises.post(
  '/create',
  zValidator(
    'json',
    z.object({
      name: z.string().min(4),
      cnpj: z.string(),
      phone: z.string(),
    })
  ),
  async ctx => {
    const requestBody = ctx.req.valid('json')

    if (!requestBody) return ctx.json({ message: 'Missing enterprise data' }, 400)

    try {
      const client = new pgPool({
        connectionString: ctx.env.NODE_ENV === 'dev' ? ctx.env.DATABASE_URL : ctx.env.SUPABASE_URL,
      })
      const drizzle = postgresClient(client)
      const searchUserByEmail = await drizzle.query.enterprisesTable.findFirst({
        where: (enterprisesTable, { eq }) => eq(enterprisesTable.cnpj, requestBody.cnpj),
      })

      if (searchUserByEmail) return ctx.json({ message: 'Enterprise already exist.' }, 402)

      const insertedEnterprise = await drizzle.insert(enterprisesTable).values({
        name: requestBody.name,
        cnpj: requestBody.cnpj,
        phone: requestBody.phone,
      })

      if (!insertedEnterprise) return ctx.json({ message: '' }, 401)

      return ctx.json({ message: 'Enterprise created successfully' }, 201)
    } catch (errors) {
      console.error(errors)
      return ctx.json({ message: 'Error creating enterprise' })
    }
  }
)
