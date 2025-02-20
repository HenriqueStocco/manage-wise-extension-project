import { Hono } from "hono";
import { pgClient } from "../database/drizzle";
import { users } from "../database/schema";
import { sign } from "hono/jwt";

const change_me_secret = 'lol'

// Using binds but idk if its needed in that case
export const auth = new Hono<{ Bindings: CloudflareBindings }>();

auth.get("/register", async ctx => {
    try {
        const dbClient = pgClient(ctx.env.NEON_DATABASE_URL)
        const {userid, username, email} = await ctx.req.json();
        const user_payload = dbClient.insert(users).values({
            userId: userid,
            name: username,
            email: email
        }).returning({
            id: users.userId,
            email: users.email
        }) // need to see if we'll pass only this 2 values, lol

        const token = await sign(user_payload, change_me_secret) 
        return ctx.json(token, 201);
    } catch(error) {
        console.error(error)
        return ctx.json({ message: "Error registering user" }, 500);
    } // try catch = 🗑️
})
