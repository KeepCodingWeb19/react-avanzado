import Link from "next/link";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    minute: "2-digit",
    hour: "2-digit",
  });
}

export default function ProjectCard(project: ProjectCardProps) {
  return (
    <div className="flex items-start">
      <article className="p-4 bg-gray-800 rounded mb-4">
        <h2 className="text-xl font-bold">{project.title}</h2>
        <p className="text-gray-300">{project.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          Creado: {formatDate(project.createdAt)} | Actualizado:{" "}
          {formatDate(project.updatedAt)}
        </p>
      </article>
      <Link
        href={`/dashboard/projects/${project.id}`}
        className="text-blue-500 hover:underline ml-4"
      >
        Ver detalles
      </Link>
    </div>
  );
}
