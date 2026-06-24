import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";



export class LoginPage extends BasePage {

    //1) First we need to maintain  private locators
    //Locators
    // readonly: final: its a concept of constant
    // construct is public: if we create private no one will call constructor and help us to initialise locator

    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgotPasswordLink: Locator;
    private readonly logo: Locator;
    private readonly loginErrorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.emailId = page.getByRole('textbox', { name: 'E-mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.logo = page.getByAltText('naveenopencart');
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
    };


    // public page actions (methods)/ behaviour

    async goToLoginPage() {
        await this.page.goto('opencart/index.php?route=account/login')
        // await this.page.pause();
    }

    async getLoginPageTitle(): Promise<String> {
        return await this.page.title();
    }

    async isForgottenPasswordExist(): Promise<boolean> {
        return await this.forgotPasswordLink.isVisible();
    }


    async doLogin(username: string, password: string): Promise<void> {
        console.log(`userCreds:${username}: ${password}`)
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click()
    }

    async isLoginErrorDisplayed(): Promise<boolean> {
        return await this.loginErrorMessage.isVisible();
    }




}