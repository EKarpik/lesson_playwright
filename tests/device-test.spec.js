const {test, expect} = require("@playwright/test");
const LoginPage = require("../pages/login-page");
const DevicePage = require("../pages/device-page");
const Header = require("../pages/fragments/header");

test('Device search by name', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.fullLogin('reader1', 'Pass12!@');

    await page.goto('/objects');//переход на страницу устройств и ввод в поиск
    const devicePage = new DevicePage(page);
    await devicePage.fillSearchInput('рограммистов')
    let firstSearchResult = page.locator("[data-qa = 'DeviceName']").first()
    await expect(firstSearchResult).toHaveText(/рограммистов/);

})

test('Online concierge is activated', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.fullLogin('reader1', 'Pass12!@');

    //const header = new Header(page);
    await expect(page.locator("[data-qa = 'Call']")).toBeVisible();
    //await expect(header.conciergeBtnColor('background-color', 'rgb(16, 178, 120)').;
    await expect(page.getByRole("button", {name: "Онлайн-консьерж"})).toHaveCSS('background-color', 'rgb(16, 178, 120)');
})



