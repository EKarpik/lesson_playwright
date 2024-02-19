const BasePage = require("./base-page");

class LoginPage extends BasePage {
    //все полезные локаторы со страницы логина здесь
    constructor(page) {
        super(page);
        this._inputEmail = page.locator('#username');
        this._inputPassword = page.locator('#password');
        this._loginBtn = page.locator('#kc-login');
        this._forgotPassword = page.getByRole("link", {name: "Forgot Password?"})
        this._supportMail = page.getByRole("link", {name: "help@r1.team"})

    }

    //ввод лоигна и пароля
    async fillLoginForm(login, password) {
        await this._inputEmail.fill(login);
        await this._inputPassword.fill(password);
    };

    //нажимаем кнопку лоигна в ЛК
    async clickLoginBtn() {
        await this._loginBtn.click();
    };

    async fullLogin(login, password) {
        await this.open('/');
        await this.fillLoginForm(login, password);
        await this.clickLoginBtn();

    };
}

module.exports = LoginPage;
