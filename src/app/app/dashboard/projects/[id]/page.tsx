import OptimisticLikeButton from "@/components/buttons/optimistic-like-button";
import { getProjectById, getProjects } from "@/lib/projects";
import { ProjectDto } from "@/lib/projects.types";
import { Metadata } from "next";

export const dynamic = "force-static";

type ProjectDetailParams = Promise<{
  id: string;
}>;

// Se ejecuta en build time
export async function generateStaticParams() {
  const projects = await getProjects({ order: "asc" });

  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export async function generateMetadata(props: {
  params: ProjectDetailParams;
}): Promise<Metadata> {
  const { id } = await props.params;

  const project = await getProjectById(Number(id));

  return {
    title: project ? `Proyecto: ${project.title}` : "Proyecto no encontrado",
    description: project
      ? `Detalles del proyecto ${project.title}`
      : "No se encontró el proyecto",
  };
}

export default async function ProjectDetail(props: {
  params: ProjectDetailParams;
}) {
  const { id } = await props.params;

  console.log("ID del proyecto:", id);

  let project: ProjectDto | null = null;
  try {
    project = await getProjectById(Number(id));
  } catch {
    console.error(`[ProjectDetail] Error al obtener el proyecto con ID ${id}`);
  }

  if (!project) {
    return <p>Proyecto no encontrado</p>;
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">{project.title}</h2>
      <p>{project.description}</p>
      <div>
        <OptimisticLikeButton
          initialLikes={project.likes}
          projectId={project.id}
        />
      </div>
    </div>
  );
}
