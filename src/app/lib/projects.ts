import { Project } from "@/prisma/generated/client/browser";
import prisma from "./prisma";

export async function getProjects(): Promise<Project[]> {
  return prisma.project.findMany();
}
