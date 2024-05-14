# SLSy - Tiny Oak "helmet" middleware 🌳⛑️

> And I know I don't need you now...

[![JSR](https://jsr.io/badges/@ventgrey/slsy)](https://jsr.io/badges/@ventgrey/slsy)
[![JSR Score](https://jsr.io/badges/@ventgrey/slsy/score)](https://jsr.io/@ventgrey/slsy)
[![Deno CI](https://github.com/VentGrey/SLSy/actions/workflows/deno.yml/badge.svg)](https://github.com/VentGrey/SLSy/actions/workflows/deno.yml)
[![Publish to JSR](https://github.com/VentGrey/SLSy/actions/workflows/publish.yml/badge.svg)](https://github.com/VentGrey/SLSy/actions/workflows/publish.yml)
![GitHub License](https://img.shields.io/github/license/VentGrey/slsy)

## Introduction 👀

SLSy is a tiny middleware for [Oak](https://oakserver.github.io/oak/) that acts
as a tiny replacement for the Express.js helmet middleware. Heavily inspired on
snelm which, in turn is heavily based on
[helmet](https://www.npmjs.com/package/helmet).

The Deno version hosted at [deno.land/x/snelm](https://deno.land/x/snelm) last
update was 4 years ago.

## Basic Usage 🎉

SlSy has a similar interface to `snelm`. Usage is pretty simple, just
instantiate a new `Slsy` class and pass both `request` and `response` objects to
the `slsy` method.

SlSy sticks to `snelm`s configurability and features as much as possible. It
includes most of the `snelm`'s components. You can disable any component by
setting it to `null`.

For example, if you wish to hide the `X-Powered-By` header, you can do it like
this:

```typescript
const slsy: Slsy = new Slsy({
    hidePoweredBy: null,
});
```

The `expectCt` module is enabled by default. You can disable it by setting it to
`null`:

```typescript
const slsy: Slsy = new Slsy({
    expectCt: null,
});
```

The "minimum" configured example is as follows:

```typescript
const slsy: Slsy = new Slsy({
    hidePoweredBy: null,
    expectCt: null,
});
```

## Features 🌟

- Written for JSR, trying to keep up with Deno modern features.
- Oak only. No other Deno servers are supported.
- No CORS, browser security tasks should be taken care of by the browser, not by
  the server.
- Hopefully, tiny and in sync with helmet.
- Actively maintained.

## Examples 🪄

You can find some examples in the `examples/` directory. Although tests are not
ready yet you can test this library for yourself by invoking it. Below you'll
find an example using the `hide-powered-by` module:

```typescript
import { Application, Context, Next } from "@oak/oak";
import { Slsy } from "@ventgrey/slsy";

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

## License 📜

SLSy is licensed under the Gnu Affero General Public License (AGPLv3). You can
find it at
[https://www.gnu.org/licenses/agpl-3.0.en.html](https://www.gnu.org/licenses/agpl-3.0.en.html).

For more information, see [LICENSE](LICENSE)

## Derivative code license 📜

Most shields come from `snelm` which uses the `helmet` source code, both are
released under the MIT license.

The `helmet` code used in this repository is the one available at snelm's
[deno page](https://deno.land/x/snelm@1.3.0), which was last updated 4 years
ago. This was on purpose, to avoid grabbing new code from helmet and instead
focusing on rewriting the codebase for Deno Typescript + Oak.

> SLSy stands for _Second Life Syndrome_ as a tribute to a song by Riverside ~
> No copyright infringement intended.
