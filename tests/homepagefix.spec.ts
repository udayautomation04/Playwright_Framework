import {test,expect} from "../src/fixtures/pagefixtures"



test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage()
    await loginPage.doLogin('Playwright@gm.com', 'Test@123');
})

test('@sanity homePageTitleTest', async ({homePage }) => {
    let actualHomePageTitle = await homePage.getHomePageTitle();
    expect(actualHomePageTitle).toBe('My Account');
})



test('@smoke Logout Link visible', async ({ homePage }) => {
    expect(await homePage.isLogoutLinkPresent()).toBeTruthy();
})


test('@sanity @regression verify HomePAge headers List', async ({ homePage}) => {
    let actualHeadersList = await homePage.getHomePageHeaders();
    console.log(actualHeadersList)
    expect(actualHeadersList).toHaveLength(4);
    expect(actualHeadersList).
        toEqual(
            ['My Account', 'My Orders', 'My Affiliate Account',
                'Newsletter']);
})


