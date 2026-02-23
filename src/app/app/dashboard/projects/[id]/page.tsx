import { getProjectById } from "@/lib/projects";
import { Project } from "@prisma/client";

type ProjectDetailParams = Promise<{
  id: string;
}>;

type ProjectDetailSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function ProjectDetail(props: {
  params: ProjectDetailParams;
  searchParams: ProjectDetailSearchParams;
}) {
  const { id } = await props.params;
  const { searchParams } = await props.searchParams;

  console.log("ID del proyecto:", id);
  console.log("Search params:", searchParams);

  let project: Project | null = null;
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
    </div>
  );
}
