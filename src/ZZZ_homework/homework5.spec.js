import { test, expect } from "@playwright/test";
import {
  username,
  password,
  userFullName,
  applicationsPageSize,
  applicationsSearchText,
} from "../fixtures/fixtures.js";
import { RegExp } from "../fixtures/regular-expressions.js";

test("Chacking registration page", async ({ page }) => {
  await page.goto("/registrace");

  const existEmail = "Zuzana123@seznam.cz";
  const invalidEmail = "lisakadmin@lisakadmin";
  const invalidPassword = "123456";

  // Jméno a Příjmení field, enable and visible
  const userFullNameField = page.getByLabel("Jméno a příjmení");
  console.log(
    "userFullName field is visible" + (await userFullNameField.isVisible()),
  );
  console.log(
    "userFullName field is enabled" + (await userFullNameField.isEnabled()),
  );

  // email field, enable and visible
  const emailField = page.getByLabel("Email");
  console.log("Email field is visible" + (await emailField.isVisible()));
  console.log("Email field is enabled" + (await emailField.isEnabled()));

  // password field, enable and visible
  const passwordField = page.getByLabel("Heslo");
  console.log("Password field is visible" + (await passwordField.isVisible()));
  console.log("Password field is enabled" + (await passwordField.isEnabled()));

  // controlPassword field, enable and visible
  const controlPasswordField = page.getByLabel("Kontrola hesla");
  console.log(
    "controlPassword field is visible" +
      (await controlPasswordField.isVisible()),
  );
  console.log(
    "controlPassword field is enabled" +
      (await controlPasswordField.isEnabled()),
  );

  // Registration button, checking text content
  const registrationButton = page.getByRole("button", {
    name: "Zaregistrovat",
  });
  console.log(
    "Registration button text: " + (await registrationButton.textContent()),
  );
});

test("Registration with existing email", async ({ page }) => {
  await page.goto("/registrace");

  const userFullNameField = page.getByLabel("Jméno a příjmení");
  const emailField = page.getByLabel("Email");
  const passwordField = page.getByLabel("Heslo");
  const controlPasswordField = page.getByLabel("Kontrola hesla");
  const registrationButton = page.getByRole("button", {
    name: "Zaregistrovat",
  });

  const existEmail = "Zuzana123@seznam.cz";

  // Registration
  await userFullNameField.fill(userFullName);
  await emailField.fill(existEmail);
  await passwordField.fill(password);
  await controlPasswordField.fill(password);
  await registrationButton.click();

  const toastMessage = page.locator(".toast-message");
  const fieldError = page.locator(".invalid-feedback");

  await expect(toastMessage).toHaveText(
    "Některé pole obsahuje špatně zadanou hodnotu",
  );
  await expect(fieldError).toHaveText("Účet s tímto emailem již existuje.");
});

test("Registration with invalid password", async ({ page }) => {
  await page.goto("/registrace");

  const userFullNameField = page.getByLabel("Jméno a příjmení");
  const emailField = page.getByLabel("Email");
  const passwordField = page.getByLabel("Heslo");
  const controlPasswordField = page.getByLabel("Kontrola hesla");
  const registrationButton = page.getByRole("button", {
    name: "Zaregistrovat",
  });

  const invalidPassword = "123456";

  await userFullNameField.fill(userFullName);
  await emailField.fill(username);
  await passwordField.fill(invalidPassword);
  await controlPasswordField.fill(invalidPassword);
  await registrationButton.click();

  const toastMessage = page.locator(".toast-message");
  const fieldError = page.locator(".invalid-feedback");

  await expect(toastMessage).toHaveText(
    "Některé pole obsahuje špatně zadanou hodnotu",
  );
  await expect(fieldError).toHaveText(
    "Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici",
  );
});

test("Registration with VALID Email", async ({ page }) => {
  await page.goto("/registrace");

  // Jméno a Příjmení field, enable and visible
  const userFullNameField = page.getByLabel("Jméno a příjmení");
  console.log(
    "userFullName field is visible" + (await userFullNameField.isVisible()),
  );
  console.log(
    "userFullName field is enabled" + (await userFullNameField.isEnabled()),
  );

  // email field, enable and visible
  const emailField = page.getByLabel("Email");
  console.log("Email field is visible" + (await emailField.isVisible()));
  console.log("Email field is enabled" + (await emailField.isEnabled()));

  // password field, enable and visible
  const passwordField = page.getByLabel("Heslo");
  console.log("Password field is visible" + (await passwordField.isVisible()));
  console.log("Password field is enabled" + (await passwordField.isEnabled()));

  // controlPassword field, enable and visible
  const controlPasswordField = page.getByLabel("Kontrola hesla");
  console.log(
    "controlPassword field is visible" +
      (await controlPasswordField.isVisible()),
  );
  console.log(
    "controlPassword field is enabled" +
      (await controlPasswordField.isEnabled()),
  );

  // Registration button, checking text content
  const registrationButton = page.getByRole("button", {
    name: "Zaregistrovat",
  });
  console.log(
    "Registration button text: " + (await registrationButton.textContent()),
  );

  const newUserFullName = "Zuzana Goldschmidová";
  const newUserName = "ZuzanaG@czechitas.cz";

  // Bad registration
  await userFullNameField.fill(newUserFullName);
  await emailField.fill(newUserName);
  await passwordField.fill(password);
  await controlPasswordField.fill(password);
  await registrationButton.click();

  // Print users full name / const currentUser = $(".navbar-right").$("strong").getText();
  const currentUser = page
    .locator(".navbar-right")
    .locator("strong")
    .textContent("Zuzana Goldschmidová");
  console.log("Current user name:" + (await currentUser));

  const successMessage = await page.locator(".success-message");
  await expect(successMessage).toBeVisible();
  console.log("Uživatel byl úspěšně zaregistrován.");
});
