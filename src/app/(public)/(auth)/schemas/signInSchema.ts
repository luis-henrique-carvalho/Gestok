import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "É necessário informar o email!")
    .trim()
    .pipe(z.email({ message: "O email deve ser válido" })),
  password: z
    .string()
    .trim()
    .min(6, "A senha precisa ter o mínimo de 6 caracteres"),
});

export type SignInFormData = z.infer<typeof signInSchema>;
