import { test, expect } from "../src/fixtures/pagefixtures";
import { LoginPage } from "../src/pages/LoginPage";
import { CsvHelper } from "../src/utils/CsvHelper";
import { JsonHelper } from "../src/utils/JsonHelper";



test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
});

test('loginPageTitle', async ({ loginPage }) => {
    const pageTitle = await loginPage.getLoginPageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('forgotPassword', async ({ loginPage }) => {
    expect(await loginPage.isForgottenPasswordExist()).toBeTruthy();
});

test('@sanity @regression userIsAbleToLogin', async ({ loginPage, homePage }) => {
    await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!);
    expect(await homePage.isLogoutLinkPresent()).toBeTruthy();
})


// DD sequential: invalid user login with sequential mode.
// Drawback is all user try to login in single browser sequential note if 4 user failed then 5 and 6 will not get run
test('@smoke @sanity @regression invalidLogin', async ({ loginPage, testData }) => {
    for (let row of testData) {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isLoginErrorDisplayed).toBeTruthy();
    }
})

// DD aporach in Parallel execution means: it will open multiple browsers

let testData = CsvHelper.readCsv('src/testData/loginData.csv');
for (let row of testData) {
    test(`@sanity @regression invalid user login test-${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isLoginErrorDisplayed).toBeTruthy();
    })
}

// invalid Login with Json Data example

let jsonTestData = JsonHelper.readJson('src/testData/logindata.json');
for (let row of jsonTestData) {
    test(`@sanity @regression invalid user login JsonData - ${row.username}- ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isLoginErrorDisplayed).toBeTruthy();
    })
};