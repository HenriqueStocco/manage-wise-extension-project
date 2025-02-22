import z from 'zod'

const envSchema = z.object({
    HONO_PORT: z.number().int().min(4).max(4),
    DATABASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
