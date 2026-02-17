import { Project } from "@prisma/client";
import prisma from "./prisma";

export async function getProjects(): Promise<Project[]> {
  return prisma.project.findMany();
}
