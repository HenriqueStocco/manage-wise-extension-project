import { Hono } from 'hono';
import { pgClient } from '../database/drizzle';

export const dashboard = new Hono<{ Bindings: CloudflareBindings }>();

dashboard.get("/", async ctx => {
  try {
    const db = pgClient(ctx.env.NEON_DATABASE_URL)
    const popularProducts = await
      db.query.products.findMany({
        limit: 15,
        orderBy: (products, { desc }) => [desc(products.stockQuantity)]
      });
    const salesSummary = await db.query.salesSummary.findMany({
      limit: 5,
      orderBy: (salesSummary, { desc }) => [desc(salesSummary.date)]
    });
    const purchaseSummary = await db.query.purchaseSummary.findMany({
      limit: 5,
      orderBy: (purchaseSummary, { desc }) => [desc(purchaseSummary.date)]
    });
    const expenseSummary = await db.query.expenseSummary.findMany({
      limit: 5,
      orderBy: (expenseSummary, { desc }) => [desc(expenseSummary.date)]
    });
    const expenseByCategorySummaryRaw = await db.query.expenseByCategory.findMany(
      {
        limit: 5,
        orderBy: (expenseByCategory, { desc }) => [desc(expenseByCategory.date)]
      }
    );
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
      (item) => ({
        ...item,
        amount: item.amount.toString(),
      })
    );

    return ctx.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    }, 200);
  } catch (error) {
    console.error(error)
    return ctx.json({ message: "Error retrieving dashboard metrics" }, 500);
  }
});