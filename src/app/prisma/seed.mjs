import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const projects = [
    {
      title: "Refactor checkout",
      description: "Mejorar la validacion de cupones y tiempos de respuesta.",
    },
    {
      title: "Dashboard analytics",
      description:
        "Construir panel con metricas de conversion y sesiones activas.",
    },
    {
      title: "Onboarding flow",
      description:
        "Reducir abandono del registro con una experiencia guiada en 3 pasos.",
    },
  ];

  await prisma.project.createMany({
    data: projects,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
