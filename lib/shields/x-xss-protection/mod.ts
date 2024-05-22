import { RequestResponseInterface, XxssProtectionOptions } from "$types";

/**
 * This module contains functions for setting the 'X-XSS-Protection' response
 * header based on the provided options.
 *
 * @module
 */

// TODO(@ventgrey): Optimize this module

/**
 * Checks if the given user agent matches the pattern for old versions of Internet Explorer.
 *
 * @param {string | undefined} userAgent - The user agent string to check.
 * @return {boolean} Returns true if the user agent matches the pattern for old versions of Internet Explorer, false otherwise.
 */
function userAgentMatchOldIE(userAgent: string | undefined): boolean {
    if (!userAgent) return false;

    const match: RegExpExecArray | null = /msie\s*(\d{1,2})/i.exec(userAgent);
    return match ? parseFloat(match[1]) < 9 : false;
}

/**
 * Generates the header value for the 'X-XSS-Protection' response header based on the provided options.
 *
 * @param {XxssProtectionOptions} options - The options for configuring the 'X-XSS-Protection' header.
 * @return {string} The generated header value.
 * @throws {TypeError} If an invalid mode option is provided.
 */
function getHeaderValueFromOptions(options: XxssProtectionOptions): string {
    const directives: string[] = ["1"];

    let isBlockMode: boolean;

    if ("mode" in options) {
        if (options.mode === "block") {
            isBlockMode = true;
        } else if (options.mode === null) {
            isBlockMode = false;
        } else {
            throw new TypeError(
                `Invalid mode option: ${options.mode}. Must be 'block' or null.`,
            );
        }
    } else {
        isBlockMode = true;
    }

    if (isBlockMode) directives.push("mode=block");

    if (options.reportUri) directives.push(`report=${options.reportUri}`);

    return directives.join(";");
}

/**
 * Sets the 'X-XSS-Protection' response header based on the provided options.
 *
 * @param {RequestResponseInterface} requestResponse - The request and response interface.
 * @param {XxssProtectionOptions} [options] - Optional configuration for the X-XSS-Protection header.
 * @return {void} This function does not return anything.
 */
export default function xXssProtection(
    requestResponse: RequestResponseInterface,
    options: XxssProtectionOptions = {},
): void {
    const headerValue: string = getHeaderValueFromOptions(options);

    if (options.setOnOldIE) {
        requestResponse.setResponseHeader("X-XSS-Protection", headerValue);
    } else {
        const value: string =
            userAgentMatchOldIE(requestResponse.getRequestHeader("user-agent"))
                ? "0"
                : headerValue;

        requestResponse.setResponseHeader("X-XSS-Protection", value);
    }
}
