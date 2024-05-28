import { testing } from "@oak/oak";
import type { Context, Middleware, Next } from "@oak/oak";
import { assertEquals } from "@std/assert";

import { Slsy } from "../../lib/mod.ts";

const slsy: Slsy = new Slsy({
    hidePoweredBy: null,
});

const mw: Middleware = async (ctx: Context, next: Next) => {
    ctx.response = slsy.slsy(ctx.request, ctx.response);
    await next();
};

Deno.test({
    name: "Test Hide Powered By header -  Value: null",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        assertEquals(
            ctx.response.headers.get("x-powered-by"),
            null,
        );
    },
});
