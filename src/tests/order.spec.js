import { test, expect } from "@playwright/test";
import {username, password, userFullName, applicationsPageSize, applicationsSearchText, validICO, invalidICO} from "../fixtures/fixtures.js";
import { RegExp } from "../fixtures/regular-expressions.js";

//TODO: Napisu ti souhrny komentar sem: Prosim zkus to jeste jednou a lepe, vim, ze to umis lepe :). To, ze jsi nepouzila Page objects je tva volba a v poradku.
// Bohuzel, ale vidim pomerne slabe pokryti testy. V podstate pouze testujes, ze se ti zobrazi formular a muzes tam neco vyplnit.
// Chybi zde: vyplnis formular a zkontrolujes, ze je vyplnen. Negativni scenare, pokud je neco spatne vyplneno, ze se objednavka nevytvori.
// je zde pouze test na emailove policko - rozsirit, nebo pridat testy na ostatni pole.
// test "Create an order" dela pouze klik, ale urcite neudela celou objednavku.
// Chybi test na menu viz zadani:
// Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové Objednávky pro MŠ/ZŠ
// Po kliknutí na Pro učitele > Objednávka pro MŠ/ZŠ se otevře formulář, kde může uživatel vyplnit detail objednávky
// Po vyplnění IČO do formuláře objednávky se automaticky načte jméno odběratele a adresa odběratele z ARESu - zmenit na, ze to vyhodi chybu
// Uživatel může odeslat vyplněnou objednávku na příměstský tábor
// Objednávku nelze odeslat pokud není řádně vyplněna
// Potřebujeme otestovat že navigace v aplikaci funguje, proto se do formuláře objednávky alespoň v jednom testu proklikej přes navigační menu.
// Pokud máš testů více můžeš použít navigaci přes adresu, pokud alespoň jeden dest pokryje menu.

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
