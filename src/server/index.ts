import { Hono } from 'hono'
import { users } from './router/users.ts'

export const app = new Hono<{ Bindings: Bindings }>().basePath('/api/v2')

app.route('/', users)
