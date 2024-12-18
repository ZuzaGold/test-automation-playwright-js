import { expect, test } from "@playwright/test";
import { password, userFullName, username } from "../fixtures/fixtures.js";

async function openLoginPage(page) {
  await page.goto("/prihlaseni");
}

async function login(page, username, password) {
  const emailField = page.getByLabel("Email");
  const passwordField = page.getByLabel("Heslo");
  const loginButton = page.getByRole("button", { name: "Přihlásit" });

  await emailField.fill(username);
  await passwordField.fill(password);
  await loginButton.click();
}

async function goToApplications(page) {
  await page.goto("/admin/prihlasky");
}

async function getTableRows(page) {
  return await page.locator(".dataTable").locator("tbody").locator("tr").all();
}

async function searchInTable(page, searchText) {
  const searchInput = page.locator("input[type='search']");
  await searchInput.fill(searchText);
}

async function waitForTableToLoad(page) {
  await page.waitForLoadState();
}

test("should login and interact with applications", async ({ page }) => {
  await openLoginPage(page);
  await login(page, username, password);

  const currentUser = page.locator(".navbar-right").locator("strong");
  await expect(currentUser, "current user should be displayed").toHaveText(
    userFullName,
  );
  await goToApplications(page);

  const prihlaskyLink = page.getByRole("link", { name: "Přihlášky" });
  console.log("Prihlasky link text: " + (await prihlaskyLink.textContent()));
  console.log(
    "Přihlášky " +
      (await page.getByRole("heading", { level: 1 }).textContent()),
  );

  const prihlaskyLinkCount = await page
    .getByRole("link", { name: "Přihlášky" })
    .count();
  console.log("Počet odkazů 'Přihlášky': " + prihlaskyLinkCount);

  const rows = await getTableRows(page);
  console.log("There are " + rows.length + " rows in the table");
  for (const row of rows) {
    const cells = row.locator("td");
    console.log(await cells.nth(0).textContent());
  }

  await searchInTable(page, "mar");

  await waitForTableToLoad(page);

  const filteredRows = await getTableRows(page);
  console.log(
    "There are " + filteredRows.length + " filtered rows in the table",
  );
  for (const row of filteredRows) {
    console.log(await row.textContent());
  }
  await waitForTableToLoad(page);
});
