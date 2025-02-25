import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

const categoriesTable = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: varchar('name', { length: 200 }).notNull(),
  description: varchar('description'),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: false }).defaultNow().notNull(),
})

type CategoriesSelectSchema = typeof categoriesTable.$inferSelect
type CategoriesInsertSchema = Omit<typeof categoriesTable.$inferInsert, 'id' | 'created_at' | 'updated_at'>

export { categoriesTable, type CategoriesSelectSchema, type CategoriesInsertSchema }
