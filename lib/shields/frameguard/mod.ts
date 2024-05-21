import { FrameguardOptions, RequestResponseInterface } from "$types";

/**
 * Parses the action option and returns the corresponding value.
 *
 * @param {string | undefined} actionOption - The action option to parse.
 * @return {string} The parsed action option.
 * @throws {Error} If the action option is invalid.
 */
function parseActionOption(actionOption: string | undefined): string {
    actionOption = actionOption?.valueOf() || "SAMEORIGIN";
    const result: string = actionOption.toUpperCase();

    if (result === "ALLOWFROM") {
        return "ALLOW-FROM";
    } else if (result === "SAME-ORIGIN") {
        return "SAMEORIGIN";
    } else if (["DENY", "ALLOW-FROM", "SAMEORIGIN"].includes(result)) {
        return result;
    }

    throw new Error(`Invalid action option: ${actionOption}`);
}

/**
 * Parses the domain option and returns the corresponding value.
 *
 * @param {string | undefined} domainOption - The domain option to parse.
 * @return {string} The parsed domain option.
 * @throws {Error} If the domain option is not a string or is empty.
 */
function parseDomainOption(domainOption: string | undefined): string {
    if (typeof domainOption !== "string" || !domainOption.length) {
        throw new Error(
            `ALLOW-FROM domain option must be a string and not empty: ${domainOption}`,
        );
    }

    return domainOption;
}

/**
 * Parses the options to generate the appropriate header value for Frameguard.
 *
 * @param {FrameguardOptions} [options] - The options object for Frameguard.
 * @return {string} The generated header value.
 */
function getHeaderValueFromOptions(options?: FrameguardOptions): string {
    options = options || {};

    const action = parseActionOption(options.action);

    if (action === "ALLOW-FROM") {
        const domain = parseDomainOption(options.domain);
        return `${action} ${domain}`;
    } else {
        return action;
    }
}

/**
 * Sets the 'X-Frame-Options' response header based on the given options.
 *
 * @param {RequestResponseInterface} requestResponse - The request and response interface.
 * @param {FrameguardOptions} [options] - The options for controlling framing.
 * @return {void} This function does not return anything.
 */
export default function frameguard(
    requestResponse: RequestResponseInterface,
    options?: FrameguardOptions,
): void {
    const headerValue = getHeaderValueFromOptions(options);
    requestResponse.setResponseHeader("X-Frame-Options", headerValue);
}
