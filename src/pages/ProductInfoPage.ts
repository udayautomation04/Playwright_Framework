import { BasePage } from "./BasePage";
import { test, Page, Locator } from "@playwright/test";

export class ProductInfoPage extends BasePage {

    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private readonly map: Map<string, string | number>

    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { level: 1 });
        this.productImages = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.map = new Map<string, string>();
    }

    async getProductHeader(): Promise<string> {
        return this.header.innerText()
    }

    async getProductImageCount(): Promise<number> {
     // await this.page.waitForTimeout(4000);
    await this.productImages.first().waitFor({ state: 'visible' });
        return await this.productImages.count();
    }

    private async getProductMetaData(): Promise<void> {
        let metaData = await this.productMetaData.allInnerTexts();
        console.log('metaData is>>', metaData)
        for (let data of metaData) {
            let meta = data.split(':');
            let metaKey = meta[0];
            let metaValue = meta[1];
            this.map.set(metaKey, metaValue);
        }
    }


    private async getProductPrice(): Promise<void> {

        let priceData = await this.productPricing.allInnerTexts();
        console.log('metaData priceis>>', priceData)
        let productPrice = priceData[0];
        let exPriceData = priceData[1].split(':')[1].trim();
        this.map.set('Price', productPrice);
        this.map.set('exTaxPrice', exPriceData);
    }


    async getProductInfo(): Promise<Map<string, string | number>> {
        //await this.page.waitForTimeout(4000);
        this.map.set('Product Header', await this.getProductHeader())
        this.map.set('Product images', await this.getProductImageCount())
        await this.getProductMetaData();
        await this.getProductPrice();
        return this.map;
    }
}