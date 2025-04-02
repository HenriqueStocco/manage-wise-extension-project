import { Hono } from 'hono'

export const app = new Hono<{ Bindings: Bindings }>().basePath('/api/v2')
