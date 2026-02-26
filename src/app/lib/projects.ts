import { Project } from "@/prisma/generated/client/browser";
import prisma from "./prisma";
import { ProjectDto, ProjectsResultDto } from "./projects.types";

interface ProjectFilter {
  query: string;
  order: "asc" | "desc";
  page: number;
  pageSize: number;
}

function getWhereClause(query: string) {
  if (!query) {
    return {};
  }

  return {
    title: {
      contains: query,
      mode: "insensitive" as const,
    },
  };
}

export async function getProjects({
  query,
  order,
  page,
  pageSize,
}: ProjectFilter): Promise<ProjectsResultDto> {
  const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
  const safePageSize = Number.isNaN(pageSize) || pageSize < 1 ? 5 : pageSize;

  const whereClause = getWhereClause(query);
  const totalProjects = await prisma.project.count({ where: whereClause });
  const totalPages = Math.max(1, Math.ceil(totalProjects / safePageSize));

  const currentPage = Math.min(safePage, totalPages);

  const items = await prisma.project.findMany({
    where: whereClause,
    skip: (currentPage - 1) * safePageSize,
    take: safePageSize,
    orderBy: {
      createdAt: order,
    },
  });

  return {
    items,
    totalCount: totalProjects,
    totalPages,
    currentPage,
  };
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

export async function deleteProject(
  projectId: number,
  userId: string,
): Promise<boolean> {
  const projectDb = await prisma.project.findUnique({
    where: { id: projectId, userId: userId },
    select: { id: true },
  });

  if (!projectDb) {
    return false;
  }

  await prisma.project.delete({ where: { id: projectDb.id } });

  return true;
}
