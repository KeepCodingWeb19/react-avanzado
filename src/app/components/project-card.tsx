interface ProjectCardProps {
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
    <article className="bg-gray-700 p-4 rounded mb-4">
      <h2 className="text-xl font-bold">{project.title}</h2>
      <p className="text-gray-300">{project.description}</p>
      <p className="text-sm text-gray-500 mt-2">
        Creado: {formatDate(project.createdAt)} | Actualizado:{" "}
        {formatDate(project.updatedAt)}
      </p>
    </article>
  );
}
