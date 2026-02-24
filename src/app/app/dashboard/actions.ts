"use server";

import { getSession } from "@/lib/auth";
import { createProject, deleteProject } from "@/lib/projects";
import { createProjectSchema } from "@/schemas/project.schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export interface ProjectActionResult {
  success: boolean;
  message: string;
  requestId: number;
  errors?: Record<string, string[]>;
}

export async function createProjectAction(
  _previousState: ProjectActionResult,
  formData: FormData,
): Promise<ProjectActionResult> {
  const title = String(formData.get("title")).trim();

  if (!title) {
    return {
      success: false,
      message: "El título del proyecto es obligatorio",
      requestId: Date.now(),
    };
  }

  try {
    const newProject = await createProject(title);
    console.log("Nuevo proyecto creado:", newProject);

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Proyecto creado exitosamente",
      requestId: Date.now(),
    };
  } catch {
    console.error("[createProjectAction] Error al crear el proyecto");
    return {
      success: false,
      message: "Error al crear el proyecto",
      requestId: Date.now(),
    };
  }
}

function getFieldErrorsFromTree(
  error: z.ZodError<z.infer<typeof createProjectSchema>>,
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

export async function createProjectOptimisticAction(
  _previousState: ProjectActionResult,
  formData: FormData,
): Promise<ProjectActionResult> {
  const validatedFields = createProjectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message:
        "Hay errores en el formulario. Por favor corrígelos e intenta de nuevo.",
      requestId: Date.now(),
      errors: getFieldErrorsFromTree(validatedFields.error),
    };
  }

  try {
    const newProjectData = validatedFields.data;
    const newProject = await createProject(
      newProjectData.title,
      newProjectData.description,
    );
    console.log("Nuevo proyecto creado:", newProject);

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Proyecto creado exitosamente",
      requestId: Date.now(),
    };
  } catch {
    console.error("[createProjectAction] Error al crear el proyecto");
    return {
      success: false,
      message: "Error al crear el proyecto",
      requestId: Date.now(),
    };
  }
}

export async function deleteProjectAction(formData: FormData) {
  const projectId = Number(formData.get("projectId"));

  // Verificar sesión
  const session = await getSession();

  if (!session) {
    throw new Error("Usuario no logueado")
  }

  // Verificar que pertenece al usuario
  const success = await deleteProject(projectId, session.userId);

  if (!success) {
    throw new Error("No tienes permisos para borrar el proyecto");
  }

  revalidatePath('/dashboard');
}