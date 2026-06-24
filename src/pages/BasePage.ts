import { Page } from "@playwright/test";

export class BasePage {
// Protected keyword: within the BasePAge class or child of the class will access 'Page'
    protected readonly page: Page;

constructor (page:Page){
    this.page=page;
}

}