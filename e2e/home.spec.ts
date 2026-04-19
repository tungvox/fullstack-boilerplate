import { expect, test } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Next\.js, Supabase, and Vercel/i }),
  ).toBeVisible();
});
