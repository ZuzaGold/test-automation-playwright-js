import { test, expect } from "@playwright/test";
import {username, password, userFullName, applicationsPageSize, applicationsSearchText} from "../fixtures/fixtures.js";

test.describe("Should testing Registration page", () => {

    function getUserFullNameField(page) {
        return page.getByLabel("Jméno a příjmení")
    }

    function getEmailField(page) {
        return page.getByLabel("Email");
    }

    function getPasswordField(page) {
        return page.getByLabel("Heslo");
    }

    function getPasswordVerificationField(page) {
        return page.getByLabel("Kontrola hesla");
    }

    function getRegistrationButton(page) {
        return page.getByRole("button", { name: "Zaregistrovat"});
    }

    test.beforeEach("Go to Registration page", async ({ page }) => {
        await page.goto("/registrace");
    });

    test("Registration should be successfull", async ({ page }) => {
        await test.step("VALID registration data", async () => {
            const newUserFullName = "Zuzana Goldová";
            const newUserName = "ZuzanaGo@czechitas.cz";
            const newPassword = "Czechitas2"

            await getUserFullNameField(page).fill(newUserFullName);
            await getEmailField(page).fill(newUserName);
            await getPasswordField(page).fill(newPassword);
            await getPasswordVerificationField(page).fill(newPassword);
            await getRegistrationButton(page).click();
        });

        await test.step("Verification of Registration", async () => {
            const currentUser = await page
                .locator(".navbar-right")
                .locator("strong")
                .textContent();

            expect(currentUser).toBe("Zuzana Goldová");
        });

        await test.step("Screenshot of successfull registration", async () => {
            await page.screenshot({ path: "registration_successful_ZuzanaGoldova.png" });
        });
    });

    test("Registration with INVALID data", async ({ page }) => {

        const existingEmail = "Zuzana123@seznam.cz";
        const invalidEmail = "lisakadmin@lisakadmin";
        const invalidPassword = "123456";
        const newUserFullName = "Zuza Goldová";
        const newPassword = "Czechitas1"
        const newUserName = "ZuzanaG@czechitas.cz";

        await test.step('Fill registration data with EXISTING email', async() => {

            await getUserFullNameField(page).fill(newUserFullName);
            await getEmailField(page).fill(existingEmail);
            await getPasswordField(page).fill(newPassword);
            await getPasswordVerificationField(page).fill(newPassword);
            await getRegistrationButton(page).click();

            const toastMessage = page.locator(".toast-message");
            const fieldError = page.locator(".invalid-feedback");

                await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
                await expect(fieldError).toHaveText("Účet s tímto emailem již existuje.");
            });

        await test.step("Fill registration data with INVALID email", async ({ page }) => {

            await getUserFullNameField(page).fill(newUserFullName);
            await getEmailField(page).fill(invalidEmail);
            await getPasswordField(page).fill(newPassword);
            await getPasswordVerificationField(page).fill(newPassword);
            await getRegistrationButton(page).click();

            const toastMessage = page.locator(".toast-message");
            const fieldError = page.locator(".invalid-feedback");

                await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
                await expect(fieldError).toHaveText("Zadaná adresa neexistuje, zkontrolujte překlepy");
            });

        await test.step("Fill registration data with INVALID password", async ({ page }) => {

            await getUserFullNameField(page).fill(newUserFullName);
            await getEmailField(page).fill(newUserName);
            await getPasswordField(page).fill(invalidPassword);
            await getPasswordVerificationField(page).fill(invalidPassword);
            await getRegistrationButton(page).click();

            const toastMessage = page.locator(".toast-message");
            const fieldError = page.locator(".invalid-feedback");

                await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
                await expect(fieldError).toHaveText("Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici");
            });

        await test.step("Fill registration data with INVALID password verification", async ({ page }) => {
    
            await getUserFullNameField(page).fill(newUserFullName);
            await getEmailField(page).fill(newUserName);
            await getPasswordField(page).fill(password);
            await getPasswordVerificationField(page).fill(invalidPassword);
            await getRegistrationButton(page).click();

            const toastMessage = page.locator(".toast-message");
            const fieldError = page.locator(".invalid-feedback");

                await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
                await expect(fieldError).toHaveText("Hesla se neshodují");
            });
    });
});