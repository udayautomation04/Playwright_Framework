import { test, expect } from "../src/fixtures/pagefixtures";
import { CsvHelper } from "../src/utils/CsvHelper";

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!);
});


let productData1 = CsvHelper.readCsv('src/testData/productData.csv');
for (let row of productData1) {
    test(`@sanity @regression Get Product result count - ${row.productname}`, async ({ homePage, searchResultPage }) => {
        await homePage.doSearch(row.searchkey);
        expect(await searchResultPage.getProductResultCount()).toBe(Number(row.resultcount));
    });
}

let productData2 = CsvHelper.readCsv('src/testData/productData.csv');
for (let row of productData2) {
    test(`@sanity @regression selectProduct after search- ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultPage }) => {
        await homePage.doSearch(row.searchkey);
        await searchResultPage.selectProduct(row.productname);

    });
}
