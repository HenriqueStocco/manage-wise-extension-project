import { z } from 'zod'
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'

import { pgPool, postgresClient } from '@/db/index.ts'
import { enterprisesTable } from '@/db/schemas/enterprises.ts'
import { eq } from 'drizzle-orm'

export const enterprises = new Hono<{ Bindings: Bindings }>().basePath('/enterprises')

// Rota para criar uma empresa
enterprises.post(
    '/create',
    zValidator(
        'json',
        z.object({
            name: z.string().min(4),
            cnpj: z.string().min(14).max(14),
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
            const searchEnterpriseByEmail = await drizzle.query.enterprisesTable.findFirst({
                where: enterprisesTable => eq(enterprisesTable.cnpj, requestBody.cnpj),
            })

            if (searchEnterpriseByEmail) return ctx.json({ message: 'Enterprise already exist.' }, 402)

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

// Rota para deletar uma empresa por ID
enterprises.delete('delete/:id', async ctx => {
    const id = ctx.req.param('id')

    if (!id) return ctx.json({ message: 'Missing enterprise ID' }, 400)

    try {
        const client = new pgPool({
            connectionString: ctx.env.NODE_ENV === 'dev' ? ctx.env.DATABASE_URL : ctx.env.SUPABASE_URL,
        })
        const drizzle = postgresClient(client)
        const deletedEnterprise = await drizzle
            .delete(enterprisesTable)
            .where(eq(enterprisesTable.id, id))

        if (!deletedEnterprise) return ctx.json({ message: 'Enterprise not found' }, 404)

        return ctx.json({ message: 'Enterprise deleted successfully' }, 200)
    } catch (error) {
        console.error(error)
        return ctx.json({ message: 'Error deleting enterprise' }, 500)
    }
})

// Rota para atualizar uma empresa por ID
enterprises.put(
    '/:id',
    zValidator(
        'json',
        z.object({
            name: z.string().min(4).optional(),
            cnpj: z.string().optional(),
            phone: z.string().optional(),
        })
    ),
    async ctx => {
        const id = ctx.req.param('id')
        const requestBody = ctx.req.valid('json')

        if (!id) return ctx.json({ message: 'Missing enterprise ID' }, 400)

        if (!requestBody) return ctx.json({ message: 'Missing enterprise data for update' }, 400)

        try {
            const client = new pgPool({
                connectionString: ctx.env.NODE_ENV === 'dev' ? ctx.env.DATABASE_URL : ctx.env.SUPABASE_URL,
            })
            const drizzle = postgresClient(client)
            const updatedEnterprise = await drizzle
                .update(enterprisesTable)
                .set(requestBody)
                .where(eq(enterprisesTable.id, id))

            if (!updatedEnterprise) return ctx.json({ message: 'Enterprise not found' }, 404)

            return ctx.json({ message: 'Enterprise updated successfully' }, 200)
        } catch (error) {
            console.error(error)
            return ctx.json({ message: 'Error updating enterprise' }, 500)
        }
    }
)
