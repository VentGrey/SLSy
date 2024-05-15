import { testing } from "@oak/oak";
import type { Context, Middleware, Next } from "@oak/oak";
import { assertEquals } from "@std/assert";

import { Slsy } from "../../src/index.ts";

const slsy: Slsy = new Slsy({
    expectCt: {
        maxAge: 6000,
        enforce: true,
        reportUri: "/expect-ct-report",
    },
});

const mw: Middleware = async (ctx: Context, next: Next) => {
    ctx.response = slsy.slsy(ctx.request, ctx.response);
    await next();
};

Deno.test({
    name: "Test expect-ct header -  Value: enforce + maxAge + reportUri",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        // Test for random values as "Expect-CT" header values
        assertEquals(
            ctx.response.headers.get("expect-ct"),
            "enforce; maxAge=6000; report-uri=/expect-ct-report",
        );
    },
});

Deno.test({
    name: "Test expect-ct header - Value: enforce + maxAge (without reportUri)",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const slsyWithoutReportUri: Slsy = new Slsy({
            expectCt: {
                maxAge: 6000,
                enforce: true,
            },
        });
        const mwWithoutReportUri: Middleware = async (
            ctx: Context,
            next: Next,
        ) => {
            ctx.response = slsyWithoutReportUri.slsy(ctx.request, ctx.response);
            await next();
        };

        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mwWithoutReportUri(ctx, next);

        assertEquals(
            ctx.response.headers.get("expect-ct"),
            "enforce; maxAge=6000",
        );
    },
});

Deno.test({
    name: "Test expect-ct header - Value: enforce + reportUri (without maxAge)",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const slsyWithoutMaxAge: Slsy = new Slsy({
            expectCt: {
                enforce: true,
                reportUri: "/expect-ct-report",
            },
        });
        const mwWithoutMaxAge: Middleware = async (
            ctx: Context,
            next: Next,
        ) => {
            ctx.response = slsyWithoutMaxAge.slsy(ctx.request, ctx.response);
            await next();
        };

        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mwWithoutMaxAge(ctx, next);

        assertEquals(
            ctx.response.headers.get("expect-ct"),
            "enforce; maxAge=0; report-uri=/expect-ct-report",
        );
    },
});
