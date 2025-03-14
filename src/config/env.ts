import z from 'zod'
import process from 'node:process'
// import { Env, ExecutionContext } from 'hono'

/* Usado apenas no desenvolvimento local */
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  HONO_PORT: z.coerce.number().int(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['dev', 'prod']),
})

/* fetching variables with wrangler 
async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
): Promise<Response> {
    console.log(env.Variables)
}
*/

export const env = envSchema.parse(process.env)
