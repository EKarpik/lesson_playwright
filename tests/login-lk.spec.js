const { faker } = require('@faker-js/faker');
const {test, expect} = require('@playwright/test');
const MainPage = require('../pages/main-page');
const LoginPage = require('../pages/login-page');
const Header = require('../pages/fragments/header');
const ProfileCard = require('../pages/fragments/profile-card')
const DevicePage = require('../pages/device-page')


let profile_fio = faker.person.fullName();

test('Login. Wrong credentials.', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.fullLogin('test', 'test12345');
    await expect(page.getByText("Invalid username or password.")).toBeVisible();
})

test('User Login', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.fullLogin('reader1', 'Pass12!@');
    //проверяем, что вход выполнен именно на фронт в ЛК УК
    await expect(page.locator("[data-qa = 'SwitcherMenu']")).toBeVisible();
})

test('Login to Mounters profile', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.fullLogin('forlena', '0000');

    //проверяем, что вход выполнен на фронт монтажника
    await expect(page.locator("[data-qa = 'SupportSwitcher']")).toBeVisible();
})


