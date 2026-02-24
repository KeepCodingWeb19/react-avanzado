'use client'
import { useEffect } from "react";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  useEffect(() => {
    console.error(`[${error.digest ?? 'global-error'}] detalles:`, error);
  }, [error]);

  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2 className="text-2xl font-bold mb-2">¡Algo salió mal!</h2>
        <p className="text-sm text-muted-foreground mb-4">
          {error.message}
        </p>
        <div>
          <button onClick={reset} className="px-4 py-2 bg-blue-600 text-white rounded">
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  )
}