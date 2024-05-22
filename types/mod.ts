import { Request, Response } from "@oak/oak";

/**
 * This module contains the types for the SLSy middleware.
 * @module
 */

/**
 * Derived from snelm@1.3.0 - https://deno.land/x/snelm@1.3.0/frameworks/interface.ts
 * Original license: MIT
 *
 * This interface sets the common methods used to communicate with the SLSy
 * middleware.
 *
 * @param {function} getRequestHeader - Retrieves the value of the specified header from the request.
 * @param {function} getResponseHeader - Retrieves the value of the specified header from the response.
 * @param {function} setResponseHeader - Sets the value of a response header.
 * @param {function} removeResponseHeader - Removes a specific header from the response.
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
 *
 * @param {Request} request - The request object.
 * @param {Response} response - The response object.
 * @returns {OakRequestResponse} - A new instance of the class.
 *
 * @example Create an instance of the OakRequestResponse class
 * ```typeScript
 * const oakRequestResponse: OakRequestResponse = new OakRequestResponse(request, response);
 * ```
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

/**
 * Interface for the expectCt middleware options.
 * @param {number} maxAge - The maximum age of the 'Expect-CT' header.
 * @param {boolean} enforce - Whether to enforce the 'Expect-CT' header.
 * @param {string} reportUri - The report URI for the 'Expect-CT' header.
 *
 * By default, the 'Expect-CT' header will be set to 'maxAge=0'
 */
export interface ExpectCtOptions {
    maxAge?: number;
    enforce?: boolean;
    reportUri?: string;
}

/**
 * Interface for the expectHeader middleware options.
 * @param {string} expectedHeader - The expected header value.
 *
 * By default, the 'Expected-Header' header will not be set.
 */
export interface ExpectHeaderOptions {
    expectedHeader?: string;
}

/**
 * Interface for the featurePolicy middleware options.
 * @param {object} features - The features for the 'Feature-Policy' header.
 *
 * By default, the 'Feature-Policy' header will not be set.
 */
export interface FeaturePolicyOptions {
    features: { [featureName: string]: string[] };
}

/**
 * Interface for the frameguard middleware options.
 * @param {string} action - The action for the 'X-Frame-Options' header.
 * @param {string} domain - The domain for the 'X-Frame-Options' header.
 *
 * By default, the 'X-Frame-Options' header will not be set.
 */
export interface FrameguardOptions {
    action?: string;
    domain?: string;
}

/**
 * Interface for the hidePoweredBy middleware options.
 * @param {string} setTo - The value to set for the 'X-Powered-By' header.
 *
 * By default, the 'X-Powered-By' header will not be set.
 */
export interface HidePoweredByOptions {
    setTo?: string;
}

/**
 * Interface for the hsts middleware options.
 * @param {boolean} includeSubDomains - Whether to include subdomains in the 'Strict-Transport-Security' header.
 * @param {number | null} maxAge - The maximum age of the 'Strict-Transport-Security' header.
 * @param {boolean} preload - Whether to preload the 'Strict-Transport-Security' header.
 * @param {(requestResponse: RequestResponseInterface) => boolean} setIf - A function that returns true if the 'Strict-Transport-Security' header should be set.
 *
 * By default, the 'Strict-Transport-Security' header will not be set.
 */
export interface HstsOptions {
    includeSubDomains?: boolean;
    maxAge?: number | null;
    preload?: boolean;
    setIf?: (requestResponse: RequestResponseInterface) => boolean;
}

/**
 * Interface for the referrerPolicy middleware options.
 * @param {string | string[]} policy - The policy for the 'Referrer-Policy' header.
 *
 * By default, the 'Referrer-Policy' header will be set to 'no-referrer'.
 */
export interface ReferrerPolicyOptions {
    policy?: string | string[];
}

/**
 * Interface for the X-XSS-Protection middleware options.
 * @param {string} mode - The mode for the 'X-XSS-Protection' header.
 * @param {string} reportUri - The report URI for the 'X-XSS-Protection' header.
 * @param {boolean} setOnOldIE - Whether to set the 'X-XSS-Protection' header to '1; mode=block' for old IE browsers.
 *
 * By default, the 'X-XSS-Protection' header will be set to '1; mode=block'.
 */
export interface XxssProtectionOptions {
    mode?: "block" | null;
    reportUri?: string;
    setOnOldIE?: boolean;
}

/**
 * Interface for the SLSy middleware options.
 *
 * @exports SLSyOptions
 * @param {CrossDomainOptions} [crossdomain={}] - The options for the 'Cross-Origin-Resource-Policy' header.
 * @param {DnsPrefetchControlOptions} [dnsPrefetchControl={}] - The options for the 'X-DNS-Prefetch-Control' header.
 * @param {boolean} [dontSniffMimetype=null] - Whether to set the 'X-Content-Type-Options' header to 'nosniff'.
 * @param {ExpectCtOptions} [expectCt={}] - The options for the 'Expect-CT' header.
 * @param {ExpectHeaderOptions} [expectHeader={}] - The options for the 'Expect' header.
 * @param {FeaturePolicyOptions} [featurePolicy={}] - The options for the 'Feature-Policy' header.
 * @param {FrameguardOptions} [frameguard={}] - The options for the 'Frameguard' middleware.
 * @param {HidePoweredByOptions} [hidePoweredBy={}] - The options for the 'X-Powered-By' header.
 * @param {HstsOptions} [hsts={}] - The options for the 'HSTS' header.
 * @param {boolean} [ienoopen=null] - Whether to set the 'X-Download-Options' header to 'noopen'.
 * @param {ReferrerPolicyOptions} [referrerPolicy={}] - The options for the 'Referrer-Policy' header.
 * @param {XxssProtectionOptions} [XXSSProtection={}] - The options for the 'X-XSS-Protection' header.
 *
 * By default, some headers will be set to sensible values:
 * - 'Cross-Origin-Resource-Policy': 'none'
 * - 'Expect-CT': 'maxAge=0'
 * - 'Referrer-Policy': 'no-referrer'
 * - 'Strict-Transport-Security': 'max-age=15552000;'
 * - 'X-Content-Type-Options': 'nosniff'
 * - 'X-DNS-Prefetch-Control': 'off'
 * - 'X-Frame-Options': 'SAMEORIGIN'
 * - 'X-XSS-Protection': '1;mode=block'
 * - 'X-Download-Options': 'noopen'
 */
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
    XXSSProtection?: XxssProtectionOptions | null;
}
