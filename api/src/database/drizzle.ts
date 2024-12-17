// import { neon } from "@neondatabase/serverless";
// import { drizzle } from 'drizzle-orm/neon-http'
import { Client } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from './schema'
import { env } from '../config/parse-env'

/**
 * Clientes de banco de dados para produção
 *
 * function postgresClient(connectionString: string) {
 *  const serverlessClient = neon(env.DATABASE_URL)
 *  return drizzle(serverlessClient, { schema })
 * }
 */

/* Cliente de banco de dados local */
const postgresClient = new Client(env.DATABASE_URL)
/**
 *  Cliente do drizzle-orm recebe a conexão via uma instância do cliente pg
 * Recebe todos os modelos de tabelas do banco de dados,
 * e habilita a impressão de consultas e inserções feitas no terminal
 */
const database = drizzle(postgresClient, { schema, logger: true })

export { schema, database }
export { and, eq, gte, lte, sql, gt, lt, count } from 'drizzle-orm'
