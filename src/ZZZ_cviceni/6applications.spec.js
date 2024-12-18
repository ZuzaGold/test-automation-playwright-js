import { test, expect } from "@playwright/test";
import {
  username,
  password,
  userFullName,
  applicationsPageSize,
  applicationsSearchText,
} from "../fixtures/fixtures.js";
import { RegExp } from "../fixtures/regular-expressions.js";

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

  await page.goto("/admin/prihlasky");
  // Got to applications page
  const prihlaskyLink = page.getByRole("link", { name: "Přihlášky" });
  console.log("Prihlasky link text: " + (await prihlaskyLink.textContent()));

  // Check page title
  console.log(
    "Přihlášky " +
      (await page.getByRole("heading", { level: 1 }).textContent()),
  );

  // Print all applications
  const rows = await page
    .locator(".dataTable")
    .locator("tbody")
    .locator("tr")
    .all();
  console.log("There are " + rows.length + " rows in the table");
  for (const row of rows) {
    //console.log(await row.textContent());
    const cells = row.locator("td");
    console.log(await cells.nth(0).textContent());
  }

  // Optional: filter the applications table
  await page.locator("input[type='search']").fill("mar");
  await page.waitForLoadState();

  const filteredRows = await page
    .locator(".dataTable")
    .locator("tbody")
    .locator("tr")
    .all();

  console.log(
    "There are " + filteredRows.lenght + " filtered rows in the table",
  );
  for (const row of filteredRows) {
    console.log(await row.textContent("mar"));
  }
});
