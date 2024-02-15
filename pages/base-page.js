const Header = require("./fragments/header");

class BasePage {
    constructor(page) {
        this.page = page;
    }

    async open(url) {
        await this.page.goto(url);
    }

    // async changeLangCookie(lang) {
    //     return null
    //
    // }
}
module .exports = BasePage;
