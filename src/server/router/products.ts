import { pgPool, postgresClient } from '@/db/index.ts'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

const productRouter = new Hono<{ Bindings: Bindings }>().basePath('/products')

productRouter.get('/list', async ctx => {
  return ctx.json({ message: 'HEY' })
})

productRouter.post(
  '/create',
  zValidator(
    'json',
    z.object({
      name: z.string().max(200),
      description: z.string().max(200).nullable(),
      assetCode: z.number().int(),
      quantity: z.number().int(),
      sector: z.string().max(120).nullable(),
      imageName: z.string().max(150).nullable(),
      imageType: z.string().max(50).nullable(),
      categoryId: z.string().uuid(),
    })
  ),
  async ctx => {
    const requestBody = ctx.req.valid('json')
    if (!requestBody) return ctx.json({ message: 'Faltando dados do produto' }, 400)
    try {
      const client = new pgPool({
        connectionString: ctx.env.NODE_ENV === 'dev' ? ctx.env.DATABASE_URL : ctx.env.SUPABASE_URL,
      })
      const drizzle = postgresClient(client)

      return ctx.json({ message: 'Produto criado com sucesso' }, 201)
    } catch (err) {
      console.error(err)
      return ctx.json({ message: 'Erro ao registrar produto' }, 500)
    }
  }
)
