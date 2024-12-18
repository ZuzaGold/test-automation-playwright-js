import { test, expect } from "@playwright/test";
import {
  username,
  password,
  userFullName,
  applicationsPageSize,
  applicationsSearchText,
} from "../fixtures/fixtures.js";

test("should login", async ({ page }) => {
  await page.goto("/prihlaseni");

  // Finding email field, checking if it is enabled and visible
  const emailField = page.getByLabel("Email");
  console.log("Email field is visible" + (await emailField.isVisible()));
  console.log("Email field is enabled" + (await emailField.isEnabled()));

  // Finding password field, checking if it is enabled and visible
  const passwordField = page.getByLabel("Heslo");
  console.log("Password field is visible" + (await passwordField.isVisible()));
  console.log("Password field is enabled" + (await passwordField.isEnabled()));

  // Finding login button, checking text content
  const loginButton = page.getByRole("button", { name: "Přihlásit" });
  console.log("Login button text: " + (await loginButton.textContent()));

  // Login
  await emailField.fill(username);
  await passwordField.fill(password);
  await loginButton.click();

  const currentUser = page.locator(".navbar-right").locator("strong");
  await expect(currentUser, "current user should be displayed").toHaveText(
    userFullName,
  );
});
