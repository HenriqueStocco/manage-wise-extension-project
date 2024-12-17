import z from 'zod'

/**
 * Arquivo dedicado a definir a "FORMA" das permissões,
 *
 * Exmplo de permissões de usuário
 * Não utilizarei (por enquanto), mas manterei o código,
 * caso haja uma mudança no pensameto.
 */

/** Esquema de permissões que cada usuário PODE ter
 *
 * Usuário pode CRIAR | VER outros usuários?
 *  >>> SIM = true; NÃO = false
 *
 * Usuário pode CRIAR | VER | ATUALIZAR produtos?
 * >>> SIM = true; NÃO = false
 */
export const permissionsSchema = z.object({
  users: z.object({
    create: z.boolean(),
    read: z.boolean(),
  }),

  products: z.object({
    create: z.boolean(),
    read: z.boolean(),
    update: z.boolean(),
  }),
})

/**
 * Definição de permissões padrão
 * Cada usuário que for criado no sistema, se não tiver uma alteração
 * manual de suas permissões, serão definidos com essas permissões.
 *
 * A única permissão que não darei a todos por padrão será a de criação.
 * IT'S SO DANGEROUS.
 */
export const permissionsDefault: Permissions = {
  users: {
    create: false,
    read: true,
  },
  products: {
    create: true,
    read: true,
    update: true,
  },
}

/* Exportação do RETORNO dos tipos do squema de permissões,
 * isso para manter o 'parse' e o 'typing' em tempo de compilação, por isso estou utilizando o zod.
 */
export type Permissions = z.infer<typeof permissionsSchema>
