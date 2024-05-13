import OakRequestResponse from "$interfaces";

import hidePoweredBy from "$shields/hide_powered_by";
import ienoopen from "$shields/ienoopen";
import crossdomain from "$shields/crossdomain";
import dnsPrefetchControl from "$shields/dnsprefetch";
import dontSniffMimetype from "$shields/dontsniff";

import { Request, Response } from "@oak/oak";
import { SLSyOptions } from "$types";

/**
 * This class represents a SLSy middleware.
 *
 * @class Slsy
 * @field {SLSyOptions} [options={}] - The options for the class instance.
 * @returns {Slsy}
 */
export class Slsy {
    /**
     * The options for the class instance.
     *
     * @type {SLSyOptions}
     */
    private options: SLSyOptions;

    /**
     * Initializes a new instance of the class with the specified options.
     *
     * @param {SLSyOptions} [options={}] - The options for the class instance.
     */
    constructor(options: SLSyOptions = {}) {
        this.options = options;
    }

    public slsy(request: Request, response: Response): Response {
        const requestResponse = new OakRequestResponse(request, response);

        if (this.options.crossdomain !== null) {
            crossdomain(requestResponse, this.options.crossdomain);
        }

        if (this.options.dontSniffMimetype !== null) {
            dontSniffMimetype(requestResponse);
        }

        if (this.options.dnsPrefetchControl !== null) {
            dnsPrefetchControl(
                requestResponse,
                this.options.dnsPrefetchControl,
            );
        }

        if (this.options.hidePoweredBy !== null) {
            hidePoweredBy(requestResponse, this.options.hidePoweredBy);
        }

        if (this.options.ienoopen !== null) {
            ienoopen(requestResponse);
        }

        return requestResponse.response;
    }
}
