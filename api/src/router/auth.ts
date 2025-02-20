import { Hono } from "hono";
import { pgClient } from "../database/drizzle";
import { users } from "../database/schema";
import { sign } from "hono/jwt";
import { eq } from "drizzle-orm";


// Using binds but idk if its needed in that case
export const auth = new Hono<{ Bindings: CloudflareBindings }>();

auth.post("/register", async ctx => {
    try {
        const dbClient = pgClient(ctx.env.NEON_DATABASE_URL)
        const {userid, username, email} = await ctx.req.json();
        const userPayload = dbClient.insert(users).values({
            userId: userid,
            name: username,
            email: email
        }).returning()

        const token = await sign(userPayload, ctx.env.SECRET) 
        return ctx.json(token, 201);
    } catch(error) {
        console.error(error)
        return ctx.json({ message: "Error registering user" }, 500);
    } // try catch = 🗑️
})

auth.get("/login", async ctx => {
    try {
        const dbClient = pgClient(ctx.env.NEON_DATABASE_URL)
        const {email} = await ctx.req.json();
        
        const userPayload = await dbClient.query.users.findFirst({
            where: eq(users.email, email)
        })

        if (!userPayload) return ctx.json({message: "User not registered"}, 404)

        const token = await sign(userPayload, ctx.env.SECRET)
        return ctx.json(token, 201)
    } catch(error) {
        console.error(error)
        return ctx.json({message: "Error login user"}, 500)
    }
})
