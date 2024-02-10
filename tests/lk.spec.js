// @ts-check
const { test, expect } = require('@playwright/test');

test('старотовая страница авторизации', async ({ page }) => {
  await page.goto('https://frontend.test.lk-team.pro/');
  // Expect a title "to contain" a substring.
  await expect(page.locator('#kc-page-title')).toBeVisible()
  await expect(page.locator('#username')).toBeVisible()
  await expect(page.locator('#password')).toBeVisible()
});

test('забыли пароль ', async ({ page }) => {
    await page.goto('https://frontend.test.lk-team.pro/');
    //кликаем на забыл пароль
 await page.getByRole("link", {name: "Forgot Password?"}).click();
 //await page.waitForFunction(() => document.fonts.ready);
 await expect(page).toHaveURL*('https://keycloak.stage.platform.r-one.io/realms/lk/login-actions/reset-credentials');
 await expect(page.locator('#username')).toBeVisible();
 await page.locator('#username').fill('newhouse');
 await page.locator('xpath=//input[@type=\'submit\']').click();
 await expect(page.locator('span.pficon.pficon-ok')).toBeVisible()
 await page.getByRole('"link", {name: "« Back to Login"}').click;
});

test('вспомнили пароль', async ({page})=> {
    await page.goto('https://frontend.test.lk-team.pro/');
    //кликаем на забыл пароль
    await page.getByRole("link", {name: "Forgot Password?"}).click();
    //await page.waitForFunction(() => document.fonts.ready);
    await expect(page).toHaveURL*('https://keycloak.stage.platform.r-one.io/realms/lk/login-actions/reset-credentials');
    await page.locator('#kc-reset-password-form a').click();
    await expect(page.locator('#kc-page-title')).toBeVisible();
});

test('неверный пароль', async ({page})=> {
    await page.goto('https://frontend.test.lk-team.pro/');
    await page.locator('#username').fill('newhouce');
    await page.locator('#password').fill('error');
    await page.locator('#kc-login').click();
    await expect(page.getByText("Invalid username or password.")).toBeVisible();
});

test('письмо в поддержку', async ({page})=> {
    await page.goto('https://frontend.test.lk-team.pro/');
    //кликаем на help@r1.team
       await page.locator('xpath=//a[@href=\'mailto:help@r1.team\']').click();
    // а как проверить, что был совершён переход в почтовый клиент, я не знаю???
});

// test.skip('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();
//
//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
//
// test.skip("check bookstore list", async ({page}) => {
//   await page.goto('https://demoqa.com/books/');
//   //console.log('page load');
//   //await page.waitForTimeout( 5000 )
//   // await page.locator('.ReactTable').waitFor({state: "visible"});
//   const table =  await page.locator('.ReactTable');
//   console.log('элемент получен', table);
//   await table.waitFor({state: "visible"});
//   console.log('элемент видим', table);
//
//   await page.locator('[id="see-book-Git Pocket Guide"]').click();
//   await expect(page.locator('#userName-value').first()).toBeVisible();
//   await expect(page).toHaveURL('https://demoqa.com/books?book=9781449325862');
//   //await page.goto('https://demoqa.com/books?book=9781449325862');
//   await page.waitForFunction(() => document.fonts.ready);
//
//   await expect(page.locator('[class*=profile-wrapper]')).toBeVisible()
//   await expect(page.locator('.books-wrapper')).toHaveScreenshot("book-description.png")
//
//
// });