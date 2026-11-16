import { test, expect } from "@playwright/test";

test("staff filtering matches Ali Shah and Zabih's supplied services", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?branch=taman-medan");
  await expect(page.locator(".brand-intro")).toHaveCount(0);
  const menu = page.locator("#pricing");
  await menu.scrollIntoViewIfNeeded();
  const staff = menu.getByRole("combobox", { name: "View services for" });
  const categories = menu.getByRole("group", { name: "Service categories", exact: true });
  await expect(staff.locator("option")).toHaveCount(3);
  await expect(categories.getByRole("button")).toHaveCount(4);
  await staff.selectOption("ali-shah");
  await expect(categories.getByRole("button")).toHaveCount(4);
  await expect(categories.getByRole("button", { name: /^Hair treatment/ })).toHaveCount(1);
  let total = 0;
  for (const [name, count] of [["Haircut", 5], ["Hair colour", 3], ["Hair treatment", 5], ["Spartans packages", 5]] as const) {
    await categories.getByRole("button", { name: new RegExp(`^${name}`) }).click();
    await expect(menu.locator(".menu-item")).toHaveCount(count);
    total += count;
  }
  expect(total).toBe(18);
  await expect(menu.locator(".menu-booking-note")).toContainText("Select Ali Shah");
  await staff.selectOption("zabih");
  await expect(categories.getByRole("button")).toHaveCount(4);
  await categories.getByRole("button", { name: /^Hair treatment/ }).click();
  await expect(menu.locator(".menu-item")).toHaveCount(5);
  await expect(menu.getByRole("heading", { name: "SCALP TREATMENT", exact: true })).toBeVisible();
  await expect(menu.locator(".menu-booking-note")).toContainText("Select Zabih");
  await staff.selectOption("ali-shah");
  await expect(menu.getByRole("heading", { name: "HAIRCUT", exact: true })).toBeVisible();
  await expect(menu.locator(".menu-item")).toHaveCount(5);
  await staff.selectOption("");
  await expect(categories.getByRole("button")).toHaveCount(4);
  await expect(menu.locator(".menu-booking-note")).toContainText("Select your service, barber");
});

test("main branch preserves all supplied categories, prices, durations and booking destination", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?branch=petaling-jaya");
  const menu = page.locator("#pricing");
  const expected = [
    ["HAIRCUT", [35, 40, 30, 15, 25], ["30 min", "30 min", "30 min", "20 min", "25 min"]],
    ["HAIR COLOUR", [180, 150, 30], ["30 min", "30 min", "30 min"]],
    ["HAIR TREATMENT", [40, 70, 90, 90, 150], ["20 min", "50 min", "1 hr", "30 min", "1 hr"]],
    ["OTHER SERVICES", [15, 25, 20, 20, 20, 40, 60, 15, 30], ["20 min", "20 min", "20 min", "20 min", "20 min", "30 min", "40 min", "20 min", "30 min"]],
    ["SPARTANS PACKAGES", [45, 60, 75, 115, 125], ["30 min", "40 min", "1 hr", "1 hr 20 min", "1 hr 40 min"]],
  ] as const;
  let total = 0;
  for (const [name, prices, durations] of expected) {
    await menu.getByRole("button", { name: new RegExp(`^${name}`) }).click();
    const items = menu.locator(".menu-item");
    await expect(items).toHaveCount(prices.length);
    for (let i = 0; i < prices.length; i++) {
      await expect(items.nth(i).locator("strong")).toHaveText(`RM ${prices[i]}`);
      await expect(items.nth(i).locator(".menu-duration")).toHaveText(durations[i]);
      await expect(items.nth(i).getByRole("link")).toHaveAttribute("href", "https://spartansbarbershop.setmore.com/");
    }
    total += prices.length;
  }
  expect(total).toBe(27);
  await menu.getByRole("button", { name: /^HAIRCUT/ }).click();
  await expect(menu.getByRole("heading", { name: "HAIRCUT KID (<4Y)", exact: true })).toBeVisible();
  await menu.locator(".menu-item").first().getByText("Details", { exact: true }).click();
  await expect(menu.locator(".menu-item").first()).toContainText("complimentary hair wash");
});

test("branch 03 preserves service ordering, prices and free meetings without branch 02 staff", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?branch=bandar-saujana-putra");
  const menu = page.locator("#pricing");
  await expect(menu.getByRole("combobox")).toHaveCount(0);
  const expected = [
    ["HAIRCUT", ["HAIRCUT", "HAIRCUT & QUICK WASH", "HAIRCUT KID (<12Y)", "BEARD GROOMING", "PREMIUM STEAM SHAVE"], [25, 30, 15, 10, 20], ["30 min", "30 min", "30 min", "20 min", "25 min"]],
    ["HAIR COLOUR", ["BLACK DYE - QUICK TOUCH", "HIGHLIGHTS", "FULL HAIR COLOUR"], [25, 150, 180], ["30 min", "1 hr", "1 hr"]],
    ["HAIR TREATMENT", ["HAIR INTENSIVE TREATMENT", "SCALP TREATMENT, HAIRCUT & PREMIUM FACIAL", "SCALP TREATMENT & HAIRCUT", "SCALP TREATMENT", "PERM TREATMENT"], [70, 80, 50, 35, 150], ["30 min", "1 hr", "50 min", "30 min", "1 hr"]],
    ["SPARTANS PACKAGES", ["ROYAL", "ULTIMATE", "PREMIUM", "CLASSIC", "BASIC"], [100, 80, 65, 45, 35], ["1 hr 40 min", "1 hr 20 min", "1 hr", "40 min", "30 min"]],
    ["Other", ["15 Minutes Meeting", "30 Minutes Meeting", "1 Hour Meeting"], [0, 0, 0], ["15 min", "30 min", "1 hr"]],
  ] as const;
  for (const [category, names, prices, durations] of expected) {
    await menu.getByRole("button", { name: new RegExp(`^${category}`) }).click();
    const items = menu.locator(".menu-item");
    await expect(items.locator("h3")).toHaveText([...names]);
    for (let i = 0; i < names.length; i++) {
      await expect(items.nth(i).locator("strong")).toHaveText(prices[i] === 0 ? "Free" : `RM ${prices[i]}`);
      await expect(items.nth(i).locator(".menu-duration")).toHaveText(durations[i]);
      await expect(items.nth(i).getByRole("link")).toHaveAttribute("href", "https://spartansbarbershopsb03.setmore.com/");
    }
  }
});
