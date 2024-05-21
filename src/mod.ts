import crossdomain from "$shields/crossdomain";
import dnsPrefetchControl from "$shields/dnsprefetch";
import dontSniffMimetype from "$shields/dontsniff";
import expectCt from "$shields/expectct";
import expectHeader from "$shields/expectheader";
import featurePolicy from "$shields/featurepolicy";
import frameguard from "$shields/frameguard";
import hidePoweredBy from "$shields/hide_powered_by";
import hsts from "$shields/hsts";
import ienoopen from "$shields/ienoopen";
import referrerPolicy from "$shields/referrer";

import { Request, Response } from "@oak/oak";
import { SLSyOptions } from "$types";
import OakRequestResponse from "$types";

/**
 * This class represents a SLSy middleware.
 *
 * @class Slsy
 * @field {SLSyOptions} [options={}] - The options for the class instance.
 * @returns {Slsy}
 *
 * @example Create an instance of the Slsy class
 * ```ts
 * const slsy: Slsy = new Slsy();
 * ```
 *
 * @example Use the slsy middleware in an Oak application server
 * ```ts
 *  import { Application, Context, Next } from "@oak/oak";
 *  import { Slsy } from "@ventgrey/slsy";
 *   const app: Application = new Application();
 *    const slsy: Slsy = new Slsy({
 *      hidePoweredBy: {
 *          setTo: "Deno-saurius",
 *        },
 *        ienoopen: true,
 *    });
 *    app.use((ctx: Context, next: Next) => {
 *        ctx.response = slsy.slsy(ctx.request, ctx.response);
 *        next();
 *    });
 *    app.use((ctx: Context) => {
 *        ctx.response.body = { message: "Hello JSR fellas!" };
 *    });
 * ```
 *
 * @module
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

    /**
     * Calls various middleware functions based on the provided options and returns the response.
     *
     * @param {Request} request - The request object.
     * @param {Response} response - The response object.
     * @return {Response} The response object after applying middleware functions.
     */
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

        if (this.options.expectHeader !== null) {
            expectHeader(requestResponse, this.options.expectHeader);
        }

        if (this.options.frameguard !== null) {
            frameguard(requestResponse, this.options.frameguard);
        }

        if (this.options.hidePoweredBy !== null) {
            hidePoweredBy(requestResponse, this.options.hidePoweredBy);
        }

        if (this.options.hsts !== null) {
            hsts(requestResponse, this.options.hsts);
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
