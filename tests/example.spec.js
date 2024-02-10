// @ts-check
const { test, expect } = require('@playwright/test');

test.skip('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.skip('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test("check bookstore list", async ({page}) => {
  await page.goto('https://demoqa.com/books/');
  //console.log('page load');
  //await page.waitForTimeout( 5000 )
  // await page.locator('.ReactTable').waitFor({state: "visible"});
  const table =  await page.locator('.ReactTable');
  console.log('элемент получен', table);
  await table.waitFor({state: "visible"});
  console.log('элемент видим', table);

  await page.locator('[id="see-book-Git Pocket Guide"]').click();
  await expect(page.locator('#userName-value').first()).toBeVisible();
  await expect(page).toHaveURL('https://demoqa.com/books?book=9781449325862');
  //await page.goto('https://demoqa.com/books?book=9781449325862');
  await page.waitForFunction(() => document.fonts.ready);

  await expect(page.locator('[class*=profile-wrapper]')).toBeVisible()
  await expect(page.locator('.books-wrapper')).toHaveScreenshot("book-description.png")


});