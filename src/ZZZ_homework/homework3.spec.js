const { test, expect } = require("@playwright/test");
const { username, password, userFullName } = require("../fixtures/fixtures");

test("make registration", async ({ page }) => {
  await page.goto("/registrace");

  //Finding Jméno a Příjmení field, checking if it is enabled and visible
  const userFullNameField = page.getByLabel("Jméno a příjmení");
  console.log(
    "UserFullName field is visible" + (await userFullNameField.isVisible()),
  );
  console.log(
    "UserFullName field is enabled" + (await userFullNameField.isEnabled()),
  );

  // Finding email field, checking if it is enabled and visible
  const emailField = page.getByLabel("Email");
  console.log("email field is visible" + (await emailField.isVisible()));
  console.log("email field is enabled" + (await emailField.isEnabled()));

  // Finding password field, checking if it is enabled and visible
  const passwordField = page.getByLabel("Heslo");
  console.log("password field is visible" + (await passwordField.isVisible()));
  console.log("password field is enabled" + (await passwordField.isEnabled()));

  // Finding controlPassword field, checking if it is enabled and visible
  const controlPasswordField = page.getByLabel("Kontrola hesla");
  console.log(
    "controlPassword field is visible" +
      (await controlPasswordField.isVisible()),
  );
  console.log(
    "controlPassword field is enabled" +
      (await controlPasswordField.isEnabled()),
  );

  // Finding Registration button, checking text content
  const registrationButton = page.getByRole("button", {
    name: "Zaregistrovat",
  });
  console.log(
    "Registration button text: " + (await registrationButton.textContent()),
  );

  // Registration
  await userFullNameField.fill("Lišák Admin");
  await emailField.fill(username);
  await passwordField.fill(password);
  await controlPasswordField.fill(password);
  await registrationButton.click();
});
