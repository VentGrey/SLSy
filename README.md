# SLSy - Tiny Oak "helmet" middleware 🌳⛑️

> And I know I don't need you now...

[![JSR](https://jsr.io/badges/@ventgrey/slsy)](https://jsr.io/badges/@ventgrey/slsy)
[![JSR Score](https://jsr.io/badges/@ventgrey/slsy/score)](https://jsr.io/@ventgrey/slsy)
[![Deno CI](https://github.com/VentGrey/SLSy/actions/workflows/deno.yml/badge.svg)](https://github.com/VentGrey/SLSy/actions/workflows/deno.yml)
[![Publish to JSR](https://github.com/VentGrey/SLSy/actions/workflows/publish.yml/badge.svg)](https://github.com/VentGrey/SLSy/actions/workflows/publish.yml)
![GitHub License](https://img.shields.io/github/license/VentGrey/slsy)

## Introduction 👀

> [!WARNING]  
> This library is pre 1.0.0, if you plan to use it in production please have a backup plan in case something stops working.

SLSy is a middleware for [Oak](https://oakserver.github.io/oak/) that acts as a
tiny replacement for the Express.js helmet middleware. Heavily inspired on snelm
which, in turn is heavily based on
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

You can start a minimal configuration like this:

```typescript
const slsy: Slsy = new Slsy();
```

This will set the following default headers:

```json
{
  "cross-origin-resource-policy": "none",
  "expect-ct": "maxAge=0",
  "referrer-policy": "no-referrer",
  "x-content-type-options": "nosniff",
  "x-dns-prefetch-control": "off",
  "x-download-options": "noopen",
  "x-frame-options": "SAMEORIGIN"
}
```

Since v0.1.6 I'm personally using this in a productive environment, however my use case might not match 1:1 with yours. If you encounter any bugs or breakage please report it.

![image](https://github.com/VentGrey/SLSy/assets/24773698/3693bda0-661d-4db7-9516-85746313597f)


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
