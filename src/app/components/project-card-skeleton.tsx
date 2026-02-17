export default function ProjectCardSkeleton() {
  return (
    <article className="p-4 rounded mb-4">
      {/* Título del proyecto */}
      <div className="h-6 w-2/3 animate-pulse bg-gray-200 dark:bg-gray-700" />

      {/* Descripción del proyecto */}
      <div className="mt-3 h-4 w-full animate-pulse bg-gray-200 dark:bg-gray-700" />

      {/* Fecha del proyecto */}
      <div className="mt-2 w-1/3 animate-pulse bg-gray-200 dark:bg-gray-700" />
    </article>
  );
}
