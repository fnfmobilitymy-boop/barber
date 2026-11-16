import { test, expect } from "@playwright/test";
for (const width of [390, 1440]) {
  for (const route of ["partnerships", "careers"]) {
    test(`${route} page at ${width}px has direct business contacts and survives reload`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors: string[] = [];
      page.on("pageerror", e => errors.push(e.message));
      await page.goto(`/?page=${route}`);
      await page.reload();
      await expect(page).toHaveTitle(route === "careers" ? "Spartans Barbershop — Careers" : "Spartans Barbershop — Partnerships & Investment");
      await expect(page.locator("h1")).toBeVisible();
      const whatsapp = page.locator('.opportunities-actions a[href^="https://wa.me/"]');
      const url = new URL((await whatsapp.getAttribute("href"))!);
      expect(url.pathname).toBe("/60146277166");
      expect(url.searchParams.get("text")).toContain(route === "careers" ? "apply to join your team" : "partnership or investment");
      const email = new URL((await page.locator('.opportunities-actions a[href^="mailto:"]').getAttribute("href"))!);
      expect(email.pathname).toBe("spartansbarbershophq@gmail.com");
      expect(email.searchParams.get("subject")).toContain(route === "careers" ? "Job application" : "Partnership / investment");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(errors).toEqual([]);
    });
  }
}

for (const route of ["partnerships", "careers"]) {
  test(`${route} card titles stay inside their cards across screen sizes`, async ({ page }) => {
    await page.goto(`/?page=${route}`);
    await page.evaluate(() => document.fonts.ready);
    for (const width of [375, 768, 900, 1024, 1329, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.locator(".opportunities-grid h2").evaluateAll(headings => headings.flatMap(heading => {
        const card = heading.closest(".contact-card")!;
        const bounds = card.getBoundingClientRect();
        const style = getComputedStyle(card);
        const left = bounds.left + parseFloat(style.paddingLeft);
        const right = bounds.right - parseFloat(style.paddingRight);
        const range = document.createRange();
        range.selectNodeContents(heading);
        return Array.from(range.getClientRects()).filter(rect => rect.left < left - 1 || rect.right > right + 1).map(() => heading.textContent);
      }));
      expect(overflow, `${width}px card text overflow`).toEqual([]);
    }
  });
}
