import { HstsOptions, RequestResponseInterface } from "$types";

/**
 * The default value for the 'max-age' option if none is provided.
 * This value is 180 days in seconds.
 */
const DEFAULT_HSTS_MAX_AGE: number = 15552000;

/**
 * Sets the Strict-Transport-Security response header for secure connections.
 *
 * @param {RequestResponseInterface} requestResponse - The request and response interface.
 * @param {HstsOptions} [options={}] - Optional settings for configuring HSTS.
 * @return {void} This function does not return anything.
 */
export default function hsts(
    requestResponse: RequestResponseInterface,
    options: HstsOptions = {},
): void {
    const maxAge: number = options.maxAge ?? DEFAULT_HSTS_MAX_AGE;
    if (maxAge < 0) {
        throw new RangeError(
            "HSTS max-age must be a nonnegative number",
        );
    }

    const setIf: (requestResponse: RequestResponseInterface) => boolean =
        options.setIf ?? (() => true);

    if (typeof setIf !== "function") {
        throw new TypeError(
            "HSTS setIf option must be a function",
        );
    }

    const includeSubDomains: boolean = options.includeSubDomains ?? false;

    let header: string = `max-age=${Math.round(maxAge)}`;
    if (includeSubDomains) {
        header += "; includeSubDomains";
    }
    if (options.preload) {
        header += "; preload";
    }

    if (setIf(requestResponse)) {
        requestResponse.setResponseHeader("Strict-Transport-Security", header);
    }
}
