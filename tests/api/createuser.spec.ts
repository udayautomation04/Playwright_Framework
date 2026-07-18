
import { config } from "process";
import { test, expect } from "../../src/fixtures/apifixtures";


const TOKEN = process.env.APITOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };
let userId: number;
test.describe.serial(' @smoke @running e2e go rest crud api tests', () => {

test('@P1 GET API -- get all users', async ({ apiUtility }) => {
    let response = await apiUtility.get('/public/v2/users', AUTH_HEADER);
    console.log("Token is ",TOKEN);
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0);
    console.log(response.body)
})

test('@P2 Post API--Create user', async ({ apiUtility }) => {

    let userData = {
        name: 'uday101',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };
    console.log("Token is ",TOKEN);
    console.log('auth:', AUTH_HEADER)
    let response = await apiUtility.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userData.name);
    userId= response.body.id;
    console.log('Created User Id:', userId)
})

test('@P3 PUT API -- Update a user', async ({ apiUtility }) => {
        let userUpdatedData = {
            name: 'Update',
            status: 'inactive'
        };

        let response = await apiUtility.put(`/public/v2/users/${userId}`, userUpdatedData, AUTH_HEADER);
        console.log("Token is ",TOKEN);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(userUpdatedData.name);
        expect(response.body.status).toBe(userUpdatedData.status);
    });

    test('@P4 DELETE API -- Delete a user', async ({ apiUtility }) => {
        let response = await apiUtility.delete(`/public/v2/users/${userId}`, AUTH_HEADER);
        expect(response.status).toBe(204);
    });



});