import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
/*
 * Importação das permissões (não utilizado)
 * import { permissionsDefault, type Permissions } from './permissions'
 */

/** Tabela de criação de usuários.
 * Pensei em utilizar permissões para limitar acesso de cada funcionário de uma empresa,
 * mas ficaria complexo demais de inserir/alterar elas no cliente,
 * e eu sou preguiçoso. Mas abaixo mantive um exemplo de como poderiamos fazer isso.
 * Poupem me do trabalho, tenho bastante já.
 */
export const users = pgTable('users', {
  id: uuid('id').primaryKey().notNull().unique(),
  name: varchar('name', { length: 150 }).notNull(),
  email: varchar('email', { length: 180 }).notNull(),
  password: varchar('hashed_password', { length: 255 }).notNull(),
  cpf: varchar('cpf', { length: 11 }),
  companyId: uuid('company_id').references(() => enterprises.id),
  // permissions: jsonb('permissions').$type<Permissions>().default(permissionsDefault).notNull(),
  createdAt: timestamp('created_at', { withTimezone: false, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: false }).defaultNow().notNull(),
})

/* Tabela de cadastro de empresas,
 * procurei ser o mais simples possivel para evitar a complexidade nas inserções,
 * mantendo apenas o essencial.
 * Aqui poderiamos adicionar um vinculo a uma tabela de endereços e
 * um código de acesso para cada empresa (apenas para evitar a digitção constante do cnpj da mesma).
 */
export const enterprises = pgTable('enterprises', {
  id: uuid('id').primaryKey().unique().notNull(),
  name: varchar('name', { length: 200 }).notNull(),
  cnpj: varchar('cnpj', { length: 14 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: false, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: false }).defaultNow().notNull(),
})