import { z } from 'zod'

/**
 * Schema para verificação de tipo e existência de variáveis de ambiente
 * É um arquivo temporário, tendo em vista que em produção usaremos os Bindings dos
 * Cloudflare Workers. Mas fica para o desenvolvimento, mantendo as boas práticas,
 * mesmo que local.
 */
const envSchema = z.object({
  DATABASE_URL: z.string().url().min(1),
})
/* Verifica se está de acordo com o schema de tipo acima e se existe.
 * No caso de estar incorreto, não deixa eu utilizar as variáveis de ambiente.
 */
export const env = envSchema.parse(process.env)
