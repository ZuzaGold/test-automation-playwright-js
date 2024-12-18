import { expect, test } from "@playwright/test";
import { password, userFullName, username } from "../fixtures/fixtures.js";
import { LoginPage } from "./login.page.js";

let loginPage;
test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    const pageTitle = "Přihlášení - Czechitas";

    await loginPage.open();
    await test.expect(page).toHaveTitle(pageTitle);
  });

  test("should show login form", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await expect(
      loginPage.emailFieldLocator,
      "email field should be visible",
    ).toBeVisible();
    await expect(
      loginPage.emailFieldLocator,
      "email field should be enabled",
    ).toBeEnabled();

    await expect(
      loginPage.passwordFieldLocator,
      "password field should be visible",
    ).toBeVisible();
    await expect(
      loginPage.passwordFieldLocator,
      "password field should be enabled",
    ).toBeEnabled();

    await expect(
      loginPage.loginButtonLocator,
      "login button should be visible",
    ).toBeVisible();
    await expect(
      loginPage.loginButtonLocator,
      "login button text should have text",
    ).toHaveText("Přihlásit");
  });

  test("should login with valid credentials", async ({ page }) => {
    //const loginPage = new LoginPage(page);
    await loginPage.login(username, password);

    const usernameDropdown = await loginPage.usernameDropdownLocator;
    await expect(usernameDropdown).toHaveText(userFullName);
    // await expect(await fetUserNameDropdown(page).textContent()).toEqual(userFullName);
  });

  test("should not login with invalid credentials", async ({ page }) => {
    await loginPage.login(username, "invalid");

    await loginPage.emailFieldLocator.fill("lisakadmin@lisakadmin");

    await expect(loginPage.toastLocator).toHaveText(
      "Některé pole obsahuje špatně zadanou hodnotu",
    );
    await expect(loginPage.fieldErrorLocator).toHaveText(
      "Tyto přihlašovací údaje neodpovídají žadnému záznamu.",
    );

    await expect(loginPage.emailFieldLocator).toBeVisible();
    //await expect(loginPage.passwordFieldLocator).toBeVisible();
    //await expect(loginPage.loginButtonLocator).toBeVisible();
  });

  test("should logout", async ({ page }) => {
    await loginPage.login(username, password);

    await expect(await loginPage.usernameDropdownLocator).toHaveText(
      userFullName,
    );

    await loginPage.usernameDropdownLocator.click();
    await loginPage.logoutLinkLocator.click();

    await expect(await loginPage.usernameDropdownLocator).toBeVisible({
      visible: false,
    });
    await expect(await loginPage.navbarRightLocator).toHaveText("Přihlásit");
  });
});
