import { test, expect } from "@playwright/test";
for (const width of [390, 1440]) {
  test(`three owner Instagram works load on demand at ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    const urls = ["https://www.instagram.com/reel/Dbu93llJ3t6/", "https://www.instagram.com/p/DbkZmrXoLBr/", "https://www.instagram.com/reel/Dd8gyosJKb7/"];
    // Isolate third-party availability while checking the actual embed destinations.
    await page.route("https://www.instagram.com/**", route => route.fulfill({ contentType: "text/html", body: "<p>Instagram embed test</p>" }));
    await page.goto("/");
    const works = page.locator(".instagram-work");
    await expect(works).toHaveCount(3);
    await expect(works.locator("iframe")).toHaveCount(0);
    for (let i = 0; i < urls.length; i++) {
      await expect(works.nth(i).getByRole("link")).toHaveAttribute("href", urls[i]);
      await expect(works.nth(i).getByRole("link")).toHaveAttribute("target", "_blank");
      await works.nth(i).getByRole("button").click();
      await expect(works.nth(i).locator("iframe")).toHaveAttribute("src", `${urls[i]}embed/`);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
