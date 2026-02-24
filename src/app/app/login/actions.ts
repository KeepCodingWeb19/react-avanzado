"use server";

import z from "zod";
import { LoginState } from "./types";
import { createSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.email("Email no es válido"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres")
});

function getFieldErrorsFromTree(
  error: z.ZodError<z.infer<typeof loginSchema>>,
): Record<string, string[]> {
  const tree = z.treeifyError(error);
  const fieldErrors: Record<string, string[]> = {};

  for (const [fieldName, node] of Object.entries(tree.properties ?? {})) {
    if (node?.errors.length) {
      fieldErrors[fieldName] = node.errors;
    }
  }

  return fieldErrors;
}

const MOCK_USERS = [
  { id: "123", email: "pepe@google.com", password: "1234" },
  { id: "124", email: "jose@google.com", password: "1234" },
]

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const emailInput = String(formData.get("email"));
  const passwordInput = String(formData.get("password"));

  const parsed = loginSchema.safeParse({
    email: emailInput,
    password: passwordInput
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Revisa los campos marcados",
      errors: getFieldErrorsFromTree(parsed.error),
      values: { email: emailInput } // Esto evita que se limpie el input en el formulario
    }
  }

  const email = parsed.data.email.toLowerCase();
  const password = parsed.data.password;

  // Simular llamada a la BBDD
  const user = MOCK_USERS.find(x => x.email === email && x.password === password);

  if (!user) {
    return {
      success: false,
      message: "Credenciales incorrectas",
      errors: {},
      values: { email: emailInput }
    }
  }

  await createSession(user.id);
  redirect("/dashboard")
}