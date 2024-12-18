import { expect, test } from "@playwright/test";
import { password, userFullName, username } from "../fixtures/fixtures.js";

function getEmailField(page) {
  return page.getByLabel("Email");
}

function getPasswordField(page) {
  return page.getByLabel("Heslo");
}

function getLoginButton(page) {
  return page.getByRole("button", { name: "Přihlásit" });
}

function getCurrentUser(page) {
  return page.locator(".navbar-right").locator("strong");
}

test("should login", async ({ page }) => {
  await page.goto("/prihlaseni");

  const emailField = await getEmailField(page);
  console.log("Email field is visible" + (await emailField.isVisible()));
  console.log("Email field is enabled" + (await emailField.isEnabled()));

  const passwordField = await getPasswordField(page);
  console.log("Password field is visible" + (await passwordField.isVisible()));
  console.log("Password field is enabled" + (await passwordField.isEnabled()));

  const loginButton = await getLoginButton(page);
  console.log("Login button text: " + (await loginButton.textContent()));

  await emailField.fill(username);
  await passwordField.fill(password);
  await loginButton.click();

  const currentUser = await getCurrentUser(page);
  await expect(currentUser, "current user should be displayed").toHaveText(
    userFullName,
  );
});
