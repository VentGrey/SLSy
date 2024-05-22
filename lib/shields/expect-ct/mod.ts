import { ExpectCtOptions, RequestResponseInterface } from "$types";

/**
 * This module contains functions for setting the 'Expect-CT' response header
 * based on the provided options.
 *
 * @module
 */

// TODO(@ventgrey): Optimize this module

/**
 * Parses the given number and returns it if it is a positive integer.
 *
 * @param {number} option - The number to be parsed.
 * @return {number} The parsed number if it is a positive integer.
 * @throws {TypeError} If the number is not a positive integer.
 */
function parseMaxAge(option: number): number {
    if (option >= 0 && Number.isInteger(option)) {
        return option;
    } else {
        throw new TypeError(
            `${option} is not a positive integer. A positive integer is required for the maxAge option.`,
        );
    }
}

/**
 * Generates the header value for the Expect-CT response header based on the provided options.
 *
 * @param {ExpectCtOptions} [options] - The options for configuring the Expect-CT header.
 * @return {string} The generated header value.
 * @throws {TypeError} If a positive number is not provided for the maxAge option.
 */
function getHeaderValueFromOptions(options?: ExpectCtOptions): string {
    options = options || {};

    const directives: string[] = [];

    if (options.enforce) {
        directives.push("enforce");
    }

    const maxAge: number | undefined = "maxAge" in options ? options.maxAge : 0;

    if (maxAge === undefined || maxAge < 0) {
        throw new TypeError(
            "A positive number is required for the maxAge option",
        );
    }

    directives.push(`maxAge=${parseMaxAge(maxAge)}`);

    if (options.reportUri) {
        directives.push(`report-uri=${options.reportUri}`);
    }

    return directives.join("; ");
}

/**
 * Sets the "Expect-CT" response header based on the given options.
 *
 * @param {RequestResponseInterface} requestResponse - The request and response interface.
 * @param {ExpectCtOptions} [options] - Optional configuration for the Expect-CT header.
 * @return {void} This function does not return anything.
 */
export default function expectCt(
    requestResponse: RequestResponseInterface,
    options?: ExpectCtOptions,
): void {
    const headerValue = getHeaderValueFromOptions(options);
    requestResponse.setResponseHeader("Expect-CT", headerValue);
}
