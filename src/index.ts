import OakRequestResponse from "$interfaces";

import crossdomain from "$shields/crossdomain";
import dnsPrefetchControl from "$shields/dnsprefetch";
import dontSniffMimetype from "$shields/dontsniff";
import expectCt from "$shields/expectct";
import frameguard from "$shields/frameguard";
import hidePoweredBy from "$shields/hide_powered_by";
import featurePolicy from "$shields/featurepolicy";
import ienoopen from "$shields/ienoopen";
import referrerPolicy from "$shields/referrer";

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

        if (this.options.expectCt !== null) {
            expectCt(requestResponse, this.options.expectCt);
        }

        if (this.options.frameguard !== null) {
            frameguard(requestResponse, this.options.frameguard);
        }

        if (this.options.hidePoweredBy !== null) {
            hidePoweredBy(requestResponse, this.options.hidePoweredBy);
        }

        if (this.options.ienoopen !== null) {
            ienoopen(requestResponse);
        }

        if (this.options.referrerPolicy !== null) {
            referrerPolicy(requestResponse, this.options.referrerPolicy);
        }

        if (this.options.featurePolicy !== null) {
            featurePolicy(requestResponse, this.options.featurePolicy);
        }

        return requestResponse.response;
    }
}
