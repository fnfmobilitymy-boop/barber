import { test, expect } from "@playwright/test";
for (const width of [390, 1440]) {
  test(`original large player and coverflow use all six current works at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".brand-intro")).toHaveCount(0, { timeout: 6500 });
    const section = page.locator("#films");
    const stage = section.locator(".showcase-stage");
    const video = stage.locator("video");
    await stage.scrollIntoViewIfNeeded();
    await expect(section.locator(".showcase-thumbnail")).toHaveCount(6);
    for (let i = 1; i <= 6; i++) {
      await expect(video).toHaveAttribute("src", `/videos/showcase/work-0${i}.mp4`);
      await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
      expect(await video.evaluate(v => (v as HTMLVideoElement).muted)).toBe(true);
      if (i < 6) {
        await section.getByRole("button", { name: "Next video", exact: true }).click();
        await stage.scrollIntoViewIfNeeded();
      }
    }
    await expect(section.locator(".native-works-orbit, iframe")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await stage.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/restored-showcase-${width}.png` });
  });

  test(`restored player pauses offscreen and resumes without overriding manual pause at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".brand-intro")).toHaveCount(0, { timeout: 6500 });
    const stage = page.locator("#films .showcase-stage");
    const video = stage.locator("video");
    await stage.scrollIntoViewIfNeeded();
    await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
    await page.locator("#booking").scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator('#films video').evaluateAll(videos => videos.every(v => (v as HTMLVideoElement).paused))).toBe(true);
    await stage.scrollIntoViewIfNeeded();
    await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
    await page.getByRole("button", { name: "Pause showcase video", exact: true }).click();
    await page.locator("#booking").scrollIntoViewIfNeeded();
    await stage.scrollIntoViewIfNeeded();
    await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
  });
}

test("coverflow automatically previews and centres the next card on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".brand-intro")).toHaveCount(0, { timeout: 6500 });
  const rail = page.locator(".showcase-thumbnails");
  await rail.evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY - 130, behavior: "instant" }));
  await expect.poll(() => rail.locator("video").evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
  await expect(rail.getByRole("button", { name: "Show video 2: Spartans work 02", exact: true })).toHaveAttribute("aria-current", "true", { timeout: 8000 });
  await expect.poll(() => rail.evaluate(element => {
    const card = element.querySelector('[aria-current="true"]')!.getBoundingClientRect(), track = element.getBoundingClientRect();
    return Math.abs(card.left + card.width / 2 - track.left - track.width / 2);
  })).toBeLessThan(4);
  await expect.poll(() => page.locator(".showcase-stage > video").evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
});
