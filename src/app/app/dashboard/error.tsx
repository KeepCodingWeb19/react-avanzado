"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {


  useEffect(() => {
    console.error(`[${error.digest ?? 'dashboard/error'}] detalles:`, error);
  }, [error]);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-2xl font-bold mb-2">¡Algo salió mal!</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {error.message}
      </p>
      <div>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Intentar de nuevo
        </button>
        <Link href="/" className="text-blue-500 hover:underline">
          Volver a la página de inicio
        </Link>
      </div>
    </div>
  );
}