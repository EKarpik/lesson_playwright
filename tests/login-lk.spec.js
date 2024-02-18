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
    await loginPage.open('/');
    await loginPage.fillLoginForm('test', 'test12345');
    await loginPage.clickLoginBtn();
    await expect(page.getByText("Invalid username or password.")).toBeVisible();
})

test('User Login', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.open('/');
    await loginPage.fillLoginForm('reader1', 'Pass12!@');
    await loginPage.clickLoginBtn();
    await page.waitForURL('/');

    const header = new Header(page);
    await expect(page.locator("[data-qa = 'SwitcherMenu']")).toBeVisible();
})


test('Login to Mounters profile', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.open('/');
        await loginPage.fillLoginForm('forlena', '0000');
        await loginPage.clickLoginBtn();
        await page.waitForURL('/');

    const header = new Header(page);
    await expect(page.locator("[data-qa = 'SupportSwitcher']")).toBeVisible();
})

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

test('Device search by name', async ({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.open('/');
    await loginPage.fillLoginForm('reader1', 'Pass12!@');
    await loginPage.clickLoginBtn();

    await page.goto('/objects');//переход на страницу устройств и ввод в поиск
    const devicePage = new DevicePage(page);
    await devicePage.fillSearchInput('рограммистов')
    let firstSearchResult = page.locator("[data-qa = 'DeviceName']").first()
    await expect(firstSearchResult).toHaveText(/рограммистов/);

//здесь нужен новый локатор

})

test('Online concierge is activated', async ({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.open('/');
    await loginPage.fillLoginForm('reader1', 'Pass12!@');
    await loginPage.clickLoginBtn();
    
    const header = new Header(page);
    await expect(page.locator("[data-qa = 'Call']")).toBeVisible();
    //await expect(header.conciergeBtnColor('background-color', 'rgb(16, 178, 120)').;
    await expect(page.getByRole("button", {name: "Онлайн-консьерж"})).toHaveCSS('background-color', 'rgb(16, 178, 120)');

})



