import { Hono } from "hono";
import { pgClient, products } from "../database/drizzle";

export const product = new Hono<{ Bindings: CloudflareBindings }>();

product.get("/", async ctx => {
  try {
    const db = pgClient(ctx.env.NEON_DATABASE_URL)
    const products = await db.query.products.findMany()

    return ctx.json(products, 200);
  } catch (error) {
    console.error(error)
    ctx.json({ message: "Error retrieving products" }, 500);
  }
});

product.post("/", async ctx => {
  try {
    const db = pgClient(ctx.env.NEON_DATABASE_URL)
    const { productId, name, price, rating, stockQuantity } = await ctx.req.json();
    const [product] = await db.insert(products).values({
      productId,
      name,
      price,
      rating,
      stockQuantity,
    }).returning()

    return ctx.json(product, 201);
  } catch (error) {
    console.error(error)
    console.error(error)
    return ctx.json({ message: "Error creating product" }, 500);
  }
});