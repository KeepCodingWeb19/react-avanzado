import ProjectOptimisticForm from "@/components/forms/project-optimistic-form";
import ProjectCard from "@/components/project-card";
import { getProjects } from "@/lib/projects";
import { Metadata } from "next";
import Link from "next/link";

// export const dynamic = "force-dynamic";

type SearchParamValue = string | string[] | undefined;

type DashboardPageSearchParams = Promise<Record<string, SearchParamValue>>;

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard de proyectos",
};

export default async function DashboardPage(props: {
  searchParams: DashboardPageSearchParams;
}) {
  const searchParams = await props.searchParams;

  console.log("Search params:", searchParams);

  const order = searchParams.order === "desc" ? "desc" : "asc";

  const projects = await getProjects({ order });

  return (
    <div className="w-2/3">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>
        Bienvenido al dashboard. Si ves esto, es porque tienes la cookie de
        autenticación.
      </p>

      <Link href="/dashboard/form" className="text-blue-500 hover:underline">
        Ir al formulario prueba
      </Link>

      <ProjectOptimisticForm />

      <div className="mt-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            userName={project.userId}
            createdAt={project.createdAt}
            updatedAt={project.updatedAt}
          />
        ))}
      </div>
    </div>
  );
}
