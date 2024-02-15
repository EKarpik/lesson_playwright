const LoginPage = require("../login-page");

class Header {
    constructor(page) {
        this.page = page;
        this._sideBarOpen = page.locator("[data-qa = 'Button']");
        this._logo = page.locator("[data-qa = 'Logo']");
        this._switchToSupport = page.locator("[data-qa = 'SupportSwitcher']") //только для  монтажников
        this._profileSwitcher = page.locator("[data-qa = 'SwitcherMenu']");
        this._notifications = page.locator("[data-qa = 'NotificationBing']");
        this._profileBtn = page.locator("[data-qa = 'ProfileCircle']");
        this._profileManu = page.locator("[data-qa = 'profile']");
        this._logoutManu = page.locator("[data-qa = 'logout']");
        this._concierge = page.getByRole("button", {name: "Онлайн-консьерж"})

    }

    // async clickSearchBtn() {
    //     await this._searchBtn.click();
    //     return new SearchPage(this.page);
    // }

    //развернуть сайдбар
    async openPageSettingMenu() {
        await this._sideBarOpen.click()
    }

    //зайти в профиль юзера по лого
    async userProfileBtn() {
        await this._profileBtn.click();
    }

    //зайти в профиль юзера через менюшку
    async userProfileMenu() {
        await this._profileBtn.moveTo();
        await this._profileManu.click();
    };

    //разлогин
    async logout() {
        await this._profileBtn.moveTo();
        await this._logoutManu.click();
    };

    //видим логотип провайдера дом.ру
    async viewLogo() {
        await this._logo.toBeVisible();

    };

    // //проверяем цвет кнопки консьержа
    // async conciergeBtnColor(display, flex) {
    //     await expect(this._concierge).toHaveCSS(display, flex);
    //
    // };


}

module.exports = Header;
