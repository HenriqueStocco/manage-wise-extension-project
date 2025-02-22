import { Hono } from "hono";
import { pgClient } from "../database/drizzle";

export const expenses = new Hono<{ Bindings: CloudflareBindings }>();

expenses.get("/", async ctx => {
  try {
    const db = pgClient(ctx.env.NEON_DATABASE_URL)
    const expenseByCategorySummaryRaw = await db.query.expenseByCategory.findMany(
      {
        orderBy: (expenseByCategory, { desc }) => [desc(expenseByCategory.date)]
      }
    );
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
      (item) => ({
        ...item,
        amount: item.amount.toString(),
      })
    );

    return ctx.json(expenseByCategorySummary, 200);
  } catch (error) {
    console.error(error)
    return ctx.json({ message: "Error retrieving expenses by category" }, 500);
  }
});