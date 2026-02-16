"use client";

import { useTheme } from "@/hooks/use-theme";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();


  if (!mounted ){
    return (
      <div className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">
        Loading...
      </div>
    )
  }

  return (
    <button
    onClick={toggleTheme}
    className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">
      Tema: {theme === "light" ? "Claro ☀️" : "Oscuro 🌙"}
    </button>
  );
}
