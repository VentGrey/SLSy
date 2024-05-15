import { testing } from "@oak/oak";
import type { Context, Middleware, Next } from "@oak/oak";
import { assertEquals } from "@std/assert";

import { Slsy } from "../../src/index.ts";

const slsy: Slsy = new Slsy({
    dontSniffMimetype: true,
});

const mw: Middleware = async (ctx: Context, next: Next) => {
    ctx.response = slsy.slsy(ctx.request, ctx.response);
    await next();
};

Deno.test({
    name: "Test Dont Sniff Mimetype header -  Value: nosniff",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        // Test for "nosniff" as "X-Content-Type-Options" header value
        assertEquals(
            ctx.response.headers.get("X-Content-Type-Options"),
            "nosniff",
        );
    },
});
