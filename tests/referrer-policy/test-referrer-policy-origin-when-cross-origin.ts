import { testing } from "@oak/oak";
import type { Context, Middleware, Next } from "@oak/oak";
import { assertEquals } from "@std/assert";

import { Slsy } from "../../lib/mod.ts";

const slsy: Slsy = new Slsy({
    referrerPolicy: {
        policy: "origin-when-cross-origin",
    },
});

const mw: Middleware = async (ctx: Context, next: Next) => {
    ctx.response = slsy.slsy(ctx.request, ctx.response);
    await next();
};

Deno.test({
    name: "Test Referrer-Policy header -  Value: origin-when-cross-origin",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        // Header should be "origin-when-cross-origin" ("Referrer-Policy")
        assertEquals(
            ctx.response.headers.get("referrer-policy"),
            "origin-when-cross-origin",
        );
    },
});
