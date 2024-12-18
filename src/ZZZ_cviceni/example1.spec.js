import { test } from "@playwright/test";

test("should open login page", async ({ page }) => {
  console.log("Můj první test");

  await page.goto("/prihlaseni");
  console.log(await page.title());

  // Screenshot při rozlišení 800x600
  await page.setViewportSize({ width: 800, height: 600 });
  await page.screenshot({ path: "login_page_800_600.png" });

  // Screenshot při rozlišení 1920x1080
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.screenshot({ path: "login_page_1920_1080.png" });
});
