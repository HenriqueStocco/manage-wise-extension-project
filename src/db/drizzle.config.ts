import { env } from '@/config/env.ts'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './migrations',
  schema: './schemas',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  casing: 'snake_case',
  entities: {
    roles: {
      provider: 'supabase',
    },
  },
})
