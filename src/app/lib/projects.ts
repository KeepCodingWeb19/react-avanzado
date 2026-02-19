import { Project } from "@/prisma/generated/client/browser";
import prisma from "./prisma";

export async function getProjects(): Promise<Project[]> {
  return prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createProject(title: string): Promise<Project> {
  return prisma.project.create({
    data: {
      title,
      description: "autogenerado",
    },
  });
}
