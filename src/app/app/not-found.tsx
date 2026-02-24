import Link from "next/link";

export default function NotFound() {

  return (

    <div className="p-4 border rounded">
      <h2 className="text-2xl font-bold mb-2">Página no encontrada</h2>
      <p className="text-sm text-muted-foreground mb-4">
        No existe la página que estás buscando.
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Volver a la página de inicio
      </Link>
    </div>
  );
}