import { Hono } from 'hono'
import { ZodError } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { eq, pgPool, postgresClient } from '@/database/index.ts'
import { usersTable } from '@/database/schemas/users.ts'
import { insertUserSchema } from '../dto/types.ts'
import { sign } from 'hono/jwt'


export const auth = new Hono<{ Bindings: Bindings }>().basePath('/auth/v1')


auth.post(
  '/register',
  zValidator('json', insertUserSchema),
  async ctx => {
    /* Pog */
    const requestBody = ctx.req.valid('json')

    try {
      const client = new pgPool({
        connectionString: ctx.env.NODE_ENV === 'development' ? ctx.env.DATABASE_URL : ctx.env.SUPABASE_URL,
      })
      if (!client) return ctx.json({message: 'Erro ao instanciar a pool do DB'}, 401)

      const drizzle = postgresClient(client)
      if (!drizzle) return ctx.json({message: 'Erro ao instanciar client do DB'}, 401)
        
    // 1. Validar se possui email no DB
    // 2. validar se é poggers
    // 3. Inserir usuário no DB se for poggers
    // 4. Gerar payload do JWT, ihu
    // --> Maybe this is better? --> const UserSelectSchema = typeof usersTable.$inferSelect
    const searchEmail = await drizzle
                                .select()
                                .from(usersTable)
                                .where(eq(usersTable.email, requestBody.email))
                                .limit(1)
    if (searchEmail) return ctx.json({message: 'Email já cadastrado em nosso banco de dados!'}, 401)

    const insertedUser = await drizzle
                                .insert(usersTable)
                                .values(requestBody)
                                .returning()
    if (!insertedUser) return ctx.json({message: 'Não ta poggers inserimento insano de dados'}, 401)
 
    const token = await sign(insertedUser[0], ctx.env.SECRET)

    ctx.header("Authorization", `Bearer ${token}`)
    return ctx.json({message: "Registrado com sucesso!"}, 200) 


    /* not pog */
    /* Copiei de tu fds, arrumar essa parada ae*/
    } catch (errors) {
      if (errors instanceof ZodError) {
        const validationErrors = errors as ZodError<unknown>
        const objectErrors: Record<string, string> = {}

        for (const err of [validationErrors]) {
          if (!err.name) return

          objectErrors[String(err.name)] = err.message
        }

        return ctx.json({ errors: objectErrors }, 400)
      }

      console.error(errors)
      return ctx.json({ error: 'Internal Server Error' }, 500)
    }
  }
)

auth.post(
    '/login',
    zValidator('json', insertUserSchema.pick({email: true, password: true})),
    async ctx => {
        const requestBody = ctx.req.valid('json');
        
        try {
            // 1. Validar se request body ta poggers
            // 2. Verificar se existe email no DB
            // 3. Montar o token com o retorno do email no DB
            // 4. Vincular o token ao Bearer
            
            if (!requestBody) return ctx.json({message: "Dados não recebidos"}, 401)
            const client = new pgPool({
                connectionString: ctx.env.NODE_ENV === 'development' ? ctx.env.DATABASE_URL : ctx.env.SUPABASE_URL,
            })
            if (!client) return ctx.json({message: 'Erro ao instanciar a pool do DB'}, 401)

            const drizzle = postgresClient(client)
            if (!drizzle) return ctx.json({message: 'Erro ao instanciar client do DB'}, 401)
        
            const searchEmail = await drizzle
                                .select()
                                .from(usersTable)
                                .where(eq(usersTable.email, requestBody.email))
                                .limit(1)
            if (!searchEmail) return ctx.json({message: 'Email não encontrado no banco de dados'}, 401) 
            const token = sign(searchEmail[0], ctx.env.SECRET)

            ctx.header("Authorization", `Bearer ${token}`)
            return ctx.json({message: 'Usuário logado com sucesso!'}, 200)


        } catch(error) {
            console.error(error)
            return ctx.json({message: "Erro interno da aplicação"}, 500)
        }
    }

)
