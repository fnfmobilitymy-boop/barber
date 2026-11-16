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
    } else if (id === "petaling-jaya") {
      await expect(cta).toHaveAttribute("href", "https://spartansbarbershop.setmore.com/");
      await expect(page.locator(".menu-item").first()).toContainText("RM 35");
      await expect(page.getByRole("combobox", { name: "View services for" })).toHaveCount(0);
      await expect(page.locator('a[href="https://spartansbarbershopsb02.setmore.com/"]')).toHaveCount(0);
    } else {
      const bookingUrl = "https://spartansbarbershopsb03.setmore.com/";
      await expect(cta).toHaveAttribute("href", bookingUrl);
      await expect(page.locator(".menu-item").first()).toContainText("RM 25");
      await expect(page.locator('a[href="https://spartansbarbershopsb02.setmore.com/"]')).toHaveCount(0);
    }
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});

for (const width of [390, 1440]) {
  test(`branch card clicks open a distinct branch page at ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    for (const [id, label, name] of [
      ["petaling-jaya", "MAIN BRANCH · SHOP 01", "Petaling Jaya · Seksyen 14"],
      ["taman-medan", "SECOND BRANCH · SHOP 02", "Taman Medan"],
      ["bandar-saujana-putra", "THIRD BRANCH · SHOP 03", "Bandar Saujana Putra"],
    ]) {
      await page.goto("/");
      await page.getByRole("navigation", { name: "Choose a branch", exact: true }).getByRole("link").filter({ hasText: label }).click();
      await expect(page).toHaveURL(new RegExp(`branch=${id}`));
      await expect(page.locator("h1")).toHaveText(name);
      await expect(page.locator("#home")).toContainText(label);
      await expect(page.locator(".cinematic-video, .brand-intro")).toHaveCount(0);
      await expect(page.locator("#pricing .menu-item").first()).toBeAttached();
      await page.reload();
      await expect(page.locator("h1")).toHaveText(name);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}
