import { testing } from "@oak/oak";
import type { Context, Middleware, Next } from "@oak/oak";
import { assertEquals } from "@std/assert";

import { Slsy } from "../../lib/mod.ts";

const slsy: Slsy = new Slsy();

const mw: Middleware = async (ctx: Context, next: Next) => {
    ctx.response = slsy.slsy(ctx.request, ctx.response);
    await next();
};

Deno.test({
    name: "Test SLSy defaults",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        // Ensure sensible defaults
        assertEquals(
            ctx.response.headers.get("cross-origin-resource-policy"),
            "none",
        );

        assertEquals(
            ctx.response.headers.get("expect-ct"),
            "maxAge=0",
        );

        assertEquals(
            ctx.response.headers.get("referrer-policy"),
            "no-referrer",
        );

        assertEquals(
            ctx.response.headers.get("x-frame-options"),
            "SAMEORIGIN",
        );

        assertEquals(
            ctx.response.headers.get("x-xss-protection"),
            "1;mode=block",
        );

        assertEquals(
            ctx.response.headers.get("x-content-type-options"),
            "nosniff",
        );

        assertEquals(
            ctx.response.headers.get("x-download-options"),
            "noopen",
        );

        assertEquals(
            ctx.response.headers.get("strict-transport-security"),
            "max-age=15552000",
        );

        assertEquals(
            ctx.response.headers.get("x-dns-prefetch-control"),
            "off",
        );
    },
});
