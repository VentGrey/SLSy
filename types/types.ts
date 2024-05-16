import { Request, Response } from "@oak/oak";

/**
 * Derived from snelm@1.3.0 - https://deno.land/x/snelm@1.3.0/frameworks/interface.ts
 * Original license: MIT
 *
 * This interface sets the common methods used to communicate with the SLSy
 * middleware.
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
 *
 * This class represents an Oak request and response object. It is used to
 * communicate with the SLSy middleware.
 */
export default class OakRequestResponse implements RequestResponseInterface {
    private _request: Request;
    private _response: Response;

    /**
     * Initializes a new instance of the class with the given request and response objects.
     *
     * @param {Request} request - The request object.
     * @param {Response} response - The response object.
     */
    constructor(request: Request, response: Response) {
        this._request = request;
        this._response = response;
    }

    /**
     * Retrieves the value of the specified header from the request.
     *
     * @param {string} headerKey - The key of the header to retrieve.
     * @return {string} The value of the header, or an empty string if the header is not present.
     */
    public getRequestHeader(headerKey: string): string {
        return this._request.headers.get(headerKey) || "";
    }

    /**
     * Retrieves the value of the specified response header.
     *
     * @param {string} headerKey - The key of the response header to retrieve.
     * @return {string} The value of the specified response header, or an empty string if the header is not present.
     */
    public getResponseHeader(headerKey: string): string {
        return this._response.headers.get(headerKey) || "";
    }

    /**
     * Sets the value of a response header.
     *
     * @param {string} headerKey - The key of the header to set.
     * @param {string} headerValue - The value to set for the header.
     * @return {void} This function does not return anything.
     */
    public setResponseHeader(headerKey: string, headerValue: string): void {
        this._response.headers.set(headerKey, headerValue);
    }

    /**
     * Removes a specific header from the response.
     *
     * @param {string} headerKey - The key of the header to be removed.
     * @return {void}
     */
    public removeResponseHeader(headerKey: string): void {
        this._response.headers.delete(headerKey);
    }

    /**
     * A description of the entire function.
     *
     * @return {Request} - the request object
     */
    get request(): Request {
        return this._request;
    }

    /**
     * Retrieves the response object associated with this instance.
     *
     * @return {Response} The response object.
     */
    get response(): Response {
        return this._response;
    }
}

/**
 * Interface for the crossdomain middleware options.
 *
 * Valid permitted policies are: 'none', 'master-only', 'by-content-type', 'all'.
 * @param {string} permittedPolicies - The permitted policies for the 'Cross-Origin-Resource-Policy' header.
 *
 * By default, the 'Cross-Origin-Resource-Policy' header will be set to 'none'.
 *
 * @exports CrossDomainOptions
 */
export interface CrossDomainOptions {
    permittedPolicies?: string;
}

/**
 * Interface for the dnsPrefetchControl middleware options.
 * @param {boolean} allow - Whether to allow DNS prefetching.
 *
 * If set to true, the 'X-DNS-Prefetch-Control' header will be set to 'allow'.
 * If set to false, the 'X-DNS-Prefetch-Control' header will be set to 'off'.
 *
 * By default, the 'X-DNS-Prefetch-Control' header will be set to 'off'.
 *
 * @exports DnsPrefetchControlOptions
 */
export interface DnsPrefetchControlOptions {
    allow?: boolean;
}

export interface ExpectCtOptions {
    maxAge?: number;
    enforce?: boolean;
    reportUri?: string;
}

export interface ExpectHeaderOptions {
    expectedHeader?: string;
}

export interface FeaturePolicyOptions {
    features: { [featureName: string]: string[] };
}

export interface FrameguardOptions {
    action?: string;
    domain?: string;
}

export interface HidePoweredByOptions {
    setTo?: string;
}

export interface HstsOptions {
    includeSubDomains?: boolean;
    maxAge?: number | null;
    preload?: boolean;
    setIf?: (requestResponse: RequestResponseInterface) => boolean;
}

export interface ReferrerPolicyOptions {
    policy?: string | string[];
}

export interface SLSyOptions {
    crossdomain?: CrossDomainOptions | null;
    dnsPrefetchControl?: DnsPrefetchControlOptions | null;
    dontSniffMimetype?: boolean | null;
    expectCt?: ExpectCtOptions | null;
    expectHeader?: ExpectHeaderOptions | null;
    featurePolicy?: FeaturePolicyOptions | null;
    frameguard?: FrameguardOptions | null;
    hidePoweredBy?: HidePoweredByOptions | null;
    hsts?: HstsOptions | null;
    ienoopen?: boolean | null;
    referrerPolicy?: ReferrerPolicyOptions | null;
}
