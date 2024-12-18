import {test, expect} from "@playwright/test";
import {username, password, userFullName, applicationsPageSize, applicationsSearchText,} from "../fixtures/fixtures.js";
import {RegExp} from "../fixtures/regular-expressions.js";

test('Should login page', async ({ page }) => {
    await page.goto('/prihlaseni');
    });
    
test('Should display error message on invalid login', async ({ page}) => {
    
    const emailField = page.getByLabel("Email");
    await expect(emailField, "email field should be visible").toBeVisible();
    await expect(emailField, "email field should be enabled").toBeEnabled();

    const passwordField = page.getByLabel("Heslo");
    await expect(passwordField, "password field should be visible").toBeVisible();
    await expect(passwordField, "password field should be enabled").toBeEnabled();

    const loginButton = page.getByRole("button", { name: "Přihlásit"});
    await expect(loginButton, "login button should be visible").toBeVisible();
    await expect(loginButton, "login button text should have text").toHaveText("Přihlásit");
    
    await emailField.fill(lisakadmin@lisakadmin);
    await passwordField.fill(password);

    const toastMessage = page.locator(".toast-message");
    const fieldError = page.locator(".invalid-feedback");
            
    await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
    await expect(fieldError).toHaveText("Tyto přihlašovací údaje neodpovídají žadnému záznamu.", { timeout: 5000 });

    await emailField.fill(username);
    await passwordField.fill(password);
    await controlPasswordField.fill(password);
    await loginButton.click()

    /*      
    const celeJmenoField = page.getByLabel("Jméno a příjmení");
    const emailField = page.getByLabel("Email");
    const passwordField = page.getByLabel("Heslo");
    const controlPasswordField = page.getByLabel("Kontrola hesla");
    const registrationButton = page.getByRole("button", { name: "Zaregistrovat"});
    console.log("Registration button text: " + await registrationButton.textContent());
    */
    const currentUser = page
        .locator(".navbar-right")
        .locator("strong");
    await expect(currentUser, "current user should be displayed").toHaveText(userFullName);
    });

test('Application Page Přihlášky', async ({ page }) => {
    await page.getByRole('link', {name: 'Přihlášky'}).click();
    await page.waitForLoadState();
    });

test('Should display application page title', async ({ page }) => {
    const loadingIndicator = page.locator('#DataTables_Table_0_processing');
    await loadingIndicator.waitFor({state: 'visible'});
    await loadingIndicator.waitFor({state: 'hidden'});

    const pageTitle = await page.getByRole("heading", {level: 1});
    await expect(pageTitle, 'page title should be displayed').toHaveText("Přihlášky");
    });

test('Should list all applications', async ({ page}) => {
    const rows = await page
        .locator('.dataTable')
        .locator('tbody')
        .locator('tr')
        .all();

    await expect(rows.length, 'table should have >= ' + applicationsPageSize + ' rows')
        .toBeGreaterThanOrEqual(applicationsPageSize);

    for (const row of rows) {
        const cells = row.locator('td');
        await expect(await cells.nth(0).textContent()).toMatch(RegExp.NAME);
        await expect(await cells.nth(1).textContent()).toMatch(RegExp.DATE);
        await expect(await cells.nth(2).textContent()).toMatch(RegExp.PAYMENT_TYPE);
        await expect(await cells.nth(3).textContent()).toMatch(RegExp.TO_PAY);
        }
});

test('Should filetr in application', async ({ page }) => {

    await page.locator("input[type='search']").fill(applicationsSearchText);
    await page.waitForLoadState()
    await loadingIndicator.waitFor({state: 'visible'});
    await loadingIndicator.waitFor({state: 'hidden'});

    const filteredRows = await page
        .locator(".dataTable")
        .locator("tbody")
        .locator("tr")
        .all();

    await expect(filteredRows.length, 'table should have < ' + applicationsPageSize + ' rows')
        .toBeLessThan(applicationsPageSize);

    for (const row of filteredRows) {
        const cells = row.locator('td');
        await expect(await cells.nth(0).textContent()).toMatch(RegExp.NAME);
        await expect(await cells.nth(1).textContent()).toMatch(RegExp.DATE);
        await expect(await cells.nth(2).textContent()).toMatch(RegExp.PAYMENT_TYPE);
        await expect(await cells.nth(3).textContent()).toMatch(RegExp.TO_PAY);
            }
});