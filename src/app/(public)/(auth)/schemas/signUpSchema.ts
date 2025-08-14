import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().trim().min(1, "É necessário informar o nome!"),

    email: z
      .string()
      .trim()
      .min(1, "É necessário informar o email!")
      .pipe(z.email({ message: "O email deve ser válido" })),

    password: z
      .string()
      .trim()
      .min(6, "A senha precisa ter o mínimo de 6 caracteres"),

    confirmPassword: z
      .string()
      .trim()
      .min(1, "É necessário confirmar a senha!"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
