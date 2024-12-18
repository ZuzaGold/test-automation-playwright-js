import { test } from "@playwright/test";

test.describe("Locators", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/prihlaseni");
  });

  test.describe("CCS locators", async () => {
    test("tag locators", async ({ page }) => {
      const h1TagLocator = page.locator("h1");
      console.log(await h1TagLocator.innerHTML());

      const formTagLocator = page.locator("form");
      console.log(await formTagLocator.innerHTML());
    });

    test("attribute locators", async ({ page }) => {
      const typeAttributeLocator = page.locator('[type="password"]');
      console.log(await typeAttributeLocator.innerHTML());

      // attribute containing text
      const attributeContainingTextLocator = page.locator('[type*="ass"]');
      console.log(await attributeContainingTextLocator.innerHTML());

      // attribute ending with text
      const attributeEndingWithTextLocator = page.locator('[type$="word"]');
      console.log(await attributeEndingWithTextLocator.innerHTML());

      // attribute strting with text
      const attributeStartingWithTextLocator = page.locator('[type^="pass"]');
      console.log(await attributeStartingWithTextLocator.innerHTML());
    });

    test("combined locators", async ({ page }) => {
      const tagAndIdLocator = page.locator("input#email");
      console.log(await tagAndIdLocator.innerHTML());

      const tagAndAttributeLocator = page.locator('input[type="password"]');
      console.log(await tagAndAttributeLocator.innerHTML());

      const tagAndClassLocator = page.locator("button.btn-primary");
      console.log(await tagAndClassLocator.innerHTML());
    });

    test("chaining locators", async ({ page }) => {
      const locator = page
        .locator("div")
        .locator("form")
        .locator('input[type$="word"]');
      console.log(await locator.innerHTML());
    });
  });
});
