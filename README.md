# Especificações da API

### Rotas

```
POST /api/v1/login
POST /api/v1/admin/user/craete
POST /api/v1/admin/enterprise/create
POST /api/v1/product/create

GET /api/v1/product/list  -> list all
GET /api/v1/product/list/ -> list by category

PUT /api/v1/product/:id

DELETE /api/v1/product/:id
```

#### Sobre as rotas

- Cada novo usuario estara vinculado apenas a uma empresa.
- Os produtos são vinculados a uma empresa e vinculado ao usuario que o criou.
- A empresa não tem vinculo ao ser criada, mas um usuario precisa ser vinculado a uma empresa.
- Admin(dev) cria o primeiro(ou de outros usuarios "principais" e a empresa de tal) e este usuario cria o resto.
- Somente o dev cria a empresa e o primeiro usuario da empresa.


### Stack

- Node.js
- Hono
- Drizzle-ORM | Kit
- Zod
- PNPM
- TypeScript
- @hono/jwt
- @hono/cors
- @hono/swagger-ui
- PostgreSQL
- Wrangler


### Services

- Cloudflare Workers
- R2 Bucket
- Neon Serverless Postgres Database
