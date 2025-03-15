import { Hono } from 'hono'
import { users } from './router/users.ts'
import { enterprises } from './router/enterprises.ts'

export const app = new Hono<{ Bindings: Bindings }>().basePath('/api/v2')

app.route('/', users)
app.route('/', enterprises)
