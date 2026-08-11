# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/nn.spec.ts >> @smoke @sanity Post API--Create user
- Location: tests/api/nn.spec.ts:7:1

# Error details

```
SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON
```

# Test source

```ts
  1  | import { APIRequestContext } from "@playwright/test";
  2  | 
  3  | 
  4  | export class ApiUtility {
  5  | 
  6  |     private readonly request: APIRequestContext;
  7  |     private readonly baseURL: string;
  8  | 
  9  | 
  10 |     constructor(request: APIRequestContext, baseURL: string) {
  11 |         this.request = request;
  12 |         this.baseURL = baseURL;
  13 |     }
  14 | 
  15 |     //get
  16 |     async get(endPoint: string, headers?: Record<string, string>) {
  17 |         let response = await this.request.get(`${this.baseURL}${endPoint}`, {
  18 |             headers: headers
  19 |         });
  20 |         console.log('res>>', response);
  21 |         return {
  22 |             status: response.status(),
  23 |             body: await response.json()
  24 |         }
  25 |     }
  26 | 
  27 |     //Post
  28 |     async post(endPoint: string, data: object, headers?: Record<string, string>) {
  29 |         let response = await this.request.post(`${this.baseURL}${endPoint}`, {
  30 |             data: data,
  31 |             headers: headers
  32 |         });
  33 |         return {
  34 |             status: response.status(),
> 35 |             body: await response.json()
     |                   ^ SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON
  36 |         }
  37 |     }
  38 | 
  39 |     //put
  40 |     async put(endPoint: string, data: object, headers?: Record<string, string>) {
  41 | 
  42 |         let response = await this.request.put(`${this.baseURL}${endPoint}`, {
  43 |             headers: headers,
  44 |             data: data
  45 |         });
  46 |         return {
  47 |             status: response.status(),
  48 |             body: await response.json()
  49 |         }
  50 |     }
  51 | 
  52 |     //Delete
  53 |     async delete(endPoint: string, headers?: Record<string, string>) {
  54 |         let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
  55 |             headers: headers
  56 |         })
  57 |         return {
  58 |             status: response.status()
  59 |         }
  60 | 
  61 |     }
  62 | 
  63 | 
  64 | 
  65 | }
```