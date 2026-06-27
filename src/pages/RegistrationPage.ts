import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export enum RegistrationField {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    EMAIL = 'email',
    TELEPHONE = 'telephone',
    PASSWORD = 'password',
    CONFIRM_PASSWORD = 'confirmPassword',
    YES = 'yes',
    NO = 'no',
    CHECKBOX = 'checkbox',
    CONTINUE = 'continue'
}


export class RegistrationPage extends BasePage {


    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly confirmPassword: Locator;
    private readonly yesRadioButton: Locator;
    private readonly noRadioButton: Locator;
    private readonly checkBox: Locator;
    private readonly continue: Locator;


    constructor(page: Page) {
        super(page);
        this.firstName = page.getByRole('textbox', { name: '* First Name' });
        this.lastName = page.getByRole('textbox', { name: '* Last Name' });
        this.email = page.getByRole('textbox', { name: '* E-Mail' });
        this.telephone = page.getByRole('textbox', { name: '* Telephone' })
        this.password = page.getByRole('textbox', { name: '* password ' }).first();
        this.confirmPassword = page.getByRole('textbox', { name: '* password Confirm' });
        this.yesRadioButton = page.locator(`//*[contains(@type,'radio') and not(contains(@checked,'checked'))]`)
        this.noRadioButton = page.locator(`//*[contains(@type,'radio')]`).last();
        this.checkBox = page.locator('input[type="checkbox"]');
        this.continue = page.getByRole('button', { name: 'Continue' });
    }


    async firstNameInput(firstName: string) {
        await this.firstName.fill(firstName);
    }
    async lastNameInput(lastName: string) {
        await this.lastName.fill(lastName);
    }

    async emailInput(email: string) {
        await this.email.fill(email);
    }

    async telephoneInput(telephone: string) {
        await this.telephone.fill(telephone);
    }

    async passwordInput(password: string) {
        await this.password.fill(password);
    }

    async confirmPasswordInput(confirmPassword: string) {
        await this.confirmPassword.fill(confirmPassword);
    }

    async agreeCheckBox() {
        await this.checkBox.check();
    }

    async continueButton() {
        await this.continue.click();
    }

    async yesNoRadioInput(value: string) {
        if (value === 'yes') {
            this.yesRadioButton.click
        }
        else if (value === 'no') {
            this.noRadioButton.click
        }
    }



    async fillField(field: RegistrationField, value: string) {
        switch (field) {
            case RegistrationField.FIRST_NAME:
                await this.firstName.fill(value);
                break;

            case RegistrationField.LAST_NAME:
                await this.lastName.fill(value);
                break;

            case RegistrationField.EMAIL:
                await this.email.fill(value);
                break;

            case RegistrationField.TELEPHONE:
                await this.telephone.fill(value);
                break;

            case RegistrationField.PASSWORD:
                await this.password.fill(value);
                break;

            case RegistrationField.CONFIRM_PASSWORD:
                await this.confirmPassword.fill(value);
                break;

            default:
                throw new Error(`Unsupported field: ${field}`);
        }
    }

    async clickRegistrationFields(field: RegistrationField) {
        switch (field) {
            case RegistrationField.FIRST_NAME:
                await this.firstName.click();
                break;

            case RegistrationField.LAST_NAME:
                await this.lastName.click();
                break;

            case RegistrationField.EMAIL:
                await this.email.click();
                break;

            case RegistrationField.YES:
                await this.yesRadioButton.click();
                break;

            case RegistrationField.NO:
                await this.noRadioButton.click();
                break;

            case RegistrationField.CHECKBOX:
                await this.checkBox.check();
                break;

            case RegistrationField.CONTINUE:
                await this.continue.click();
                break;

            default:
                throw new Error(`Unsupported field: ${field}`);

        }
    }

    async goToRegistrationPage() {
        await this.page.goto('/opencart/index.php?route=account/register')
    }
}


