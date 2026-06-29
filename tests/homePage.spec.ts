
import { test, expect } from "@playwright/test"
import { LoginPage } from "../src/pages/LoginPage"
import { HomePage } from "../src/pages/HomePage"

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage()
    await loginPage.doLogin('Playwright@gm.com', 'Test@123');
    homePage = new HomePage(page);

})

test('@sanity homePageTitleTest', async ({ }) => {
    let actualHomePageTitle = await homePage.getHomePageTitle();
    expect(actualHomePageTitle).toBe('My Account');
})



test('@smoke Logout Link visible', async ({ page }) => {
    expect(await homePage.isLogoutLinkPresent()).toBeTruthy();
})


test('@sanity @regression verify HomePAge headers List', async ({ }) => {
    let actualHeadersList = await homePage.getHomePageHeaders();
    console.log(actualHeadersList)
    expect(actualHeadersList).toHaveLength(4);
    expect(actualHeadersList).
        toEqual(
            ['My Account', 'My Orders', 'My Affiliate Account',
                'Newsletter']);
})


