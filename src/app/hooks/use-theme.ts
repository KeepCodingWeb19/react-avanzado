"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [state, setState] = useState<{ theme: Theme; mounted: boolean }>({
    theme: "light",
    mounted: false,
  });

  useEffect(() => {
    function getSystemTheme(): Theme {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    function getStoredTheme(): Theme | null {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme !== "light" && storedTheme !== "dark") return null;
      return storedTheme;
    }

    function applyTheme(nextTheme: Theme) {
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      document.documentElement.style.colorScheme = nextTheme;
      localStorage.setItem("theme", nextTheme);
    }

    const initialTheme = getStoredTheme() ?? getSystemTheme();

    // Ensure DOM + storage are aligned with the theme React will render.
    applyTheme(initialTheme);
    const timeoutId = setTimeout(() => {
      setState({ theme: initialTheme, mounted: true });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  function applyTheme(nextTheme: Theme) {
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  }

  const toggleTheme = () => {
    const newTheme = state.theme === "light" ? "dark" : "light";
    applyTheme(newTheme);
    setState((prev) => ({ ...prev, theme: newTheme }));
  };

  return { theme: state.theme, toggleTheme, mounted: state.mounted };
}
