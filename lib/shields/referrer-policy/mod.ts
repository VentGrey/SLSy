import { ReferrerPolicyOptions, RequestResponseInterface } from "$types";

/**
 * This module contains functions for setting the 'Referrer-Policy' response
 *
 * @module
 */

// TODO(@ventgrey): Optimize this module

/**
 * Retrieves the header value from the provided options based on the referrer policy.
 *
 * @param {ReferrerPolicyOptions} options - The options object containing the referrer policy.
 * @return {string} The header value based on the specified referrer policy.
 */
function getHeaderValueFromOptions(
    options?: ReferrerPolicyOptions,
): string {
    const DEFAULT_POLICY: string = "no-referrer";
    const ALLOWED_POLICIES: string[] = [
        "no-referrer",
        "no-referrer-when-downgrade",
        "same-origin",
        "origin",
        "strict-origin",
        "origin-when-cross-origin",
        "strict-origin-when-cross-origin",
        "unsafe-url",
        "",
    ];

    options = options || {};

    let policyOption: string | string[] | undefined;

    if ("policy" in options) {
        policyOption = options.policy;
    } else {
        policyOption = DEFAULT_POLICY;
    }

    const policies: (string | undefined)[] = Array.isArray(policyOption)
        ? policyOption
        : [policyOption];
    const policiesSet: Set<string> = new Set();

    if (policies.length === 0) {
        throw new Error(
            `At least one policy must be specified.  Allowed policies are: ${
                ALLOWED_POLICIES.join(", ")
            }.`,
        );
    }

    policies.forEach((policy: string | undefined) => {
        if (
            typeof policy !== "string" ||
            ALLOWED_POLICIES.indexOf(policy) === -1
        ) {
            const allowedPoliciesErrorList = ALLOWED_POLICIES.map(
                (policy: string) => {
                    if (policy.length) {
                        return `"${policy}"`;
                    } else {
                        return '""';
                    }
                },
            ).join(", ");
            throw new Error(
                `"${policy}" is not a valid policy.  Allowed policies are: ${allowedPoliciesErrorList}.`,
            );
        }

        if (policiesSet.has(policy)) {
            throw new Error(
                `The policy "${policy}" is specified multiple times.`,
            );
        }
        policiesSet.add(policy);
    });

    return policies.join(", ");
}

/**
 * Sets the Referrer-Policy header in the response based on the provided options.
 *
 * @param {RequestResponseInterface} requestResponse - Interface for handling request and response headers.
 * @param {ReferrerPolicyOptions} [options] - Optional configuration for the Referrer-Policy header.
 * @return {void} This function does not return anything.
 */
export default function referrerPolicy(
    requestResponse: RequestResponseInterface,
    options?: ReferrerPolicyOptions,
): void {
    const headerValue = getHeaderValueFromOptions(options);
    requestResponse.setResponseHeader("Referrer-Policy", headerValue);
}
