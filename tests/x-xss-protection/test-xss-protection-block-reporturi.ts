import { testing } from "@oak/oak";
import type { Context, Middleware, Next } from "@oak/oak";
import { assertEquals } from "@std/assert";

import { Slsy } from "../../lib/mod.ts";

const slsy: Slsy = new Slsy({
    XXSSProtection: {
        mode: "block",
        reportUri: "/xss-report",
    },
});

const mw: Middleware = async (ctx: Context, next: Next) => {
    ctx.response = slsy.slsy(ctx.request, ctx.response);
    await next();
};

Deno.test({
    name:
        "Test X-XSS-Protection (X-XSS-Protection) header -  Value: block + uri",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        // Header should be "block" ("X-XSS-Protection")
        assertEquals(
            ctx.response.headers.get("x-xss-protection"),
            "1;mode=block;report=/xss-report",
        );
    },
});
