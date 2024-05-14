import { testing } from "@oak/oak";
import type { Context, Middleware, Next } from "@oak/oak";
import { assertEquals } from "@std/assert";

import { Slsy } from "../../src/index.ts";

const slsy: Slsy = new Slsy({
    expectCt: null,
    crossdomain: {
        permittedPolicies: "none",
    },
});

const mw: Middleware = async (ctx: Context, next: Next) => {
    ctx.response = slsy.slsy(ctx.request, ctx.response);
    await next();
};

Deno.test({
    name: "Test Cross Domain header -  Value: None",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        // Test for "none" as "Cross-Origin-Resource-Policy" header value
        assertEquals(
            ctx.response.headers.get("cross-origin-resource-policy"),
            "none",
        );
    },
});
