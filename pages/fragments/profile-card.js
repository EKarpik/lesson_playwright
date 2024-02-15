const LoginPage = require("../login-page");
const MainPage = require("../main-page");

class ProfileCard{
    constructor(page) {
        this.page = page;
        this._imputPosition = page.locator("input[name='position']");
        this._imputFio = page.locator("input[name='fio']");
        this._imputEmail = page.locator("[data-qa='EmailSuggest']");
        this._imputPhone = page.locator("[data-qa = 'phone']");
        this._saveBtn = page.locator("button[type='submit']");

    }

    //изменить должность
    async changeName(newName) {
        await this._imputFio.fill(newName)
      };

    //сохранить изменения в профиле
    async saveProfileChanges() {
        await this._saveBtn.click();
    };
}


    module.exports = ProfileCard;