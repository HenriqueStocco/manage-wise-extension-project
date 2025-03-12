import { Hono } from 'hono'

const productRouter = new Hono<{ Bindings: Bindings }>().basePath('/products')

productRouter.get('/list', async ctx => {
  return ctx.json({ message: 'HEY' })
})
