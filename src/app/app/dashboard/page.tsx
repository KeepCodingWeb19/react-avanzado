import ProjectForm from "@/components/forms/project-form";
import ProjectCard from "@/components/project-card";
import { getProjects } from "@/lib/projects";
import Link from "next/link";

// export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const projects = await getProjects();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>
        Bienvenido al dashboard. Si ves esto, es porque tienes la cookie de
        autenticación.
      </p>

      <Link href="/dashboard/form" className="text-blue-500 hover:underline">
        Ir al formulario prueba
      </Link>

      <ProjectForm />

      <div className="mt-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            createdAt={project.createdAt}
            updatedAt={project.updatedAt}
          />
        ))}
      </div>
    </div>
  );
}
