import { test, expect } from "@playwright/test";
for (const width of [375, 390, 430, 768, 1024, 1440, 1920]) {
  test(`responsive ${width}px: media, navigation and no overflow`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toContainText("A LIFESTYLE.");
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    await expect
      .poll(() =>
        page
          .locator("video")
          .evaluate((v) => (v as HTMLVideoElement).currentTime),
      )
      .toBeGreaterThan(0.1);
    expect(await page.locator("video source").getAttribute("src")).toBe(
      "/videos/barbershop-hero.mp4",
    );
    if (width <= 850) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(page.locator("#mobile-nav")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator("#mobile-nav")).toHaveCount(0);
    }
    for (const id of [
      "about",
      "craft",
      "philosophy",
      "services",
      "gallery",
      "experience",
      "barbers",
      "pricing",
      "faq",
      "booking",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        )
        .toBe(true);
    }
    expect(
      await page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs.every(
            (i) =>
              (i as HTMLImageElement).complete &&
              (i as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    ).toBe(true);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `test-results/hero-${width}.png` });
    expect(errors).toEqual([]);
  });
}
test("gallery filtering, keyboard lightbox, FAQ and honest booking", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#gallery").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Skin Fade", exact: true }).click();
  await expect(page.locator(".gallery-item")).toHaveCount(1);
  await page.locator(".gallery-item").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".gallery-item")).toHaveCount(4);
  await page.locator(".gallery-item").first().click();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lightbox figcaption")).toContainText("2 / 4");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Do I need an appointment?" }).click();
  await expect(page.locator("#answer-0")).toBeVisible();
  await page.getByRole("button", { name: "Do I need an appointment?" }).click();
  await expect(page.locator("#answer-0")).toHaveCount(0);
  await expect(page.locator("#booking")).toContainText("Booking opens soon.");
  const broken = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((a) => a.getAttribute("href")!)
        .filter((h) => !document.getElementById(h.slice(1))),
    );
  expect(broken).toEqual([]);
});
test("reduced motion shows static hero and local fonts load", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".poster")).toBeVisible();
  await expect(page.locator("video")).toBeHidden();
  expect(
    await page.evaluate(
      () =>
        document.fonts.check('16px "Instrument Serif"') &&
        document.fonts.check("16px Manrope"),
    ),
  ).toBe(true);
});
test("hero video can pause, resume and crossfade across its loop", async ({
  page,
}) => {
  await page.goto("/");
  const video = page.locator("video");
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).currentTime))
    .toBeGreaterThan(0.6);
  await page.getByRole("button", { name: "Pause background video" }).click();
  expect(await video.evaluate((v) => (v as HTMLVideoElement).paused)).toBe(
    true,
  );
  await page.getByRole("button", { name: "Play background video" }).click();
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).paused))
    .toBe(false);
  await video.evaluate((v) => {
    (v as HTMLVideoElement).currentTime =
      (v as HTMLVideoElement).duration - 0.3;
  });
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).currentTime), {
      timeout: 15000,
    })
    .toBeLessThan(2);
});
