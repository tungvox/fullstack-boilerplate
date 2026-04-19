import { expect, test } from "@playwright/test";

test("billing requires sign-in", async ({ page }) => {
  await page.goto("/billing");
  await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
});
