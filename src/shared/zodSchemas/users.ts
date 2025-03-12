// import { z } from "zod";
/* Não faz sentido essas validações aqui sendo que já tem nos schemas do DB */
// Você é fraco, por isso que não faz sentido, melhore 🌹🤠

// export const insertUserSchema = z.object({
//   name: z.string().min(1, { message: 'Nome é obrigatório' }),
//   username: z.string().optional(),
//   email: z.string().email({ message: 'E-mail inválido' }),
//   password: z.string().min(8, { message: 'Senha deve ter pelo menos 8 caracteres' }),
//   document: z.string().length(11, { message: 'CPF deve ter 11 dígitos' }),
//   phone: z.string().length(11, { message: 'Telefone deve ter 11 dígitos' }),
//   enterpriseId: z.string().uuid({ message: 'ID da empresa inválido' }),
// });

// export const selectUserSchema = z.object({
//   id: z.string().uuid({ message: 'ID do usuário inválido' }),
//   name: z.string(),
//   username: z.string().optional(),
//   email: z.string().email({ message: 'E-mail inválido' }),
//   document: z.string().length(11, { message: 'CPF deve ter 11 dígitos' }),
//   phone: z.string().length(11, { message: 'Telefone deve ter 11 dígitos' }),
//   enterpriseId: z.string().uuid({ message: 'ID da empresa inválido' }),
//   createdAt: z.date({ message: 'Data de criação inválida' }),
// });

