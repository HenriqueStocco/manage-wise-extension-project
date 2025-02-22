import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import dotenv from 'dotenv'
import * as schema from './schema'

dotenv.config();

export const pgClient = (client: string) => {
  const neonClient = neon(client)
  return drizzle(neonClient, { schema });
}

export { schema }
export { products } from './schema';



