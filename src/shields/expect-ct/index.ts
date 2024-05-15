import { RequestResponseInterface } from "$interfaces";
import { ExpectCtOptions } from "$types";

function parseMaxAge(option: number): number {
    if (option >= 0 && Number.isInteger(option)) {
        return option;
    } else {
        throw new TypeError(
            `${option} is not a positive integer. A positive integer is required for the maxAge option.`,
        );
    }
}

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

export default function expectCt(
    requestResponse: RequestResponseInterface,
    options?: ExpectCtOptions,
): void {
    const headerValue = getHeaderValueFromOptions(options);
    requestResponse.setResponseHeader("Expect-CT", headerValue);
}
