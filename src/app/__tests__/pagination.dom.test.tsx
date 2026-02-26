// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "@/components/pagination";

const replaceMock = vi.fn();
let pathnameValue = "/dashboard";
let searchParamsValue = "query=react&order=desc&page=2";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock }),
  usePathname: () => pathnameValue,
  useSearchParams: () => new URLSearchParams(searchParamsValue),
}));

describe("Pagination", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    pathnameValue = "/dashboard";
    searchParamsValue = "query=react&order=desc&page=2";
  });

  it("renderiza la página activa y los botones base", () => {
    render(<Pagination currentPage={2} totalPages={5} />);

    expect(screen.getByRole("button", { name: "Anterior" })).not.toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Siguiente" }),
    ).not.toBeDisabled();
    expect(screen.getByRole("button", { name: "2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByText("Página 2 de 5")).toBeInTheDocument();
  });

  it("navega a la siguiente página conservando filtros actuales", async () => {
    const user = userEvent.setup();
    render(<Pagination currentPage={2} totalPages={5} />);

    await user.click(screen.getByRole("button", { name: "Siguiente" }));

    expect(replaceMock).toHaveBeenCalledWith(
      "/dashboard?query=react&order=desc&page=3",
    );
  });
});
