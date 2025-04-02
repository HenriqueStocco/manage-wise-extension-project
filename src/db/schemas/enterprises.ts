import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

const enterprisesTable = pgTable('enterprises', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: varchar('name', { length: 200 }).notNull(),
  cnpj: varchar('document', { length: 14 }).notNull().unique(),
  phone: varchar('phone', { length: 11 }),
  createdAt: timestamp('created_at', { withTimezone: false, mode: 'string' })
    .defaultNow()
    .notNull(),
})

type EnteprisesSelectSchema = typeof enterprisesTable.$inferSelect
type EnterprisesInsertSchema = Omit<typeof enterprisesTable.$inferInsert, 'createdAt' | 'id'>

export { enterprisesTable, type EnterprisesInsertSchema, type EnteprisesSelectSchema }
