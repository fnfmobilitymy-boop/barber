import { test, expect } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`video carousel ${width}px: playback, selection and keyboard controls`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const section = page.locator("#films");
    await section.scrollIntoViewIfNeeded();
    const video = section.locator(".showcase-stage > video");
    await expect(section.getByRole("button", { name: /AUTO/ })).toBeDisabled();
    expect(await video.evaluate((v) => (v as HTMLVideoElement).paused)).toBe(true);
    await section.getByRole("button", { name: "Next video", exact: true }).click();
    await expect(video).toHaveAttribute("src", /b\.mp4$/);
    await section.getByRole("button", { name: "Previous video", exact: true }).click();
    await expect(video).toHaveAttribute("src", /a\.mp4$/);
    await section.getByRole("button", { name: "Show video 3: Sharp detail.", exact: true }).focus();
    await section.getByRole("button", { name: "Show video 3: Sharp detail.", exact: true }).click();
    await expect(video).toHaveAttribute("src", /c\.mp4$/);
    await section.locator(".showcase-stage").focus();
    await page.keyboard.press("ArrowRight");
    await expect(video).toHaveAttribute("src", /d\.mp4$/);
    await section.getByRole("button", { name: "Show video 1: Clean lines.", exact: true }).focus();
    await section.getByRole("button", { name: "Show video 1: Clean lines.", exact: true }).click();
    await expect(video).toHaveAttribute("src", /a\.mp4$/);
    await section.getByRole("button", { name: "Play showcase video", exact: true }).click();
    await expect.poll(() => video.evaluate((v) => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
    await section.getByRole("button", { name: "Pause showcase video", exact: true }).click();
    expect(await video.evaluate((v) => (v as HTMLVideoElement).paused)).toBe(true);
    await expect(section.getByRole("button", { name: "Show video 1: Clean lines.", exact: true })).toHaveAttribute("aria-current", "true");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/video-showcase-${width}.png` });
  });
}

test("video carousel advances at the end and pauses out of view", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".brand-intro")).toHaveCount(0, { timeout: 6500 });
  const section = page.locator("#films");
  await section.scrollIntoViewIfNeeded();
  const video = section.locator(".showcase-stage > video");
  await expect.poll(() => video.evaluate((v) => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
  await video.evaluate((v) => { (v as HTMLVideoElement).currentTime = (v as HTMLVideoElement).duration - .15; });
  await expect(video).toHaveAttribute("src", /b\.mp4$/);
  await section.getByRole("button", { name: /AUTO/ }).click();
  await expect(section.getByRole("button", { name: /AUTO/ })).toHaveAttribute("aria-pressed", "false");
  await page.locator("#booking").scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((v) => (v as HTMLVideoElement).paused)).toBe(true);
});

test("video carousel accepts horizontal touch gestures", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".brand-intro")).toHaveCount(0);
  const stage = page.locator(".showcase-stage");
  await stage.scrollIntoViewIfNeeded();
  await stage.evaluate((element) => {
    const start = new Touch({ identifier: 1, target: element, clientX: 290, clientY: 300 });
    const end = new Touch({ identifier: 1, target: element, clientX: 100, clientY: 310 });
    element.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, touches: [start] }));
    element.dispatchEvent(new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }));
  });
  await expect(stage.locator("video")).toHaveAttribute("src", /b\.mp4$/);
  const rail = page.locator(".showcase-thumbnails");
  await rail.scrollIntoViewIfNeeded();
  await rail.evaluate((element) => {
    const start = new Touch({ identifier: 2, target: element, clientX: 290, clientY: 300 });
    const end = new Touch({ identifier: 2, target: element, clientX: 100, clientY: 310 });
    element.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, touches: [start] }));
    element.dispatchEvent(new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }));
  });
  await expect(stage.locator("video")).toHaveAttribute("src", /c\.mp4$/);
  await rail.getByRole("button", { name: "Show video 1: Clean lines.", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(stage.locator("video")).toHaveAttribute("src", /b\.mp4$/);
});


test("3D carousel previews and automatically centres cards independently of the offscreen main player", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".brand-intro")).toHaveCount(0, { timeout: 6500 });
  const rail = page.locator(".showcase-thumbnails");
  await rail.evaluate((element) => scrollTo({ top: element.getBoundingClientRect().top + scrollY - 130, behavior: "instant" }));
  await rail.getByRole("button", { name: "Show video 3: Sharp detail.", exact: true }).click();
  await expect.poll(() => rail.locator("video").evaluate((v) => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
  await expect.poll(() => page.locator(".showcase-stage > video").evaluate((v) => (v as HTMLVideoElement).paused)).toBe(true);
  await expect(rail.getByRole("button", { name: "Show video 4: Natural movement.", exact: true })).toHaveAttribute("aria-current", "true", { timeout: 8000 });
  await expect.poll(() => rail.evaluate((element) => {
    const card = element.querySelector('[aria-current="true"]')!;
    const a = card.getBoundingClientRect(), b = element.getBoundingClientRect();
    return Math.abs((a.left + a.width / 2) - (b.left + b.width / 2));
  })).toBeLessThan(4);
  await page.getByRole("button", { name: /AUTO/ }).click();
  await expect.poll(() => rail.locator("video").evaluate((v) => (v as HTMLVideoElement).paused)).toBe(true);
  await page.waitForTimeout(5500);
  await expect(rail.getByRole("button", { name: "Show video 4: Natural movement.", exact: true })).toHaveAttribute("aria-current", "true");
});
