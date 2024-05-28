import { testing } from "@oak/oak";
import type { Context, Middleware, Next } from "@oak/oak";
import { assertRejects } from "@std/assert";

import { Slsy } from "../../lib/mod.ts";

const slsy: Slsy = new Slsy({
    hsts: {
        includeSubDomains: true,
        maxAge: -1,
        preload: true
    },
});

const mw: Middleware = async (ctx: Context, next: Next) => {
    ctx.response = slsy.slsy(ctx.request, ctx.response);
    await next();
};

Deno.test({
    name: "Test HSTS header: Handle error Invalid maxAge value",
    ignore: Deno.build.os === "windows",
    fn: () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        assertRejects(
            async () => {
                await mw(ctx, next);
            },
            RangeError,
            "HSTS max-age must be a nonnegative number",
        )
    },
});