import Link from "next/link";
import DeleteProjectButton from "./buttons/delete-project-button";
import Image from "next/image";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  userName: string | null;
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
      {project.imageUrl && (
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={100}
          height={100}
        />
      )}
      <article className="p-4 bg-gray-800 rounded mb-4">
        <h2 className="text-xl font-bold">{project.title}</h2>
        <p className="text-gray-300">{project.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          Owner: {project.userName ?? "N/A"} | Creado:{" "}
          {formatDate(project.createdAt)} | Actualizado:{" "}
          {formatDate(project.updatedAt)}
        </p>
      </article>
      <Link
        href={`/dashboard/projects/${project.id}`}
        className="text-blue-500 hover:underline ml-4"
      >
        Ver detalles
      </Link>
      <DeleteProjectButton projectId={project.id} />
    </div>
  );
}
