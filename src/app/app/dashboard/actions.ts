"use server";

import { createProject } from "@/lib/projects";
import { revalidatePath } from "next/cache";

interface ProjectActionResult {
  success: boolean;
  message: string;
  requestId: number;
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
