import { test, expect } from "@playwright/test";
for (const width of [390, 1440]) {
  test(`Instagram replaces old showcase and unloads above and below the viewport at ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    await page.route("https://www.instagram.com/**", route => route.fulfill({ contentType: "text/html", body: "<p>Instagram embed test</p>" }));
    await page.goto("/");
    const section = page.locator("#films");
    await expect(section.locator(".showcase-stage, .showcase-thumbnails, video")).toHaveCount(0);
    await expect(section.locator(".instagram-work")).toHaveCount(7);
    const carousel = section.locator(".instagram-carousel-viewport");
    await carousel.scrollIntoViewIfNeeded();
    await expect(section.locator("iframe")).toHaveCount(1);
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await expect(section.locator("iframe")).toHaveCount(0);
    await carousel.scrollIntoViewIfNeeded();
    await expect(section.locator("iframe")).toHaveCount(1);
    await page.locator("#booking").scrollIntoViewIfNeeded();
    await expect(section.locator("iframe")).toHaveCount(0);
  });
}

test("Instagram player is removed while the browser tab is hidden", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("https://www.instagram.com/**", route => route.fulfill({ contentType: "text/html", body: "<p>Instagram embed test</p>" }));
  await page.goto("/");
  const carousel = page.locator(".instagram-works");
  await carousel.scrollIntoViewIfNeeded();
  await expect(carousel.locator("iframe")).toHaveCount(1);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(carousel.locator("iframe")).toHaveCount(0);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: false });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(carousel.locator("iframe")).toHaveCount(1);
});
