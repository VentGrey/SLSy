import { testing } from "@oak/oak";
import type { Context, Middleware, Next } from "@oak/oak";
import { assertEquals } from "@std/assert";

import { Slsy } from "../src/index.ts";

const slsy: Slsy = new Slsy({
    hidePoweredBy: {
        setTo: "SecondLifeSyndrome",
    },
    ienoopen: null,
    expectCt: null,
});

/**
 * Middleware function that sets the response headers using the SLSy library.
 *
 * @param {Context} ctx - The context object containing the request and response.
 * @param {Next} next - The next middleware function in the chain.
 * @return {Promise<void>} - A promise that resolves when the middleware is done.
 */
const mw: Middleware = async (ctx: Context, next: Next) => {
    ctx.response = slsy.slsy(ctx.request, ctx.response);
    await next();
};

Deno.test({
    name: "Test X-Powered-By header",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        // No default if a value is set
        assertEquals(
            ctx.response.headers.get("X-Powered-By"),
            "SecondLifeSyndrome",
        );
    },
});

Deno.test({
    name: "Test Cross-Origin-Resource-Policy header",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        // Default should be 'none'
        assertEquals(
            ctx.response.headers.get("cross-origin-resource-policy"),
            "none",
        );
    },
});

Deno.test({
    name: "Test Referrer-Policy header",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        // Default should be 'no-referrer'
        assertEquals(
            ctx.response.headers.get("referrer-policy"),
            "no-referrer",
        );
    },
});

Deno.test({
    name: "Test x-content-type-options header",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        // Default should be 'nosniff'
        assertEquals(
            ctx.response.headers.get("x-content-type-options"),
            "nosniff",
        );
    },
});

Deno.test({
    name: "Test x-dns-prefetch-control header",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        // Default should be 'off'
        assertEquals(
            ctx.response.headers.get("x-dns-prefetch-control"),
            "off",
        );
    },
});

Deno.test({
    name: "Test x-frame-options header",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        // Default should be 'SAMEORIGIN'
        assertEquals(
            ctx.response.headers.get("x-frame-options"),
            "SAMEORIGIN",
        );
    },
});
