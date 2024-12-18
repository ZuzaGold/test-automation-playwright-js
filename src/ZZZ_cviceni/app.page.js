export class NavbarRight {

    constructor(page) {
        this.page = page;
        this.navbarRightLocator = this.page.locator(".navbar-right");
        this.usernameDropdownLocator = this.navbarRightLocator.locator('[data-toggle="dropdown"]');
        this.logoutLinkLocator = this.page.locator("#logout-link");
    }
}

export class AppPage {

    constructor(page, url) {
        this.page = page;
        this.url = url;
        this.navbarRight = new NavbarRight(page);
        this.toastLocator = this.page.locator(".toast-message");
        this.fieldErrorLocator = this.page.locator(".invalid-feedback");
        this.navbarRightLocator = this.page.locator(".navbar-right");
        this.usernameDropdownLocator = this.navbarRightLocator.locator('[data-toggle="dropdown"]');
        this.logoutLinkLocator = this.page.locator("#logout-link");
    }

    async open() {
        await this.page.goto("/" + this.url);
    }

    async getToastMessage() {
        return await this.toastLocator.textContent();
    }
    
    async logout() {
        await this.usernameDropdownLocator.click();
        await this.logoutLinkLocator.click();
    }

    async getCurrentUser() {
        return await this.usernameDropdownLocator.textContent();
    }
};
