import z from 'zod'
import process from 'node:process'

/* Usado apenas no desenvolvimento local */
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  HONO_PORT: z.coerce.number().int(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['dev', 'prod']),
})

export const env = envSchema.parse(process.env)
