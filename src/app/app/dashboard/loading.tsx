import ProjectCardSkeleton from "@/components/project-card-skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <section>
        <div className="h-8 w-1/3 animate-pulse bg-gray-200 dark:bg-gray-700" />
        <div className="mt-2 h-4 w-full animate-pulse bg-gray-200 dark:bg-gray-700" />
      </section>

      <div className="mt-6">
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </div>
    </div>
  );
}
