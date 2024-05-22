import { DnsPrefetchControlOptions, RequestResponseInterface } from "$types";

/**
 * This module contains functions for setting the 'X-DNS-Prefetch-Control'
 * response header based on the provided options.
 *
 * @module
 */

/**
 * Returns the header value based on the given DnsPrefetchControlOptions object.
 *
 * @param {DnsPrefetchControlOptions} [options] - The DnsPrefetchControlOptions object.
 * @returns {'on' | 'off'} The header value, either 'on' or 'off'.
 */
function getHeaderValueFromOptions(
    options?: DnsPrefetchControlOptions,
): "on" | "off" {
    return options && options.allow ? "on" : "off";
}

/**
 * Sets the 'X-DNS-Prefetch-Control' response header based on the given options.
 *
 * @param {RequestResponseInterface} requestResponse - The request and response interface.
 * @param {DnsPrefetchControlOptions} [options] - The options for controlling DNS prefetching.
 * @return {void} This function does not return anything.
 */
export default function dnsPrefetchControl(
    requestResponse: RequestResponseInterface,
    options?: DnsPrefetchControlOptions,
): void {
    const headerValue = getHeaderValueFromOptions(options);
    requestResponse.setResponseHeader("X-DNS-Prefetch-Control", headerValue);
}
