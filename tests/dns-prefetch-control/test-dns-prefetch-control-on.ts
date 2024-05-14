import { testing } from "@oak/oak";
import type { Context, Middleware, Next } from "@oak/oak";
import { assertEquals } from "@std/assert";

import { Slsy } from "../../src/index.ts";

const slsy: Slsy = new Slsy({
    expectCt: null,
    crossdomain: null,
    dnsPrefetchControl: {
        allow: true,
    },
});

const mw: Middleware = async (ctx: Context, next: Next) => {
    ctx.response = slsy.slsy(ctx.request, ctx.response);
    await next();
};

Deno.test({
    name: "Test DNS Prefetch Control header -  Value: on",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        // Test for "on" as "dns-prefetch-control" header value
        assertEquals(
            ctx.response.headers.get("x-dns-prefetch-control"),
            "on",
        );
    },
});
