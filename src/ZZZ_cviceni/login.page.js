// Page object describing the login page
import { AppPage } from "./app.page.js"

export class LoginPage extends AppPage {

    constructor(page) {
        super(page);
        this.page = page;
        this.emailFieldLocator = this.page.getByLabel("Email");
        this.passwordFieldLocator = this.page.getByLabel("Heslo");
        this.loginButtonLocator = this.page.getByRole("button", { name: "Přihlásit" });
        this.toastLocator = this.page.locator(".toast-message");
        this.fieldErrorLocator = this.page.locator(".invalid-feedback");
        this.navbarRightLocator = this.page.locator(".navbar-right");
        //this.usernameDropdownLocator = this.page.locator(".navbar-right").locator('[data-toggle="dropdown"]');
        //this.logoutLinkLocator = this.page.locator("#logout-link");
    }

    async open() {
        await this.page.goto("/prihlaseni");
      }

    async login(username, password) {
        await this.emailFieldLocator.fill(username);
        await this.passwordFieldLocator.fill(password);
        await this.loginButtonLocator.click();
        //await this.emailFieldLocator.fill("lisakadmin@lisakadmin");
        //await this.toastLocator.toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
        //await this.fieldErrorLocator.toHaveText("Tyto přihlašovací údaje neodpovídají žadnému záznamu.");
        //await this.usernameDropdownLocator.click();
        //await this.logoutLinkLocator.click();
        //await this.navbarRightLocator.toHaveText("Přihlásit");
    }
}

