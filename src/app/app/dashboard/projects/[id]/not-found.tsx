import Link from "next/link";


export default function ProjectDetailNotFound() {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-2xl font-bold mb-2">Proyecto no encontrado</h2>
      <p className="text-sm text-muted-foreground mb-4">
        El proyecto con el ID proporcionado no existe.
      </p>
      <Link href="/dashboard" className="text-blue-500 hover:underline">
        Volver al listado de proyectos
      </Link>
    </div>
  );
}