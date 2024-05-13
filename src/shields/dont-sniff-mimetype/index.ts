import { RequestResponseInterface } from "$interfaces";

/**
 * Sets the 'X-Content-Type-Options' response header to 'nosniff' for the given request response.
 *
 * @param {RequestResponseInterface} requestResponse - The request and response interface.
 * @return {void} This function does not return anything.
 */
export default function dontSniffMimetype(
    requestResponse: RequestResponseInterface,
): void {
    requestResponse.setResponseHeader("X-Content-Type-Options", "nosniff");
}
