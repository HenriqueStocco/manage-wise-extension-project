import { Hono } from "hono";
import { pgClient } from "../database/drizzle";

export const users = new Hono<{ Bindings: CloudflareBindings }>();

users.get("/", async ctx => {
  try {
    const db = pgClient(ctx.env.NEON_DATABASE_URL)
    const users = await db.query.users.findMany()

    return ctx.json(users, 200);
  } catch (error) {
    console.error(error)
    console.error(error)
    return ctx.json({ message: "Error retrieving users" }, 500);
  }
});