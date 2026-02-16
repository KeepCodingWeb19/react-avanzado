"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    document.cookie = "token=valid-token; path=/; max-age=3600";
    router.push("/dashboard");
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.refresh();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <div className="flex">
        <button
          onClick={handleLogin}
          className="mr-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Iniciar Sesión
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
