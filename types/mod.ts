import { Request, Response } from "@oak/oak";

/**
 * Derived from snelm@1.3.0 - https://deno.land/x/snelm@1.3.0/frameworks/interface.ts
 * @license MIT
 *
 * This interface sets the common methods used to communicate with the SLSy
 * middleware.
 */
export interface RequestResponseInterface {
    /** This function returns the value of the specified request header. */
    getRequestHeader(headerKey: string): string;

    /** This function gets the value of the specified response header. */
    getResponseHeader(headerKey: string): string;

    /** This function sets the value of the specified response header. */
    setResponseHeader(headerKey: string, headerValue: string): void;

    /** This function removes the specified response header. */
    removeResponseHeader(headerKey: string): void;
}

/**
 * Derived from snelm@1.3.0 - https://deno.land/x/snelm@1.3.0/frameworks/interface.ts
 * @license MIT
 *
 * This class represents an Oak request and response object. It is used to
 * communicate with the SLSy middleware.
 *
 * @example Create an instance of the OakRequestResponse class
 * ```typeScript
 * const oakRequestResponse: OakRequestResponse = new OakRequestResponse(request, response);
 * ```
 */
export default class OakRequestResponse implements RequestResponseInterface {

    /** 
     * The request object.
     * @type {Request}
     */
    private _request: Request;

    /** 
     * The response object.
     * @type {Response}
     */
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
 * By default, the 'Cross-Origin-Resource-Policy' header will be set to 'none'.
 */
export interface CrossDomainOptions {

    /**
     * The permitted policies for the 'Cross-Origin-Resource-Policy' header.
     * Valid permitted policies are:
     * - `'none'`: 'Cross-Origin-Resource-Policy' header will be set to 'none'
     * - `'master-only'`: 'Cross-Origin-Resource-Policy' header will be set to 'master-only'
     * - `'by-content-type'`: 'Cross-Origin-Resource-Policy' header will be set to 'by-content-type'
     * - `'all'`: 'Cross-Origin-Resource-Policy' header will be set to 'all'
     * 
     * @type {string}
     */
    permittedPolicies?: string;
}

/**
 * Interface for the dnsPrefetchControl middleware options.
 */
export interface DnsPrefetchControlOptions {

    /**
     * Whether to allow DNS prefetching.
     * 
     * - true: 'X-DNS-Prefetch-Control' header will be set to 'allow'
     * - false: 'X-DNS-Prefetch-Control' header will be set to 'off'
     * 
     * @type {boolean}
     */
    allow?: boolean;
}

/**
 * Interface for the expectCt middleware options.
 * By default, the 'Expect-CT' header will be set to 'maxAge=0'
 */
export interface ExpectCtOptions {

    /**
     * The maximum age of the 'Expect-CT' header.
     * @type {number}
     */
    maxAge?: number;

    /**
     * Whether to enforce the 'Expect-CT' header.
     * @type {boolean}
     */
    enforce?: boolean;

    /**
     * The report URI for the 'Expect-CT' header.
     * @type {string}
     */
    reportUri?: string;
}

/**
 * Interface for the expectHeader middleware options.
 * By default, the 'Expected-Header' header will not be set.
 */
export interface ExpectHeaderOptions {

    /**
     * The expected header value.
     * @type {string}
     */
    expectedHeader?: string;
}

/**
 * Interface for the featurePolicy middleware options.
 * By default, the 'Feature-Policy' header will not be set.
 */
export interface FeaturePolicyOptions {

    /**
     * The features for the 'Feature-Policy' header.
     * @type { { [featureName: string]: string[] } }
     */
    features: { [featureName: string]: string[] };
}

/**
 * Interface for the frameguard middleware options.
 * By default, the 'X-Frame-Options' header will not be set.
 */
export interface FrameguardOptions {

    /**
     * The action for the 'X-Frame-Options' header.
     * @type {string}
     */
    action?: string;

