
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goToLoginPage();
});

test('loginPageTitle', async ({ page }) => {
    const pageTitle = await loginPage.getLoginPageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('forgotPassword', async ({ page }) => {
    expect(await loginPage.isForgottenPasswordExist()).toBeTruthy();
});

test('userIsAbleToLogin', async ({ page }) => {
    await loginPage.doLogin('Playwright@gm.com', 'Test@123');
    expect(await homePage.isLogoutLinkPresent()).toBeTruthy();
})
test('', ({ page }) => {

})