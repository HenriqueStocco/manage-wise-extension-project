/* Cloudflare Bindings */
interface Bindings {
  SUPABASE_URL: string
  DATABASE_URL: string
  NODE_ENV: 'dev' | 'prod'
  JWT_SECRET: string
  HONO_PORT: number
}
