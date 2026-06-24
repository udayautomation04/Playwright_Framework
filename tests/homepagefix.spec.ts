import {test,expect} from "../src/fixtures/pagefixtures"



test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage()
    await loginPage.doLogin('Playwright@gm.com', 'Test@123');
})

test('homePageTitleTest', async ({homePage }) => {
    let actualHomePageTitle = await homePage.getHomePageTitle();
    expect(actualHomePageTitle).toBe('My Account');
})



test('Logout Link visible', async ({ homePage }) => {
    expect(await homePage.isLogoutLinkPresent()).toBeTruthy();
})


test('verify HomePAge headers List', async ({ homePage}) => {
    let actualHeadersList = await homePage.getHomePageHeaders();
    console.log(actualHeadersList)
    expect(actualHeadersList).toHaveLength(4);
    expect(actualHeadersList).
        toEqual(
            ['My Account', 'My Orders', 'My Affiliate Account',
                'Newsletter']);
})


