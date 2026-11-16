import { test, expect } from "@playwright/test";
for (const width of [390, 1440]) {
  test(`all six uploaded works decode and play natively at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".brand-intro")).toHaveCount(0, { timeout: 6500 });
    const section = page.locator("#films");
    await section.locator(".showcase-thumbnails").scrollIntoViewIfNeeded();
    await expect(section.locator(".showcase-thumbnail")).toHaveCount(6);
    await section.getByRole("button", { name: "AUTO ON", exact: true }).click();
    for (let i = 1; i <= 6; i++) {
      const media = section.locator("video");
      await expect(media).toHaveAttribute("src", `/videos/showcase/work-0${i}.mp4`);
      await expect.poll(() => media.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
      expect(await media.evaluate(v => ({ width: (v as HTMLVideoElement).videoWidth, muted: (v as HTMLVideoElement).muted, inline: (v as HTMLVideoElement).playsInline }))).toEqual({ width: 720, muted: true, inline: true });
      if (i < 6) await section.getByRole("button", { name: "Next video", exact: true }).click();
    }
    await expect(section.locator("iframe")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/native-works-${width}.png` });
  });

  test(`native works pause offscreen, resume on return, and honour manual pause at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".brand-intro")).toHaveCount(0, { timeout: 6500 });
    const section = page.locator("#films");
    const rail = section.locator(".showcase-thumbnails");
    const media = section.locator("video");
    await rail.scrollIntoViewIfNeeded();
    await section.getByRole("button", { name: "AUTO ON", exact: true }).click();
    await expect.poll(() => media.evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await expect.poll(() => media.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
    await rail.scrollIntoViewIfNeeded();
    await expect.poll(() => media.evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
    await page.locator("#booking").scrollIntoViewIfNeeded();
    await expect.poll(() => media.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
    await rail.scrollIntoViewIfNeeded();
    await expect.poll(() => media.evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
    await section.getByRole("button", { name: "Pause showcase video", exact: true }).click();
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await rail.scrollIntoViewIfNeeded();
    await expect.poll(() => media.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
  });
}

test("native carousel automatically advances, centres its card, and pauses in a hidden tab", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".brand-intro")).toHaveCount(0, { timeout: 6500 });
  const section = page.locator("#films");
  await section.locator(".showcase-thumbnails").scrollIntoViewIfNeeded();
  await expect.poll(() => section.locator("video").evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
  // Work 01 is 8.3 seconds, so its natural end advances before the 10-second timer.
  await expect(section.locator("video")).toHaveAttribute("src", "/videos/showcase/work-02.mp4", { timeout: 12000 });
  await expect.poll(() => section.locator(".showcase-thumbnails").evaluate(element => {
    const card = element.querySelector('[aria-current="true"]')!.getBoundingClientRect();
    const rail = element.getBoundingClientRect();
    return Math.abs(card.left + card.width / 2 - rail.left - rail.width / 2);
  })).toBeLessThan(2);
  await expect.poll(() => section.locator("video").evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect.poll(() => section.locator("video").evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: false });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect.poll(() => section.locator("video").evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
});

test("ring navigation wraps forward and backward without reversing a full turn or skipping focused cards", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const section = page.locator("#films");
  await section.locator(".showcase-thumbnails").scrollIntoViewIfNeeded();
  await section.getByRole("button", { name: "Previous video", exact: true }).click();
  await expect(section.locator("video")).toHaveAttribute("src", "/videos/showcase/work-06.mp4");
  await expect(section.locator(".native-works-orbit")).toHaveAttribute("style", /60deg/);
  await section.getByRole("button", { name: "Next video", exact: true }).click();
  await expect(section.locator("video")).toHaveAttribute("src", "/videos/showcase/work-01.mp4");
  await section.getByRole("button", { name: "Show video 1: Spartans work 01", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(section.locator("video")).toHaveAttribute("src", "/videos/showcase/work-02.mp4");
});

test("direct works link reaches the carousel after the opening animation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?v=works#films");
  await expect(page.locator(".brand-intro")).toHaveCount(0, { timeout: 6500 });
  await expect.poll(() => page.locator("#films").evaluate(element => Math.abs(element.getBoundingClientRect().top))).toBeLessThan(150);
  await expect.poll(() => page.locator("#films video").evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
});

test("works are displayed directly after the homepage Hero and remain on branch pages", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("main > #home + #films")).toHaveCount(1);
  await expect(page.locator("#films .showcase-thumbnail")).toHaveCount(6);
  await page.goto("/?branch=taman-medan");
  await expect(page.locator("#films .showcase-thumbnail")).toHaveCount(6);
});
