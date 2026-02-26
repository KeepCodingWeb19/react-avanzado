import { expect, test, type Page } from "@playwright/test";

type LoginCandidate = {
  email: string;
  password: string;
};

const loginCandidates: LoginCandidate[] = [
  { email: "alex@google.com", password: "password" },
];

async function loginToDashboard(page: Page) {
  const user = loginCandidates[0];
  await page.goto("/login");
  await page.getByLabel("Email").fill(user.email);
  await page.getByLabel("Contraseña").fill(user.password);
  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  try {
    await expect(page).toHaveURL((url) => url.pathname.includes("/dashboard"), {
      timeout: 2000,
    });
    return;
  } catch {
    // Try the next credential candidate.
  }

  throw new Error("No se pudo iniciar sesión con ninguna credencial E2E.");
}

test("login, crear proyecto y borrarlo", async ({ page }) => {
  const projectTitle = `E2E Project ${Date.now()}`;

  await loginToDashboard(page);

  await page.getByLabel("Título").fill(projectTitle);
  await page.getByLabel("Descripción").fill("Proyecto temporal de prueba E2E");
  await page.getByRole("button", { name: "Crear Proyecto" }).click();

  const createdCard = page.locator("article", { hasText: projectTitle });
  await expect(createdCard).toBeVisible();

  await createdCard.getByRole("button", { name: "Borrar" }).click();
  await expect(page.locator("article", { hasText: projectTitle })).toHaveCount(
    0,
  );
});
