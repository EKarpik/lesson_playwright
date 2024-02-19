const {test, expect} = require("@playwright/test");
const LoginPage = require("../pages/login-page");
const MountersPage = require("../pages/mounters-main");
const {faker} = require("@faker-js/faker");

let innValue = faker.string.octal({ length: 12 })
let companyName = faker.company.name();
let userName = faker.person.firstName();
let userEmail = faker.internet.email();
//let allPermissionCheckbox =  page.locator('//input[@type='checkbox'][1]')';



test('Create new UK company', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.fullLogin('forlena', '0000');
    await page.goto('/company');

    //экран заполнение полей для создания новой управляющей компании
    const mountersPage = new MountersPage(page);
    await mountersPage.clickAddCompanyIcon();//открываем форму через иконку вверу страницы
    await mountersPage.fillCreatCompanyForm('Управляющая компания', innValue, companyName, 'Пермь'); //вызываем функцию заполняющую формы для создния компании
    await mountersPage.pushBtn(mountersPage.continueBtn); //проверяем, что кнопка красная и нажимаем

    //экран заполнение полей для создания владельца управляющей компании
    await mountersPage.fillCreatOwner(userName, userEmail);
    await mountersPage.pushBtn(mountersPage.continueBtn);//проверяем, что кнопка красная и нажимаем

    //экран провреки содаваемой УК
    await mountersPage.pushBtn(mountersPage.doneBtn); //проверяем, что кнопка красная и нажимаем


})