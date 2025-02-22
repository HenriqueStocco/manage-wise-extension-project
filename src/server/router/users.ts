import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z, ZodError, ZodErrorMap, ZodIssue, ZodIssueCode } from 'zod'

export const users = new Hono().basePath('/user')

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
            const pgClient = new Array({
                connectionString: ctx.env.DATABASE_URL,
            })
            const drizzle = drizzleDriver(pgClient)
        } catch (errors) {
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
