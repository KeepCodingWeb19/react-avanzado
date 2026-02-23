import { Project } from "@/prisma/generated/client/browser";
import prisma from "./prisma";

export async function getProjects(): Promise<Project[]> {
  return prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProjectById(id: number): Promise<Project | null> {
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
