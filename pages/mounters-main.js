const BasePage = require("./base-page");
const {expect} = require("@playwright/test");

class MountersPage extends BasePage {
    //все полезные локаторы со страницы монтажника здесь
    constructor(page) {
        super(page);
        this.addCompanyBtn = page.getByRole("button", {name: "Добавить УК"});
        this.chooseCompanyType = page.locator("[name='type']");
        this.continueBtn = page.getByRole("button", {name: "Продолжить"});
        this.doneBtn = page.getByRole("button", {name: "Готово"});

    }

    //заполнение полей для создания новой управляющей компании
    async fillCreatCompanyForm(ukType, inn, companyName, city) {
        await this.page.locator("[name='type']").click();
        await this.page.getByText(ukType, {exact: true}).click();
        await this.page.locator("[name='inn']").fill(inn);
        await this.page.locator("[name='name']").fill(`автотест ${companyName}`);
        await this.page.locator("[name='locationName']").fill(city);
        await this.page.getByText('г Пермь').dblclick();
        };

    //заполнение полей для создания владельца управляющей компании
    async fillCreatOwner(ownerName, ownerEmail) {
        await this.page.locator("[name='userName']").fill(`автоимя${ownerName}`);
        await this.page.getByText("Все функции").setChecked(true);
        await this.page.locator("[data-qa=\"EmailSuggest\"]").fill(`auto${ownerEmail}`);
        await this.page.getByText(`auto${ownerEmail}`).click();
    };

    //нажимаем ИКОНКУ Создать УК
    async clickAddCompanyIcon() {
        await this.addCompanyBtn.first().click();
    };

    //нажимаем кнопку Создать УК
    // async clickAddCompanyBtn() {
    //     await this.addCompanyBtn.second().click();
    // };

    //проевряем, что кнопка красная (активна) и нажимаем её
    async pushBtn(btnName) {
        await expect(btnName).toHaveCSS('background-color', 'rgb(255, 49, 44)');
        await btnName.click();
    };

}


module.exports = MountersPage;