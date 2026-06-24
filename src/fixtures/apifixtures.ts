import { test as baseTest } from "@playwright/test"
import { ApiUtility } from "../api/ApiUtility"

type ApiFixtures = {
    apiUtility : ApiUtility;
}

export let test = baseTest.extend<ApiFixtures>({

    apiUtility: async ({ request }, use) => {
        let apiUtility = new ApiUtility(request,
            process.env.API_BASEURL!
        );
        await use(apiUtility);
    }

})
export { expect } from "@playwright/test";