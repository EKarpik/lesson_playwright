const Header = require("./fragments/header");
const BasePage = require("./base-page");

class MainPage extends BasePage {

    constructor(page) {
        super(page);
        this.header = new Header(page);

        //локаторы
        this._firstArticle = page.locator('[class=tm-articles-list__item] [class*=tm-title_h2]').first();
    }


}

module.exports = MainPage;