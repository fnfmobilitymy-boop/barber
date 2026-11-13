import { test, expect } from "@playwright/test";

test("branch pages survive reload and isolate booking, prices and maps", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Choose a branch", exact: true }).getByRole("link")).toHaveCount(3);
  await expect(page.getByRole("link", { name: "BOOK YOUR CUT", exact: true })).toHaveAttribute("href", "#branches");
  await expect(page.locator(".menu-item")).toHaveCount(0);
  for (const [id, name, address] of [
    ["petaling-jaya", "Petaling Jaya · Seksyen 14", "5B, Jalan 14/20"],
    ["taman-medan", "Taman Medan", "B3-4-1, Jalan PJS 3/11C"],
    ["bandar-saujana-putra", "Bandar Saujana Putra", "36-1, Jalan SP 1/2"],
  ]) {
    await page.goto(`/?branch=${id}`);
    await page.reload();
    await expect(page).toHaveTitle(`Spartans Barbershop — ${name}`);
    await expect(page.locator("#booking address")).toContainText(address);
    const map = page.getByTitle(`Google Map — ${name}`, { exact: true });
    await expect(map).toHaveCount(1);
    await expect(map).toHaveAttribute("src", /https:\/\/www.google.com\/maps\?q=.+&output=embed/);
    await expect(page.locator(".branch-reviews")).toContainText("Google reviews");
    const cta = page.getByRole("link", { name: "BOOK YOUR CUT", exact: true });
    if (id === "taman-medan") {
      await expect(cta).toHaveAttribute("href", "https://spartansbarbershopsb02.setmore.com/");
      await expect(page.locator(".menu-item").first()).toContainText("RM 25");
    } else {
      await expect(cta).toHaveAttribute("href", new RegExp(`https://wa.me/.+${encodeURIComponent(name)}`));
      await expect(page.locator(".menu-item")).toHaveCount(0);
      await expect(page.locator('a[href="https://spartansbarbershopsb02.setmore.com/"]')).toHaveCount(0);
    }
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});
