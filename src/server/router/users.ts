import { z } from 'zod'
import { Hono } from 'hono'
import bcrypt from 'bcryptjs'
import { sign } from 'hono/jwt'
import { zValidator } from '@hono/zod-validator'

import { usersTable } from '@/db/schemas/index.ts'
import { eq, pgPool, postgresClient } from '@/db/index.ts'

export const users = new Hono<{ Bindings: Bindings }>().basePath('/user')

users.get('/', async ctx => {
    return ctx.json({ message: 'Hello there!!!' })
})

users.post(
    '/register',
    zValidator(
        'json',
        z.object({
            username: z.string().min(4).max(150).nullable(),
            name: z.string().min(4),
            fullName: z.string().min(4).max(150),
            email: z.string().email().min(10).max(180),
            password: z.string().min(8).max(255),
            document: z.string().min(11).max(11),
            phone: z.string().min(11).max(11).nullable(),
            enterpriseId: z.string().uuid(),
        })
    ),
    async ctx => {
        const requestBody = ctx.req.valid('json')

        if (!requestBody) return ctx.json({ message: 'Missing user data' }, 400)

        try {
            const client = new pgPool({
                connectionString: ctx.env.NODE_ENV === 'dev' ? ctx.env.DATABASE_URL : ctx.env.SUPABASE_URL,
            })
            const drizzle = postgresClient(client)
            const searchUserByEmail = await drizzle.query.usersTable.findFirst({
                where: usersTable => eq(usersTable.email, requestBody.email),
            })

            if (searchUserByEmail) return ctx.json({ message: 'User already exist.' }, 402)

            const hashedPassword = bcrypt.hashSync(requestBody.password, 10)
            const insertedUser = await drizzle.insert(usersTable).values({
                document: requestBody.document,
                email: requestBody.email,
                name: requestBody.name,
                password: hashedPassword,
                username: requestBody.username,
                phone: requestBody.phone,
                enterpriseId: requestBody.enterpriseId,
            })

            if (!insertedUser) return ctx.json({ message: '' }, 401)

            return ctx.json({ message: 'User created successfully' }, 201)
        } catch (errors) {
            console.error(errors)
            return ctx.json({ message: 'Problema interno ao registrar o usuário!' })
        }
    }
)

users.post(
    '/login',
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

        if (!requestBody) return ctx.json({ message: 'Missing user data' }, 401)

        try {
            const client = new pgPool({
                connectionString: ctx.env.NODE_ENV === 'dev' ? ctx.env.DATABASE_URL : ctx.env.SUPABASE_URL,
            })
            const drizzle = postgresClient(client)
            const searchUserByEmail = await drizzle.query.usersTable.findFirst({
                where: usersTable => eq(usersTable.email, requestBody.email),
            })

            if (!searchUserByEmail) return ctx.json({ message: 'User not exists' }, 401)

            const token = sign(
                {
                    id: searchUserByEmail.id,
                    name: searchUserByEmail.name,
                    email: searchUserByEmail.email,
                    enterpriseId: searchUserByEmail.enterpriseId,
                },
                ctx.env.JWT_SECRET,
                'RS512'
            )
            return ctx.json({ token }, 200)
        } catch (error) {
            console.error(error)
            return ctx.json({ message: 'Internal server error' }, 500)
        }
    }
)
