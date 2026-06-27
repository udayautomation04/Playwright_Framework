import { test as baseTest } from "@playwright/test"
// renaming test as baseTest: beacuse test will give me only 4 inbuilt fixtures "page","browser","expect" 
// and "", but I want to use inbuilt and custom fixtures  as well, using baseTest I call and use Pages.
// Note: we can change add any name in place of baseTest
import { LoginPage } from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage"
import { CsvHelper } from "../utils/CsvHelper"
import { SearchResultPage } from "../pages/SearchResultPage"
import { ProductInfoPage } from "../pages/ProductInfoPage"
import { RegistrationPage } from "../pages/RegistrationPage"
import { RegistrationSuccessPage } from "../pages/RegistrationSuccessPage"
// renaming test as baseTest

//define types of page fixtures: 

type pageFixtures = {
    registrationPage: RegistrationPage,
    registrationSuccessPage : RegistrationSuccessPage,
    loginPage: LoginPage,
    homePage: HomePage,
    searchResultPage: SearchResultPage,
    productInforPage: ProductInfoPage,
    testData: Record<string, string>[]
}

//extends playwright base test; mean: baseTest will inherit extends method , extends method says you can write any type of fixtures
// 
export let test = baseTest.extend<pageFixtures>({
    
    registrationPage: async ({ page }, use) => {
        let registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },
    registrationSuccessPage: async ({ page }, use) => {
        let registrationSuccessPage = new RegistrationSuccessPage(page);
        await use(registrationSuccessPage);
    },
    
    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    searchResultPage: async ({ page }, use) => {
        let searchResultPage = new SearchResultPage(page);
        await use(searchResultPage);
    },

    productInforPage: async ({ page }, use) => {
        let productInforPage = new ProductInfoPage(page);
        await use(productInforPage);
    },

    testData: async ({ }, use) => {
        const testData = CsvHelper.readCsv('src/testData/loginData.csv');
        await use(testData);
    }

})

export { expect } from "@playwright/test";