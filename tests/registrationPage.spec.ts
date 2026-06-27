
import { test, expect } from "../src/fixtures/pagefixtures"
import { CsvHelper } from "../src/utils/CsvHelper";
import { RegistrationField } from "../src/pages/RegistrationPage"


test.beforeEach('', async ({ registrationPage }) => {
    registrationPage.goToRegistrationPage();
})

let registrationData = CsvHelper.readCsv('src/testData/registrationData.csv');
for (let row of registrationData) {
    test(`registration -${row.FirstName}`, async ({ registrationPage, registrationSuccessPage }) => {
        await registrationPage.fillField(RegistrationField.FIRST_NAME, `row.FirstName${Date.now()}`);
        await registrationPage.fillField(RegistrationField.LAST_NAME, row.LastName);
        await registrationPage.fillField(RegistrationField.EMAIL, `row.Email${Date.now()}@open.com`);
        await registrationPage.fillField(RegistrationField.TELEPHONE, row.Telephone);
        await registrationPage.fillField(RegistrationField.PASSWORD, row.Password);
        await registrationPage.fillField(RegistrationField.CONFIRM_PASSWORD, row.Password);
        await registrationPage.clickRegistrationFields(RegistrationField.YES);
        await registrationPage.clickRegistrationFields(RegistrationField.CHECKBOX);
        await registrationPage.clickRegistrationFields(RegistrationField.CONTINUE);
        let getConfirmation = await registrationSuccessPage.getConfirmationText();
        console.log('print', getConfirmation);
        await expect(getConfirmation).toEqual('Your Account Has Been Created!')
    });
}


let registrationData1 = CsvHelper.readCsv('src/testData/registration2Data.csv');
for (let row of registrationData1) {
    test(`registrationPageWithSingleMethods -${row.FirstName}`, async ({ page, registrationPage, registrationSuccessPage }) => {
        await registrationPage.firstNameInput(`row.FirstName${Date.now()}`);
        await registrationPage.lastNameInput(row.LastName);
        await registrationPage.emailInput(`row.Email${Date.now()}@open.com`);
        await page.pause()
        await registrationPage.telephoneInput(row.Telephone);
        await registrationPage.passwordInput(row.Password);
        await registrationPage.confirmPasswordInput(row.Password);
        await registrationPage.yesNoRadioInput('yes');
        await registrationPage.agreeCheckBox();
        await registrationPage.continueButton();
        let getConfirmation = await registrationSuccessPage.getConfirmationText();
        console.log('print', getConfirmation);
        await expect(getConfirmation).toEqual('Your Account Has Been Created!')
    });
}