import { test, expect } from "@playwright/test";
import {username, password, userFullName, applicationsPageSize, applicationsSearchText, validICO, invalidICO} from "../fixtures/fixtures.js";
import { RegExp } from "../fixtures/regular-expressions.js";

test.describe("Order", async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/objednavka/pridat");
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

    test("Fill in an order", async ({ page }) => {

        const icoField = page.locator("input[id='ico']");
        const jmenoAPrijmeniField = page.locator("input[id='contact_name']");
        const telefonField = page.locator("input[id='contact_tel']");
        const emailField = page.locator("input[id='contact_mail']");
        
        await icoField.fill("26368005");
        await jmenoAPrijmeniField.fill("Jan Havel");
        await telefonField.fill("376321321");
        await emailField.fill("zahada@inox.cz");

    });

    test("Create an order", async ({ page }) => {

        await page.locator('input[name="camp"][value="Uložit objednávku"]').click();
    });

    test("Should validate input fields", async ({ page }) => {
        const emailField = page.locator("input[id='contact_mail']");
        const fieldError = page.locator(".invalid-feedback");

        await emailField.fill("zvitkovacentrum.cz");
        await expect(fieldError).toHaveText("Zadejte prosím platnou e-mailovou adresu.");
    });

});