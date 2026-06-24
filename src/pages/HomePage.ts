import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";



export class HomePage extends BasePage {

    private readonly Myaccount: Locator;
    private readonly logout: Locator;
    private readonly headers: Locator;
    private readonly search: Locator;
    private readonly searchIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.Myaccount = page.getByRole('link', { name: 'My Account' });
        this.logout = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', { level: 2 });
        this.search = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('div#search button')
    };

    async selectLogOut() {
        await this.logout.click();
    }

    async isLogoutLinkPresent(): Promise<boolean> {
        return await this.logout.isVisible();
    }

    async getHomePageTitle(): Promise<string> {
        return await this.page.title();
    }

    async getHomePageHeaders(): Promise<string[]> {
        return await this.headers.allInnerTexts();
    }


    async doSearch(searchKey: string) {
        console.log(`search key: ${searchKey}`)
        await this.search.fill(searchKey);
        await this.searchIcon.click();
    }



}