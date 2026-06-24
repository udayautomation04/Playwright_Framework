import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegistrationSuccessPage extends BasePage{

    private readonly successHeading: Locator;

    constructor(page: Page){
        super(page);
        this.successHeading=page.getByRole('heading',{level:1});
    }

    async getConfirmationText(): Promise<string>{
    this.successHeading.first().waitFor({ state: 'visible' });
       return this.successHeading.innerText();
    }
}