import { test, expect } from "@playwright/test";
for (const width of [390, 1440]) {
  test(`Instagram works automatically load and slide, with pause and navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.route("https://www.instagram.com/**", route => route.fulfill({ contentType: "text/html", body: "<p>Instagram embed test</p>" }));
    await page.goto("/");
    await expect(page.locator(".brand-intro")).toHaveCount(0, { timeout: 6500 });
    const carousel = page.locator(".instagram-works");
    await carousel.locator(".instagram-carousel-viewport").scrollIntoViewIfNeeded();
    await page.bringToFront();
    await expect(carousel.locator("iframe")).toHaveAttribute("src", "https://www.instagram.com/reel/Dbu93llJ3t6/embed/");
    await expect(carousel.locator("iframe")).toHaveAttribute("src", "https://www.instagram.com/p/DbkZmrXoLBr/embed/", { timeout: 14000 });
    // Allow the slide transition to finish before checking centring.
    await expect.poll(() => carousel.locator('.instagram-work:not([aria-hidden="true"])').evaluate(element => Math.abs(element.getBoundingClientRect().left - element.closest('.instagram-carousel-viewport')!.getBoundingClientRect().left))).toBeLessThan(1);
    await carousel.getByRole("button", { name: "Pause Instagram carousel" }).click();
    await carousel.getByRole("button", { name: "Next Instagram work" }).click();
    await expect(carousel.locator("iframe")).toHaveAttribute("src", "https://www.instagram.com/reel/Dd8gyosJKb7/embed/");
    await expect(carousel.locator('article[aria-hidden="false"] a')).toHaveAttribute("href", "https://www.instagram.com/reel/Dd8gyosJKb7/");
    await page.waitForTimeout(10500);
    await expect(carousel.locator("iframe")).toHaveAttribute("src", "https://www.instagram.com/reel/Dd8gyosJKb7/embed/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

for (const width of [390, 1440]) {
  test(`all seven Instagram works are reachable and wrap in the carousel at ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    await page.route("https://www.instagram.com/**", route => route.fulfill({ contentType: "text/html", body: "<p>Instagram embed test</p>" }));
    await page.goto("/");
    const carousel = page.locator(".instagram-works");
    await carousel.locator(".instagram-carousel-viewport").scrollIntoViewIfNeeded();
    await page.bringToFront();
    await expect(carousel.locator("article")).toHaveCount(7);
    const urls = [
      "https://www.instagram.com/reel/Dbu93llJ3t6/",
      "https://www.instagram.com/p/DbkZmrXoLBr/",
      "https://www.instagram.com/reel/Dd8gyosJKb7/",
      "https://www.instagram.com/reel/DZzGALMzAUZ/",
      "https://www.instagram.com/reel/DfbKqBcyNvm/",
      "https://www.instagram.com/reel/DdQuV85zv_R/",
      "https://www.instagram.com/reel/Dcdtbwhzl_Z/",
    ];
    for (const [index, url] of urls.entries()) {
      await carousel.locator(".instagram-carousel-viewport").scrollIntoViewIfNeeded();
      await expect(carousel.locator("iframe")).toHaveAttribute("src", `${url}embed/`);
      await expect(carousel.locator('article[aria-hidden="false"] a')).toHaveAttribute("href", url);
      await expect(carousel.locator(".instagram-carousel-controls > span")).toHaveText(`0${index + 1} / 07`);
      await carousel.getByRole("button", { name: "Next Instagram work" }).click();
    }
    await expect(carousel.locator("iframe")).toHaveAttribute("src", `${urls[0]}embed/`);
    await carousel.getByRole("button", { name: "Previous Instagram work" }).click();
    await expect(carousel.locator("iframe")).toHaveAttribute("src", `${urls[6]}embed/`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
