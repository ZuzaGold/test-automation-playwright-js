const { test, expect } = require("@playwright/test");
const { username, password } = require("../fixtures/fixtures");

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

  // Finding forgot password link
  //     - v tomto případě mi test nefunguje, protože po kliknutí na tlačítko se objeví jiná stránka
  //const link = page.getByText("Zapomněli jste své heslo?").getAttribute("href");
  //console.log("Forgot password? link: " + await link);

  // Login
  await emailField.fill("username");
  await passwordField.fill("password");
  await loginButton.click();

  // Print users full name
  // const currentUser = $(".navbar-right").$("strong").getText();
  /*const currentUser = "Lišák Admin"
        .locator(".navbar-right")
        .locator("strong")
        .textContent();
    console.log("Current user name:" + await currentUser);
    

    // Got to applications page
    await page.getByRole("link", {name: "Přihlášky"}).click();
    await page.waitForLoadState();
    */
});
