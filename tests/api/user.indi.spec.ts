import { config } from "process";
import { test, expect } from "../../src/fixtures/apifixtures";


const TOKEN = process.env.APITOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

async function createUser(apiUtility: any) {

    let userData = {
        name: 'uday101',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };

    let response = await apiUtility.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
}


// Test1 : Create and Verify with get call
//Post- get

test('@sanity @regression Create And Get', async ({ apiUtility }) => {
    //create user
    let userResponse = await createUser(apiUtility);

    //get user
    let response = await apiUtility.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('uday101');
    console.log('responseBody > ',response.body)
});


// Test 2: Create> Update> Get


test('@sanity @regression Create, Update And Get', async ({ apiUtility }) => {
    //create user
    let userResponse = await createUser(apiUtility);

    let userUpdate = {
        name: 'uday101Updated',
        status: 'inactive'
    };

    //Put
    let putResponse = await apiUtility.put(`/public/v2/users/${userResponse.id}`, userUpdate, AUTH_HEADER)
    expect(putResponse.body.name).toBe('uday101Updated');
    expect(putResponse.status).toBe(200);
    //get user
    let getResponse = await apiUtility.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);

    console.log('putResponse', putResponse);

    console.log('getResponse', getResponse);
    expect(getResponse.status).toBe(200)
    expect(getResponse.body.name).toBe('uday101Updated');
});



test('Create, Delete, and Get', async ({ apiUtility }) => {
    //create user
    let userResponse = await createUser(apiUtility);

    //Delete
   let deleteResponse = await apiUtility.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER)

    expect(deleteResponse.status).toBe(204)

    //get user
    let getResponse = await apiUtility.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    console.log('getResponse', getResponse);
    expect(getResponse.status).toBe(404)
});