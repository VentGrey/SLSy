import { RequestResponseInterface } from "$types";

/**
 * This module contains functions for setting the 'X-Download-Options' response
 * header based on the provided options.
 *
 * @module
 */

// TODO(@ventgrey): Optimize this module

/**
 * Sets the "X-Download-Options" response header to "noopen" for the given request response.
 *
 * @param {RequestResponseInterface} requestResponse - The request response object.
 * @return {void} This function does not return anything.
 */
export default function ienoopen(
    requestResponse: RequestResponseInterface,
): void {
    requestResponse.setResponseHeader("X-Download-Options", "noopen");
}
