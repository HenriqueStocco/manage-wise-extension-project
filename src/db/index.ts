import { Pool, Client } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { sql, eq, and, or, like, not, desc, asc, sum } from 'drizzle-orm'

import * as schema from './schemas/index.ts'

const postgresClient = (client: Pool | Client) => {
  return drizzle(client, { schema })
}

export {
  Pool as pgPool,
  Client as pgClient,
  type Client,
  type Pool,
  postgresClient,
  sql,
  eq,
  and,
  or,
  like,
  not,
  desc,
  asc,
  sum,
  schema,
}
