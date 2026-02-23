"use client";

import { incrementProjectLikesAction } from "@/app/dashboard/projects/[id]/actions";
import { useOptimistic, useTransition } from "react";

type OptimisticLikeButtonProps = {
  initialLikes: number;
  projectId: number;
};

export default function OptimisticLikeButton({
  initialLikes,
  projectId,
}: OptimisticLikeButtonProps) {
  const [isPending, startTransition] = useTransition();

  const [optmisticLikes, addOptimisticLike] = useOptimistic(
    initialLikes,
    (state, incrementBy: number) => state + incrementBy,
  );

  function handleClick() {
    startTransition(async () => {
      addOptimisticLike(1);

      try {
        await incrementProjectLikesAction(projectId);
      } catch (error) {
        console.error("Error incrementando likes:", error);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="bg-red-300 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
    >
      `❤️ Me gusta ({optmisticLikes})
    </button>
  );
}
