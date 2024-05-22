import { ExpectHeaderOptions, RequestResponseInterface } from "$types";

/**
 * This module contains functions for setting the 'Expect-Header' response
 * header based on the provided options.
 *
 * @module
 */

/**
 * A function that expects a specific header in the request response and throws an error if the header is not found.
 *
 * @param {RequestResponseInterface} requestResponse - The request response object.
 * @param {ExpectHeaderOptions} [options] - Optional options for the expected header.
 * @return {void} This function does not return anything.
 */
export default function expectHeader(
    requestResponse: RequestResponseInterface,
    options?: ExpectHeaderOptions,
): void {
    if (options?.expectedHeader) {
        const headerValue: string = requestResponse.getRequestHeader(
            options.expectedHeader,
        );

        if (!headerValue) {
            throw new Error(
                `Expected header '${options.expectedHeader}' not found in request header.`,
            );
        }
    }
}