    /**
     * The domain for the 'X-Frame-Options' header.
     * @type {string}
     */
    domain?: string;
}

/**
 * Interface for the hidePoweredBy middleware options.
 * By default, the 'X-Powered-By' header will not be set.
 */
export interface HidePoweredByOptions {
    /**
     * The value to set for the 'X-Powered-By' header.
     * @type {string}
     */
    setTo?: string;
}

/**
 * Interface for the hsts middleware options.
 * By default, the 'Strict-Transport-Security' header will not be set.
 */
export interface HstsOptions {

    /**
     * Whether to include subdomains in the 'Strict-Transport-Security' header.
     * @type {boolean}
     */
    includeSubDomains?: boolean;

    /**
     * The maximum age of the 'Strict-Transport-Security' header.
     * @type {number | null}
     */
    maxAge?: number | null;

    /**
     * Whether to preload the 'Strict-Transport-Security' header.
     * @type {boolean}
     */
    preload?: boolean;

    /**
     *  A function that returns true if the 'Strict-Transport-Security' header should be set.
     * @param requestResponse The request and response interface.
     * @returns {boolean}
     */
    setIf?: (requestResponse: RequestResponseInterface) => boolean;
}

/**
 * Interface for the referrerPolicy middleware options.
 * By default, the 'Referrer-Policy' header will be set to 'no-referrer'.
 */
export interface ReferrerPolicyOptions {

    /**
     * The policy for the 'Referrer-Policy' header.
     * @type {string | string[]}
     */
    policy?: string | string[];
}

/**
 * Interface for the X-XSS-Protection middleware options.
 * By default, the 'X-XSS-Protection' header will be set to '1; mode=block'.
 */
export interface XxssProtectionOptions {

    /**
     * The mode for the 'X-XSS-Protection' header.
     * @type {"block" | null}
     */
    mode?: "block" | null;

    /**
     * The report URI for the 'X-XSS-Protection' header.
     * @type {string}
     */
    reportUri?: string;

    /**
     * Whether to set the 'X-XSS-Protection' header to '1; mode=block' for old IE browsers.
     * @type {boolean}
     */
    setOnOldIE?: boolean;
}

/**
 * Interface for the SLSy middleware options.
 *
 * @exports SLSyOptions
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

    /**
     * The options for the 'Cross-Origin-Resource-Policy' header.
     * @type {CrossDomainOptions | null}
     */
    crossdomain?: CrossDomainOptions | null;

    /**
     * The options for the 'DNS-Prefetch-Control' header.
     * @type {DnsPrefetchControlOptions | null}
     */
    dnsPrefetchControl?: DnsPrefetchControlOptions | null;

    /**
     * Whether to set the 'X-Content-Type-Options' header to 'nosniff'.
     * @type {boolean | null}
     */
    dontSniffMimetype?: boolean | null;

    /**
     * The options for the 'Expect-CT' header.
     * @type {ExpectCtOptions | null}
     */
    expectCt?: ExpectCtOptions | null;

    /**
     * The options for the 'Expect' header.
     * @type {ExpectHeaderOptions | null}
     */
    expectHeader?: ExpectHeaderOptions | null;

    /**
     * The options for the 'Feature-Policy' header.
     * @type {FeaturePolicyOptions | null}
     */
    featurePolicy?: FeaturePolicyOptions | null;

    /**
     * The options for the 'Frameguard' middleware.
     * @type {FrameguardOptions | null}
     */
    frameguard?: FrameguardOptions | null;

    /**
     * The options for the `X-Powered-By` header.
     * @type {HidePoweredByOptions | null}
     */
    hidePoweredBy?: HidePoweredByOptions | null;

    /**
     * The options for the 'HSTS' header.
     * @type {HstsOptions | null}
     */
    hsts?: HstsOptions | null;

    /**
     * Whether to set the 'X-Download-Options' header to 'noopen'.
     * @type {boolean | null}
     */
    ienoopen?: boolean | null;

    /**
     * The options for the 'Referrer-Policy' header.
     * @type {ReferrerPolicyOptions | null}
     */
    referrerPolicy?: ReferrerPolicyOptions | null;

    /**
     * The options for the 'X-XSS-Protection' header.
     * @type {XxssProtectionOptions | null}
     */
    XXSSProtection?: XxssProtectionOptions | null;
}
