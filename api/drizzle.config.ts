import { defineConfig } from 'drizzle-kit'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  out: './src/database/migrations',
  dialect: 'postgresql',
  schema: './src/database/schema.ts',
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL as string
  }
})