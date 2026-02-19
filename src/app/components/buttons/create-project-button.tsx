"use client";

import { useFormStatus } from "react-dom";

export default function CreateProjectButton() {
  // Es mejor pasar isPending como prop y manejar el estado con useActionState desde fuera
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      disabled={pending}
    >
      {pending ? "Creando proyecto..." : "Crear Proyecto"}
    </button>
  );
}
