import OakRequestResponse from "$interfaces";

/**
 * Tiny Oak security middleware similar to Express.js's helmet
 * heavily inspired on [snelm](https://deno.land/x/snelm@1.3.0)
 */
export class slsy {
    private _options: any;
    private _framework: any;

    constructor(options: any = {}) {
        this._options = options;
        this._framework = OakRequestResponse;
    }

    public slsy(request: any, response: any): any {
      const requestResponse = new this._framework(request, response);

      return requestResponse.response;
    }
}
