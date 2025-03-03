import type { Context, Next } from "hono"
import { verify } from "hono/jwt"

export const authMiddleware = async (ctx: Context, next: Next) => {
    const authHeader = ctx.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return ctx.json({message: "Unauthorized"}, 401)
    } 

    try {
        const token = authHeader.split(' ')[1]
        const payload = await verify(token, ctx.env.SECRET)

        ctx.set('user', payload) // Setando o user no contexto geral pra uso
        await next()
    } catch(error) {
        console.error(error)
        return ctx.json({message: "Invalid Token"}, 401)
    }
}

/* Example of Use */
/* app.use('<route>', authMiddleware) */ 
