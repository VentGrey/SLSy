import { testing } from "@oak/oak";
import type { Context, Middleware, Next } from "@oak/oak";
import { assertRejects } from "@std/assert";

import { Slsy } from "../../lib/mod.ts";

const slsy: Slsy = new Slsy({
    referrerPolicy: {
        policy: "invalid-value",
    },
});

const mw: Middleware = async (ctx: Context, next: Next) => {
    ctx.response = slsy.slsy(ctx.request, ctx.response);
    await next();
};

Deno.test({
    name: "Test Referrer-Policy header error handler -  Value: invalid value",
    ignore: Deno.build.os === "windows",
    fn: () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        assertRejects(
            async () => {
                await mw(ctx, next);
            },
            Error,
            "is not a valid policy",
        );
    },
});
