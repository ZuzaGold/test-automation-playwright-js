import { AppPage } from "./app.page.js"

//const { expect } = require("@playwright/test");
//const { applicationsSearchText } = require("../../../fixtures/fixtures.js");

export class ApplicationsPage extends AppPage {
    constructor(page) {
        super(page, "/admin/prihlasky");
        this.page = page;
        this.applicationsLink = this.page.getByRole("link", {name: "Přihlášky"});
        this.loadingIndicator = this.page.locator("#DataTables_Table_0_processing");
        this.applicationsTable = this.page.locator(".dataTable");
        this.applicationsTableRows = this.applicationsTable.locator("tbody").locator("tr");
        this.searchField = this.page.locator("input[type='search']");
    }

    async goToApplicationsPage() {
        await this.applicationsLink.click();
    }

    async waitForTableToLoad() {
        await this.page.waitForLoadState();
        await this.loadingIndicator.waitFor({state: "hidden"});
    }

    async getApplicationsTableRows() {
        await this.waitForTableToLoad();
        const rows = await this.applicationsTableRows.all();
        return Promise.all(rows.map(async row => new TableRow(this.page, row)));
    }

    async searchInApplicationsTable(text) {
        await this.searchField.fill(text);
        await this.loadingIndicator.waitFor({state: "hidden" });
    }
}

export class TableRow extends AppPage {
    constructor(page, rowElement) {
        super(page);
        this.page = page;
        this.rowElement = rowElement;
    }

    async getValues() {
        const cells = await this.rowElement.locator("td");
        return {
            name: await cells.nth(0).textContent(),
            date: await cells.nth(1).textContent(),
            paymentType: await cells.nth(2).textContent(),
            toPay: await cells.nth(3).textContent(),
        };
    }

    async getInfo() {
        await this.rowElement.locator('[data-can="view"]').click();
        return new ApplicationInfoPage();
    }
}

class ApplicationInfoPage {
    get table() {
        return $(".table-twocols");
    }
    
    async getDetail() {
        return Promise.all(
            await this.table.$$("tr").map(async (row) => {
                return Promise.all(
                    await row.$$("td").map(async (col) => {
                        return await col.getText();
                    }),
                );
            }),
        );
    }
}
