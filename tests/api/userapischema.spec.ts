import Ajv from 'ajv'
import { test, expect } from '../../src/fixtures/apifixtures'
import { ApiUtility } from '../../src/api/ApiUtility';



let TOKEN = process.env.APITOKEN;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` }


//setup the AJV:
let ajv = new Ajv();

//define JSON Schema:
let userExpectedSchema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "integer"
        },
        "name": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "gender": {
            "type": "string"
        },
        "status": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ]
};

test('GET--user', async ({ apiUtility }) => {
    
    let userData = {
        name: 'uday101',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };
// post
    let creatUserResponsee = await apiUtility.post('/public/v2/users', userData, AUTH_HEADER);
    let userId =  creatUserResponsee.body.id

    //get
    let getUserResponse = await apiUtility.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(getUserResponse.status).toBe(200);
    let getUserId =  getUserResponse.body.id;

    // schema Validation code:
    let validate = ajv.compile(userExpectedSchema);
    let isSchemaValid = validate(getUserResponse.body);

    if (!isSchemaValid) {
        console.log("Schema errors: ", validate.errors)
    }
    expect(isSchemaValid).toBeTruthy();
})