import { test, expect } from "@playwright/test";
import {username, password, userFullName, applicationsPageSize, applicationsSearchText, validICO, invalidICO} from "../fixtures/fixtures.js";
import { RegExp } from "../fixtures/regular-expressions.js";

test.describe("Order", async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/objednavka/pridat");
    });

    test("Should navigate the order form menu", async ({ page }) => {
        await page.locator('a.nav-link.dropdown-toggle', { hasText: 'Pro učitelé '}).click();
        await page.locator('.dropdown-menu .dropdown-item', { hasText: 'Objednávka pro MŠ/ZŠ' }).click();

        //await expect(page.locator('a.dropdown-item.active')).toHaveText("Nová objednávka");
        //await page.locator('a.dropdown-item.active', { hasText: 'Nová objednávka' }).click();
        //await expect(page).toHaveURL('https://team8-2022brno.herokuapp.com/objednavka/pridat').click();
    });

    test("Should display the order form to the user", async ({ page }) => {
        const icoField = page.locator("input[id='ico']");
        const jmenoAPrijmeniField = page.locator("input[id='contact_name']");
        const telefonField = page.locator("input[id='contact_tel']");
        const emailField = page.locator("input[id='contact_mail']");
        const item = page.locator('.dropdown-item');

        await page.locator('a.nav-link.dropdown-toggle', { hasText: 'Pro učitelé' }).click();
        await page.locator('.dropdown-menu .dropdown-item', { hasText: 'Objednávka pro MŠ/ZŠ' }).click();

        await expect(page.locator("input[id='ico']")).toBeVisible();
        await expect(page.locator("input[id='ico']")).toBeEnabled();

        await expect(page.locator("input[id='contact_name']")).toBeVisible();
        await expect(page.locator("input[id='contact_name']")).toBeEnabled();

        await expect(page.locator("input[id='contact_tel']")).toBeVisible();
        await expect(page.locator("input[id='contact_tel']")).toBeEnabled();

        await expect(page.locator("input[id='contact_mail']")).toBeVisible();
        await expect(page.locator("input[id='contact_mail']")).toBeEnabled();
    });

    test("Should validate incorrect ICO", async ({ page }) => {
        const icoField = page.locator("input[id='ico']");
        const toastMessage = page.locator(".toast-message");

        await icoField.fill(invalidICO);
        await icoField.press('Enter');

        await toastMessage.waitFor({ state: 'visible', timeout: 10000 });
        await expect(toastMessage).toHaveText("IČO nenalezeno, zkontrolujte jej prosím");
    });

    test("Should validate input fields", async ({ page }) => {
        const emailField = page.locator("input[id='contact_mail']");
        const fieldError = page.locator(".invalid-feedback");

        await emailField.fill("zvitkovacentrum.cz");
        await emailField.press('Enter');
        await fieldError.waitFor({ state: 'visible', timeout: 5000 });
        await expect(fieldError).toHaveText("Zadejte prosím platnou e-mailovou adresu.");
    });

    test("Should not send order when does not fill everything", async ({ page }) => {
        //Data z ARESu se nepodařilo načíst, vyplňte je prosím ručně
        const icoField = page.locator("input[id='ico']");
        const odberatelField = page.locator("input[id='client']");
        const adresaField = page.locator("input[id='address']");
        const bossField = page.locator("input[id='substitute']");
        const jmenoAPrijmeniField = page.locator("input[id='contact_name']");
        const telefonField = page.locator("input[id='contact_tel']");
        const fieldError = page.locator(".invalid-feedback");

        await icoField.fill(validICO);
        await odberatelField.fill("Jan Havel");
        await adresaField.fill("Pražská 56");
        await bossField.fill("Jan Havel");
        await jmenoAPrijmeniField.fill("Jan Havel");
        await telefonField.fill("376321321");
        
        await page.click('a#nav-home-tab');
        await page.click('input[type="submit"][value="Uložit objednávku"]');
        //await expect('#email + .error-message').textContent();
        //await expect(fieldError).toHaveText("Vyplňte prosím toto pole.");
        await expect(page.locator('text=Vyplňte prosím toto pole')).toBeVisible();
    });
    
    test("Fill in an order and submit", async ({ page }) => {

        const icoField = page.locator("input[id='ico']");
        const odberatelField = page.locator("input[id='client']");
        const adresaField = page.locator("input[id='address']");
        const bossField = page.locator("input[id='substitute']")
        const jmenoAPrijmeniField = page.locator("input[id='contact_name']");
        const telefonField = page.locator("input[id='contact_tel']");
        const emailField = page.locator("input[id='contact_mail']");
        const dateOneField = page.locator("input[id='start_date_1']");
        const dateTwoField = page.locator("input[id='end_date_1']");
        const submitButton = page.locator("input[name='camp'][value='Uložit objednávku']");
        const toastText = await page.locator('.alert').textContent();
        console.log(toastText);

        await icoField.fill(validICO);
        await odberatelField.fill("Jan Havel");
        await adresaField.fill("Pražská 56");
        await bossField.fill("Jan Havel");
        await jmenoAPrijmeniField.fill("Jan Havel");
        await telefonField.fill("376321321");
        await emailField.fill("zahada@inox.cz");
        await dateOneField.fill("01.07.2025");
        await dateTwoField.fill("11.07.2025");

        const summerCampLink = page.locator('a.nav-item.nav-link', { hasText: 'Příměstský tábor' });
        await summerCampLink.click();

        await submitButton.waitFor({ state: 'visible', timeout: 10000 });
        await expect(submitButton).toBeEnabled();
        await submitButton.click();
        await expect(page.locator(".alert-success")).toHaveText("Objednávka byla úspěšně odeslána.");
    });
    
});