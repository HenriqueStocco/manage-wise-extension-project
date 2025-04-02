import z from 'zod'

/* Usado apenas no desenvolvimento local */
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  HONO_PORT: z.number().int().min(4).max(4),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['dev', 'prod']),
})

export const env = envSchema.parse(process.env)
