import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { enterprisesTable as enterprises } from './enterprises.ts'

const usersTable = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: varchar('name', { length: 150 }).notNull(),
    username: varchar('username', { length: 150 }),
    email: varchar('email', { length: 200 }).notNull().unique(),
    password: varchar('password').notNull(),
    document: varchar('document', { length: 11 }).notNull().unique(),
    phone: varchar('phone', { length: 11 }),
    enterpriseId: uuid('enterprise_id')
        .references(() => enterprises.id)
        .notNull(),
    createdAt: timestamp('created_at', { withTimezone: false, mode: 'string' })
        .defaultNow()
        .notNull(),
})

type UsersSelectSchema = typeof usersTable.$inferSelect
type UsersInsertSchema = Omit<
    typeof usersTable.$inferInsert,
    'createdAt' | 'id'
>

export { usersTable, type UsersInsertSchema, type UsersSelectSchema }
