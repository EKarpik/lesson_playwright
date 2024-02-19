const { faker } = require('@faker-js/faker');
const {test, expect} = require('@playwright/test');
const MainPage = require('../pages/main-page');
const LoginPage = require('../pages/login-page');
const Header = require('../pages/fragments/header');
const ProfileCard = require('../pages/fragments/profile-card')
const DevicePage = require('../pages/device-page')


let profile_fio = faker.person.fullName();


test('Change User profile info', async ({page}) => {
    const loginPage = new LoginPage(page);//залогинились
    await loginPage.open('/');
    await loginPage.fillLoginForm('reader1', 'Pass12!@');
    await loginPage.clickLoginBtn();
    await page.waitForURL('/');

    const header = new Header(page);//переход в профиль юзера
    await header.userProfileBtn();

    const profileCard = new ProfileCard(page);//меняем ФИО в порфиле юзера
    await expect(page.locator("//input[@name='fio']")).toBeVisible();
    await profileCard.changeName(`имя_из_автотестов ${profile_fio}`);
    await profileCard.saveProfileChanges();
    await expect(page.locator("div[class*='enter-done']")).toHaveText('Изменения сохранены');
})