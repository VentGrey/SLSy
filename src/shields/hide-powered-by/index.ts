import { RequestResponseInterface } from "$interfaces";
import { HidePoweredByOptions } from "$types";

/**
 * Hides or sets a custom value for the 'X-Powered-By' response header.
 * 
 * This is a modified version of the 'hide-powered-by' express middleware.
 *
 * @param {RequestResponseInterface} requestResponse - Interface for handling request and response headers.
 * @param {HidePoweredByOptions} [options] - Optional settings for customizing the 'X-Powered-By' header.
 * @return {void} No return value.
 */
export default function hidePoweredBy(
    requestResponse: RequestResponseInterface,
    options?: HidePoweredByOptions,
): void {
    const setTo: string | null = options?.setTo ?? null;

    setTo ? requestResponse.setResponseHeader("X-Powered-By", setTo) : requestResponse.removeResponseHeader("X-Powered-By");
}
