import { testing } from "@oak/oak";
import type { Context, Middleware, Next } from "@oak/oak";
import { assertRejects } from "@std/assert";

import { Slsy } from "../../src/mod.ts";

const invalid_value: string = "invalid-value";

const slsy: Slsy = new Slsy({
    crossdomain: {
        permittedPolicies: invalid_value,
    },
});

const mw: Middleware = async (ctx: Context, next: Next) => {
    ctx.response = slsy.slsy(ctx.request, ctx.response);
    await next();
};

Deno.test({
    name: "Test Cross Domain header -  Expected Error (Invalid Value)",
    ignore: Deno.build.os === "windows",
    fn: () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        // Test if an error of type Error is thrown
        assertRejects(
            async () => {
                await mw(ctx, next);
            },
            Error,
            "is not a valid",
        );
    },
});
