import DashboardFilters from "@/components/forms/dashboard-filters";
import ProjectOptimisticForm from "@/components/forms/project-optimistic-form";
import Pagination from "@/components/pagination";
import ProjectCard from "@/components/project-card";
import { getProjects } from "@/lib/projects";
import { Metadata } from "next";
import Link from "next/link";

const PAGE_SIZE = 5;

// export const dynamic = "force-dynamic";

type SearchParamValue = string | string[] | undefined;

type DashboardPageSearchParams = Promise<Record<string, SearchParamValue>>;

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard de proyectos",
};

function getSingleSearchParam(value: SearchParamValue) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default async function DashboardPage(props: {
  searchParams: DashboardPageSearchParams;
}) {
  const searchParams = await props.searchParams;

  const query = getSingleSearchParam(searchParams.query) as string;
  const order = getSingleSearchParam(searchParams.order) as "asc" | "desc";
  const page = Number(getSingleSearchParam(searchParams.page));

  console.log("Search params:", searchParams);

  const {
    items: projects,
    totalPages,
    currentPage,
  } = await getProjects({
    query,
    order,
    page,
    pageSize: PAGE_SIZE,
  });

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

      <DashboardFilters initialQuery={query} initialOrder={order} />

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
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
