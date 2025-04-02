import { integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { categoriesTable as categories } from './categories.ts'

const productsTable = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: varchar('name', { length: 200 }).notNull(),
  description: varchar('description'),
  assetCode: integer('asset_code').notNull(),
  quantity: integer('quantity').notNull(),
  sector: varchar('sector', { length: 120 }),
  imageName: varchar('image_name', { length: 150 }),
  imageType: varchar('image_type', { length: 50 }),
  categoryId: uuid('category_id').references(() => categories.id),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: false })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: false })
    .defaultNow()
    .notNull(),
})

type ProductsSelectSchema = typeof productsTable.$inferSelect
type ProductsInsertSchema = Omit<
  typeof productsTable.$inferInsert,
  'id' | 'created_at' | 'updated_at'
>

export { productsTable, type ProductsSelectSchema, type ProductsInsertSchema }
