import OakRequestResponse from "$interfaces";
import hidePoweredBy from "$shields/hide_powered_by";
import ienoopen from "$shields/ienoopen";
import { Request, Response } from "@oak/oak";
import { SLSyOptions } from "$types";

/**
 * This class represents a SLSy middleware.
 */
export class Slsy {
    private options: SLSyOptions;

    constructor(options: SLSyOptions = {}) {
        this.options = options;
    }

    public slsy(request: Request, response: Response): Response {
        const requestResponse = new OakRequestResponse(request, response);

        if (this.options.hidePoweredBy !== null) {
            hidePoweredBy(requestResponse, this.options.hidePoweredBy);
        }

        if (this.options.ienoopen !== null) {
            ienoopen(requestResponse);
        }

        return requestResponse.response;
    }
}
