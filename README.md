# SLSy - Tiny Oak "helmet" middleware 🌳⛑️

> And I know I don't need you now...

## Introduction

SLSy is a tiny middleware for [Oak](https://oakserver.github.io/oak/) that acts
as a tiny replacement for the Express.js helmet middleware. Heavily inspired on
snelm which, for some reason is still on Oak's website even after it was
removed.

The Deno version hosted at [deno.land/x/snelm](https://deno.land/x/snelm) last
update was 4 years ago.

I don't know if this is part of Oak itself (doesn't seem to be). Take everything
you see in this repo with a grain of salt.

## Features :star:

- Oak only. No other Deno servers are supported.
- No CORS, browser tasks are for the browser, not the server.
- Hopefully, tiny.

## Examples

You can find some examples in the `tests/` directory. Although tests are not
ready yet you can test this library for yourself by invoking it. Below you'll
find an example using the `hide-powered-by` module:

```typescript
import { Application, Context, Next } from "@oak/oak";
import { Slsy } from "@ventgrey/slsy;

const app: Application = new Application();
const slsy: Slsy = new Slsy({
    hidePoweredBy: {
        setTo: "Deno-saurius",
    },
    ienoopen: true,
});

app.use((ctx: Context, next: Next) => {
    ctx.response = slsy.slsy(ctx.request, ctx.response);

    next();
});

app.use((ctx: Context) => {
    ctx.response.body = { message: "Hello JSR fellas!" };
});

await app.listen({ port: 9555 });
```

## License

SLSy is licensed under the Gnu Affero General Public License (AGPLv3). You can
find it at
[https://www.gnu.org/licenses/agpl-3.0.en.html](https://www.gnu.org/licenses/agpl-3.0.en.html).

For more information, see [LICENSE](LICENSE)

> SLSy stands for _Second Life Syndrome_ as a tribute to a song by Riverside ~
> No copyright infringement intended.
