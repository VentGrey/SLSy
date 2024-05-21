import { testing } from "@oak/oak";
import type { Context, Middleware, Next } from "@oak/oak";
import { assertEquals } from "@std/assert";

import { Slsy } from "../../src/mod.ts";

const EXPECTED_HEADER = "X-Reality-Dream";
const EXPECTED_HEADER_VALUE = "III";

const slsy: Slsy = new Slsy({
    expectHeader: {
        expectedHeader: EXPECTED_HEADER,
    },
});

const mw: Middleware = async (ctx: Context, next: Next) => {
    ctx.request.headers.set(EXPECTED_HEADER, EXPECTED_HEADER_VALUE);
    ctx.response = slsy.slsy(ctx.request, ctx.response);
    await next();
};

Deno.test({
    name:
        "Test Expected Header -  Value: ( Header: X-Reality-Dream, Value: III )",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        // Test for "III" as "X-Reality-Dream" header value
        assertEquals(
            ctx.request.headers.get(EXPECTED_HEADER),
            EXPECTED_HEADER_VALUE,
        );
    },
});
