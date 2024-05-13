import { Request, Response } from "@oak/oak";

/**
 * Derived from snelm@1.3.0 - https://deno.land/x/snelm@1.3.0/frameworks/interface.ts
 * Original license: MIT
 */
export interface RequestResponseInterface {
    getRequestHeader(headerKey: string): string;
    getResponseHeader(headerKey: string): string;
    setResponseHeader(headerKey: string, headerValue: string): void;
    removeResponseHeader(headerKey: string): void;
}


/**
 * Derived from snelm@1.3.0 - https://deno.land/x/snelm@1.3.0/frameworks/interface.ts
 * Original license: MIT
 */
export default class OakRequestResponse implements RequestResponseInterface {
    private _request: Request;
    private _response: Response;

    constructor(request: Request, response: Response) {
        this._request = request;
        this._response = response;
    }

    public getRequestHeader(headerKey: string): string {
        return this._request.headers.get(headerKey) || "";
    }

    public getResponseHeader(headerKey: string): string {
        return this._response.headers.get(headerKey) || "";
    }

    public setResponseHeader(headerKey: string, headerValue: string): void {
        this._response.headers.set(headerKey, headerValue);
    }

    public removeResponseHeader(headerKey: string): void {
        this._response.headers.delete(headerKey);
    }

    get request(): Request {
        return this._request;
    }

    get response(): Response {
        return this._response;
    }
}