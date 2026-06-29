import { config } from "process";
import { test, expect } from "../../src/fixtures/apifixtures";

const TOKEN = process.env.APITOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };
let userId: number;
test('@smoke Post API--Create user', async ({ apiUtility }) => {

    let userData = {
        name: 'uday101',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };
console.log('auth:', AUTH_HEADER)
    let response = await apiUtility.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userData.name);
   userId= response.body.id;
    console.log('Created User Id:', userId)
})