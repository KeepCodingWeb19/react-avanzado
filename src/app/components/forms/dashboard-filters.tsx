"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type ProjectOrder = "asc" | "desc";

interface DashboardFiltersProps {
  initialQuery: string;
  initialOrder: ProjectOrder;
}

export default function DashboardFilters({
  initialQuery,
  initialOrder,
}: DashboardFiltersProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [order, setOrder] = useState(initialOrder);
  const router = useRouter();
  const pathname = usePathname();

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    if (order) {
      params.set("order", order);
    } else {
      params.delete("order");
    }
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleClick() {
    setQuery("");
    setOrder("asc");
    router.replace(pathname);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded border p-4">
      <div className="grid gap-3">
        <input
          type="text"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded border border-border p-2 bg-background"
        />
        <select
          name="order"
          value={order}
          onChange={(e) => setOrder(e.target.value as ProjectOrder)}
          className="w-full rounded border border-border p-2 bg-background"
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full rounded border border-border p-2 bg-primary text-primary-foreground"
          >
            Aplicar filtros
          </button>
          <button
            type="reset"
            onClick={handleClick}
            className="w-full rounded border border-border p-2"
          >
            Limpiar
          </button>
        </div>
      </div>
    </form>
  );
}
