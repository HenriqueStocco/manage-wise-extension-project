import { Hono } from 'hono'

import { jwt } from 'hono/jwt'

import { users } from './router/users'
import { dashboard } from './router/dashboard'
import { expenses } from './router/expenses'
import { product } from './router/products'

const app = new Hono<{ Bindings: CloudflareBindings }>()
const authMiddleware = jwt({secret: 'lol'}) // <-- mudar isso plmds

// Função para adicionar os cabeçalhos de CORS
function setCorsHeaders(res: Response) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT");
  res.headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.headers.set("Access-Control-Max-Age", "86400");
  res.headers.set("Content-Type", "application/json");
}

/* Middlewares */
app.use('/dashboard/*', authMiddleware)
app.use('/expenses/*', authMiddleware)
app.use('/products/*', authMiddleware)

/* Routes */
app.route('/users', users)
app.route('/dashboard', dashboard)
app.route('/expenses', expenses)
app.route('/products', product)

export default {
  async fetch(request: Request, env: CloudflareBindings, ctx: ExecutionContext) {
    if (request.method === "OPTIONS") {
      // Responder às requisições OPTIONS (preflight)
      const response = new Response(null, { status: 204 });
      setCorsHeaders(response);
      return response;
    }

    // Processa a requisição normal
    const response = await app.fetch(request, env, ctx);

    // Adiciona cabeçalhos CORS na resposta final
    setCorsHeaders(response);
    return response;
  },
}
