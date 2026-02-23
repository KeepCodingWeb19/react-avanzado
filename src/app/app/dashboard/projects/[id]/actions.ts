"use server";

import { incrementProjectLikes } from "@/lib/projects";
import { revalidatePath } from "next/cache";

export async function incrementProjectLikesAction(
  projectId: number,
): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const updatedLikes = await incrementProjectLikes(projectId);

  revalidatePath(`/dashboard/projects/${projectId}`);

  return updatedLikes;
}
