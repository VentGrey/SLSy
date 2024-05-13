import { RequestResponseInterface } from "$interfaces";
import { CrossDomainOptions } from "$types";

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

    let permittedPolicies: string;

    if ("permittedPolicies" in options) {
        permittedPolicies = options.permittedPolicies as string;
    } else {
        permittedPolicies = DEFAULT_PERMITTED_POLICIES;
    }

    if (ALLOWED_POLICIES.indexOf(permittedPolicies) === -1) {
        throw new Error(
            `"${permittedPolicies}" is not a valid permitted policy.  Allowed policies are: ${
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
