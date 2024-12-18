const { test, expect } = require("@playwright/test");
const { username, password } = require("../fixtures/fixtures");

test("should make a registration", async ({ page }) => {
  await page.goto("https://team8-2022brno.herokuapp.com/registrace");

  //Finding Jméno a Příjmení field, checking if it is enabled and visible
  const celeJmenoField = page.getByLabel("Jméno a příjmení");
  console.log(
    "celeJmeno field is visible" + (await celeJmenoField.isVisible()),
  );
  console.log(
    "celeJmeno field is enabled" + (await celeJmenoField.isEnabled()),
  );

  // Finding email field, checking if it is enabled and visible
  const emailField = page.getByLabel("Email");
  console.log("Email field is visible" + (await emailField.isVisible()));
  console.log("Email field is enabled" + (await emailField.isEnabled()));

  // Finding password field, checking if it is enabled and visible
  const passwordField = page.getByLabel("Heslo");
  console.log("Password field is visible" + (await passwordField.isVisible()));
  console.log("Password field is enabled" + (await passwordField.isEnabled()));

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
  await celeJmenoField.fill(userFullName);
  await emailField.fill(username);
  await passwordField.fill(password);
  await controlPasswordField.fill(password);
  await registrationButton.click();
});
