import { expect, test } from "@playwright/test";
import {
  ApplicationTexts,
  applicationsPageSize,
  applicationsSearchText,
  password,
  username,
} from "../fixtures/fixtures.js";
import { RegExp } from "../fixtures/regular-expressions.js";
import { ApplicationsPage } from "./applications.page.js";
import { LoginPage } from "./login.page.js";

test.describe("Applications Page", async () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const applicationsPage = new ApplicationsPage(page);

    await loginPage.open();
    await loginPage.login(username, password);
    await applicationsPage.goToApplicationsPage();
    await test
      .expect(page)
      .toHaveTitle(ApplicationTexts.applicationsPage.title);
  });

  test("should list all applications", async ({ page }) => {
    const applicationsPage = new ApplicationsPage(page);

    const allRows = await applicationsPage.getApplicationsTableRows();
    await expect(
      allRows.length,
      "table should have >= " + applicationsPageSize + " rows",
    ).toBeGreaterThanOrEqual(applicationsPageSize);

    for (const row of allRows) {
      const values = await row.getValues();
      await expect(values.name).toMatch(RegExp.NAME);
      await expect(values.date).toMatch(RegExp.DATE);
      await expect(values.paymentType).toMatch(RegExp.PAYMENT_TYPE);
      await expect(values.toPay).toMatch(RegExp.TO_PAY);
    }
  });

  test("should filter in applications", async ({ page }) => {
    const applicationsPage = new ApplicationsPage(page);
    const allRows = await applicationsPage.getApplicationsTableRows();

    await expect(
      allRows.length,
      "table should have >= " + applicationsPageSize + " rows",
    ).toBeGreaterThanOrEqual(applicationsPageSize);
    await applicationsPage.searchInApplicationsTable(applicationsSearchText);
    await applicationsPage.waitForTableToLoad();

    const filteredRows = await applicationsPage.getApplicationsTableRows();
    await expect(
      filteredRows.length,
      "table should have < " + allRows.length + " rows",
    ).toBeLessThan(allRows.length);

    for (const row of filteredRows) {
      const values = await row.getValues();
      await expect(values.name.toLowerCase()).toContain(
        applicationsSearchText.toLowerCase(),
      );
    }
  });

  test("should open application detail", async ({ page }) => {
    const applicationsPage = new ApplicationsPage(page);
    const thirdRow = (await applicationsPage.getApplicationsTableRows())[2];
    const values = await thirdRow.getValues();
    console.log(values);
    const [lastName, firstName, secondName] = await thirdRow
      .getValues()
      .name.split(" ");

    const applicationsDetailPage = await thirdRow.getInfo();
    const applicationDetail = await applicationsDetailPage.getDetail();

    await expect(applicationDetail).toContainEqual([
      "Křestní jméno žáka:",
      [firstName, secondName].join(" "),
    ]);
    await expect(applicationDetail).toContainEqual([
      "Příjmení žáka:",
      lastName,
    ]);
  });
});
