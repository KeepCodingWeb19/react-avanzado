import { loginAction } from "@/app/login/actions";
import { initialLoginState } from "@/app/login/types";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth", () => ({
  createSession: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/lib/users", () => ({
  getUserByEmail: vi.fn(),
}));

function buildFormData(email: string, password: string): FormData {
  const formData = new FormData();
  formData.set("email", email);
  formData.set("password", password);
  return formData;
}

describe("loginAction", () => {
  it("retorna error cuando el usuario no existe", async () => {
    // Arrange
    const { getUserByEmail } = await import("@/lib/users");
    const formData = buildFormData("prueba@google.com", "1234");

    vi.mocked(getUserByEmail).mockResolvedValue(null);

    // Act
    const result = await loginAction(initialLoginState, formData);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe("Credenciales incorrectas");
    expect(result.errors).toEqual({});
    expect(result.values).toEqual({ email: "prueba@google.com" });
  });

  it("crea sesión y redige al usuario cuando las credenciales sean correctas", async () => {
    // Arrange
    const { getUserByEmail } = await import("@/lib/users");
    const { createSession } = await import("@/lib/auth");
    const { redirect } = await import("next/navigation");
    const formData = buildFormData("prueba@google.com", "1234");

    vi.mocked(getUserByEmail).mockResolvedValueOnce({
      id: "123",
      email: "prueba@google.com",
    });

    // Act
    await loginAction(initialLoginState, formData);

    // Assert
    expect(createSession).toHaveBeenCalledWith("123");
    expect(redirect).toHaveBeenCalledWith("/dashboard");
  });
});
