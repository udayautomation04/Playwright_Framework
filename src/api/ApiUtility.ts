import { APIRequestContext } from "@playwright/test";


export class ApiUtility {

    private readonly request: APIRequestContext;
    private readonly baseURL: string;


    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request;
        this.baseURL = baseURL;
    }

    //get
    async get(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.get(`${this.baseURL}${endPoint}`, {
            headers: headers
        });
        console.log('res>>', response);
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //Post
    async post(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.post(`${this.baseURL}${endPoint}`, {
            data: data,
            headers: headers
        });
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //put
    async put(endPoint: string, data: object, headers?: Record<string, string>) {

        let response = await this.request.put(`${this.baseURL}${endPoint}`, {
            headers: headers,
            data: data
        });
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //Delete
    async delete(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
            headers: headers
        })
        return {
            status: response.status()
        }

    }



}