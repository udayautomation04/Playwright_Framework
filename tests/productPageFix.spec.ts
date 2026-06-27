
import { test, expect } from "../src/fixtures/pagefixtures";


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!);
})



test('testImageCount', async ({ homePage, searchResultPage, productInforPage }) => {
    await homePage.doSearch('macbook');
    await searchResultPage.selectProduct('MacBook Pro');
    let actualImageCount = await productInforPage.getProductImageCount();
    console.log('totalImageCount', actualImageCount)

    expect(actualImageCount).toBe(4);

})


test('testProd', async ({ homePage, searchResultPage, productInforPage }) => {
    await homePage.doSearch('macbook');
    await searchResultPage.selectProduct('MacBook Pro');
    let actualProductInfo = await productInforPage.getProductInfo();
    console.log('actual data', actualProductInfo)

    expect.soft(actualProductInfo.get('Product Header')).toBe('MacBook Pro');
    expect.soft(actualProductInfo.get('Brand')).toBe(' Apple');
    expect.soft(actualProductInfo.get('Product Code')).toBe(' Product 18');
    expect.soft(actualProductInfo.get('Reward Points')).toBe(' 800');
    expect.soft(actualProductInfo.get('Availability')).toBe(' Out Of Stock');
    expect.soft(actualProductInfo.get('Price')).toBe('$2,000.00');
    expect.soft(actualProductInfo.get('exTaxPrice')).toBe('$2,000.00');
}) 