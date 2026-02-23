import { Project } from "@/prisma/generated/client/browser";
import prisma from "./prisma";
import { ProjectDto } from "./projects.types";

interface ProjectFilter {
  order: "asc" | "desc";
}

export async function getProjects({
  order,
}: ProjectFilter): Promise<Project[]> {
  console.log(`[getProjects] Obteniendo proyectos con orden: ${order}`);

  return prisma.project.findMany({
    orderBy: {
      createdAt: order,
    },
  });
}

export async function getProjectById(id: number): Promise<ProjectDto | null> {
  return prisma.project.findUnique({
    where: {
      id,
    },
  });
}

export async function createProject(
  title: string,
  description?: string,
): Promise<Project> {
  return prisma.project.create({
    data: {
      title,
      description: description || "autogenerado",
    },
  });
}

export async function incrementProjectLikes(
  projectId: number,
): Promise<number> {
  const updated = await prisma.project.update({
    where: { id: projectId },
    data: {
      likes: {
        increment: 1,
      },
    },
    select: {
      likes: true,
    },
  });

  return updated.likes;
}
