import { CrossDomainOptions, RequestResponseInterface } from "$types";

/**
 * This module contains functions for setting the 'Cross-Origin-Embedder-Policy'
 * response header based on the provided options.
 *
 * @module
 */

/**
 * Retrieves the header value from the given CrossDomainOptions object.
 *
 * @param {CrossDomainOptions} options - The CrossDomainOptions object containing the permitted policies.
 * @return {string} The header value based on the permitted policies.
 * @throws {Error} If the permitted policies are not valid.
 */
function getHeaderValueFromOptions(options: CrossDomainOptions): string {
    const DEFAULT_PERMITTED_POLICIES: string = "none";
    const ALLOWED_POLICIES: string[] = [
        "none",
        "master-only",
        "by-content-type",
        "all",
    ];

    const permittedPolicies: string = options.permittedPolicies ||
        DEFAULT_PERMITTED_POLICIES;

    if (!ALLOWED_POLICIES.includes(permittedPolicies)) {
        throw new Error(
            `"${permittedPolicies}" is not a valid permitted policy. Allowed policies are: ${
                ALLOWED_POLICIES.join(", ")
            }.`,
        );
    }

    return permittedPolicies;
}

/**
 * Retrieves the header value from the given CrossDomainOptions object and sets the 'Cross-Origin-Resource-Policy' response header.
 *
 * @param {RequestResponseInterface} requestResponse - Interface for handling request and response headers.
 * @param {CrossDomainOptions} [options={}] - Optional CrossDomainOptions object.
 * @return {void} This function does not return anything.
 */
export default function crossdomain(
    requestResponse: RequestResponseInterface,
    options: CrossDomainOptions = {},
): void {
    const headerValue = getHeaderValueFromOptions(options);
    requestResponse.setResponseHeader(
        "Cross-Origin-Resource-Policy",
        headerValue,
    );
}
