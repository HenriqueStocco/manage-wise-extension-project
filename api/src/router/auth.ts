import { Hono } from "hono";
import { pgClient } from "../database/drizzle";
import { users } from "../database/schema";
import { sign } from "hono/jwt";
import { eq } from "drizzle-orm";

const change_me_secret = 'lol'

// Using binds but idk if its needed in that case
export const auth = new Hono<{ Bindings: CloudflareBindings }>();

auth.post("/register", async ctx => {
    try {
        const dbClient = pgClient(ctx.env.NEON_DATABASE_URL)
        const {userid, username, email} = await ctx.req.json();
        const user_payload = dbClient.insert(users).values({
            userId: userid,
            name: username,
            email: email
        }).returning()

        const token = await sign(user_payload, change_me_secret) 
        return ctx.json(token, 201);
    } catch(error) {
        console.error(error)
        return ctx.json({ message: "Error registering user" }, 500);
    } // try catch = 🗑️
})

auth.get("/login", async ctx => {
    try {
        const dbClient = pgClient(ctx.env.NEON_DATABASE_URL)
        const {username, email} = await ctx.req.json();
        
        const user_payload = await dbClient.query.users.findFirst({
            where: eq(users.email, email)
        })

        if (!user_payload) return ctx.json({message: "User not registered"}, 404)

        const token = await sign(user_payload, change_me_secret)
        return ctx.json(token, 201)
    } catch(error) {
    }
})
