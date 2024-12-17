import { Hono } from 'hono'

const app = new Hono()

app.get('/', c => {
  return c.text('Hello Hono!')
})

/** Utilizar o próprio servidor do Bun para desenvolvimento local
 * Mas podemos utilizar o wrangler também para local(recomendado).
 */
export default {
  port: 3000,
  fetch: app.fetch,
}
