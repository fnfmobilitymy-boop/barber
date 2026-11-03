import { test, expect } from "@playwright/test";

test("staff filtering matches Ali Shah and Zabih's supplied services", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".brand-intro")).toHaveCount(0);
  const menu = page.locator("#pricing");
  await menu.scrollIntoViewIfNeeded();
  const staff = menu.getByRole("combobox", { name: "View services for" });
  const categories = menu.getByRole("group", { name: "Service categories", exact: true });
  await expect(staff.locator("option")).toHaveCount(3);
  await expect(categories.getByRole("button")).toHaveCount(4);
  await staff.selectOption("ali-shah");
  await expect(categories.getByRole("button")).toHaveCount(3);
  await expect(categories.getByRole("button", { name: /^Hair treatment/ })).toHaveCount(0);
  let total = 0;
  for (const [name, count] of [["Haircut", 5], ["Hair colour", 3], ["Spartans packages", 5]] as const) {
    await categories.getByRole("button", { name: new RegExp(`^${name}`) }).click();
    await expect(menu.locator(".menu-item")).toHaveCount(count);
    total += count;
  }
  expect(total).toBe(13);
  await expect(menu.locator(".menu-booking-note")).toContainText("Select Ali Shah");
  await staff.selectOption("zabih");
  await expect(categories.getByRole("button")).toHaveCount(4);
  await categories.getByRole("button", { name: /^Hair treatment/ }).click();
  await expect(menu.locator(".menu-item")).toHaveCount(5);
  await expect(menu.getByRole("heading", { name: "SCALP TREATMENT", exact: true })).toBeVisible();
  await expect(menu.locator(".menu-booking-note")).toContainText("Select Zabih");
  await staff.selectOption("ali-shah");
  await expect(menu.getByRole("heading", { name: "HAIRCUT", exact: true })).toBeVisible();
  await expect(menu.locator(".menu-item")).toHaveCount(5);
  await staff.selectOption("");
  await expect(categories.getByRole("button")).toHaveCount(4);
  await expect(menu.locator(".menu-booking-note")).toContainText("Select your service, barber");
});
