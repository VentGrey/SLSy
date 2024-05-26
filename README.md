# SLSy - Security Headers for Oak 🌳🛡️

> And I know I don't need you now...

[![JSR](https://jsr.io/badges/@ventgrey/slsy)](https://jsr.io/badges/@ventgrey/slsy)
[![JSR Score](https://jsr.io/badges/@ventgrey/slsy/score)](https://jsr.io/@ventgrey/slsy)
[![Deno CI](https://github.com/VentGrey/SLSy/actions/workflows/deno.yml/badge.svg)](https://github.com/VentGrey/SLSy/actions/workflows/deno.yml)
![GitHub License](https://img.shields.io/github/license/VentGrey/slsy)

## Introduction 👀

SLSy is a middleware for [Oak](https://oakserver.github.io/oak/) that acts as a
tiny replacement for the Express.js helmet middleware. Heavily inspired on snelm
which, in turn is heavily based on
[helmet](https://www.npmjs.com/package/helmet).

The Deno version hosted at [deno.land/x/snelm](https://deno.land/x/snelm) last
update was 4 years ago. I made this project because I needed to revive this
library and use it for my own mischevious Deno projects.

> SLSy stands for _Second Life Syndrome_ as a tribute to a song by Riverside ~
> No copyright infringement intended.

### Features 🌟

- Written with JSR in mind
- Tries to keep up with Deno modern features.
- Oak only. No other Deno servers are supported.
- No CORS/CSP headers support, browser security tasks should be taken care of by
  the browser, not by the server.
- Hopefully, simple and in sync with helmet.
- Actively maintained.
- Fully typed.
- Documented & tested in production.

## Installation 📦

You can get a copy of SLSy from [JSR](https://jsr.io/@ventgrey/slsy).

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
import { Slsy } from "@ventgrey/slsy";

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
    "strict-transport-security": "max-age=15552000",
    "x-content-type-options": "nosniff",
    "x-dns-prefetch-control": "off",
    "x-download-options": "noopen",
    "x-frame-options": "SAMEORIGIN",
    "x-xss-protection": "1;mode=block"
}
```

## Configuration 🛠

Similar to `snelm`, Slsy uses a singleton `Slsy` instance that you can configure
by passing options to the constructor. Slsy includes the following options:

- `Cross-Origin-Resource-Policy`:
  [CORP Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cross-Origin_Resource_Policy)
- `X-DNS-Prefetch-Control`:
  [X-DNS-Prefetch-Control Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control)
- `X-Content-Type-Options`:
  [X-Content-Type-Options Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)
- `Expect-CT`:
  [Expect-CT Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT)
- Expected Header: Slsy checks if a defined header is present in the request.
- `Feature-Policy`:
  [Feature-Policy Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy)
- `X-Frame-Options`:
  [X-Frame-Options Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)
- Hide or change `X-Powered-By` header
- `Strict-Transport-Security`:
  [Strict-Transport-Security Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)
- `X-Download-Options`:
  [X-Download-Options Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Download-Options)
- `Referrer-Policy`:
  [Referrer-Policy Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)
- `X-XSS-Protection`:
  [X-XSS-Protection Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection)

The `Slsy` class can be created without any options which will provide default
headers or using the `SlsyOptions` interface. Such interface can be modified to
suit your needs:

### SlsyOptions

The `SlsyOptions` declaration can be found in the `types` directory. Here's the
small version of such code:

```typescript
export interface SLSyOptions {
    crossdomain?: CrossDomainOptions | null;
    dnsPrefetchControl?: DnsPrefetchControlOptions | null;
    dontSniffMimetype?: boolean | null;
    expectCt?: ExpectCtOptions | null;
    expectHeader?: ExpectHeaderOptions | null;
    featurePolicy?: FeaturePolicyOptions | null;
    frameguard?: FrameguardOptions | null;
    hidePoweredBy?: HidePoweredByOptions | null;
    hsts?: HstsOptions | null;
    ienoopen?: boolean | null;
    referrerPolicy?: ReferrerPolicyOptions | null;
    XXSSProtection?: XxssProtectionOptions | null;
}
```

You can set any option to `null` if you wish to disable it. Or you can set it to
a specific value. Here are all the available options for each `SlsyOptions`
attribute:

#### CrossDomainOptions

- `permittedPolicies`: A single string containing the permitted policies for the
  'Cross-Origin-Resource-Policy' header:
  - `none`: The 'Cross-Origin-Resource-Policy' header will be set to 'none'.
  - `same-origin`: The 'Cross-Origin-Resource-Policy' header will be set to
    'same-origin'.
  - `by-content-type`: The 'Cross-Origin-Resource-Policy' header will be set to
    'by-content-type'.
  - `all`: The 'Cross-Origin-Resource-Policy' header will be set to 'all'.
  - `master-only`: The 'Cross-Origin-Resource-Policy' header will be set to
    'master-only'.

  - **Default:** `none`.

#### DnsPrefetchControlOptions

- `allow`: Whether to allow DNS prefetching.
  - If set to `true`, the 'X-DNS-Prefetch-Control' header will be set to
    `allow`.
  - If set to `false`, the 'X-DNS-Prefetch-Control' header will be set to `off`.

  - **Default:** `false`.

#### dontSniffMimetype

- If set to `true`, the 'X-Content-Type-Options' header will be set to
  `nosniff`.

  - **Default:** `false`.

#### ExpectCtOptions

- `maxAge`: The maximum age of the 'Expect-CT' header in seconds. (Defaults to
  `0`)
- `enforce`: Whether to enforce the 'Expect-CT' header. (Defaults to `false`)
- `reportUri`: The report URI for the 'Expect-CT' header. (Defaults to `null`)

By default this header will be set as `"maxAge=0"` as this feature is usually
enforced by browsers on their own.

#### ExpectHeaderOptions

- `expectedHeader`: The expected header to check in the request. (Defaults to
  `null`)

I made this module for Slsy to check for `Expected-Header` header in the
request. This is not a standard header.

#### FeaturePolicyOptions

- `features`: The features for the 'Feature-Policy' header.

#### FrameguardOptions

- `action`: The action for the 'X-Frame-Options' header.
- `domain`: The domain for the 'X-Frame-Options' header.

- By default, the 'X-Frame-Options' header will not be set.

#### HidePoweredByOptions

- `setTo`: The value for the 'X-Powered-By' header.

- By default, the 'X-Powered-By' header will not be set. Set the value to `null`
  to disable it.

#### HstsOptions

- `includeSubDomains`: Whether to include subdomains in the
  'Strict-Transport-Security' header.
- `maxAge`: The maximum age of the 'Strict-Transport-Security' header in
  seconds. (Defaults to `0`)
- `preload`: Whether to preload the 'Strict-Transport-Security' header.
- `setIf`: A function that returns true if the 'Strict-Transport-Security'
  header should be set.

- By default, the 'Strict-Transport-Security' header will not be set.

#### Ienoopen

- If set to `true`, the 'X-Download-Options' header will be set to `noopen`.

- By default, the 'X-Download-Options' header will be set to `noopen`.

#### ReferrerPolicyOptions

- `policy`: The policy for the 'Referrer-Policy' header.
  - `no-referrer`: The 'Referrer-Policy' header will be set to `no-referrer`.
  - `no-referrer-when-downgrade`: The 'Referrer-Policy' header will be set to
    `no-referrer-when-downgrade`.
  - `same-origin`: The 'Referrer-Policy' header will be set to `same-origin`.
  - `origin`: The 'Referrer-Policy' header will be set to `origin`.
  - `strict-origin`: The 'Referrer-Policy' header will be set to
    `strict-origin`.
  - `origin-when-cross-origin`: The 'Referrer-Policy' header will be set to
    `origin-when-cross-origin`.
  - `strict-origin-when-cross-origin`: The 'Referrer-Policy' header will be set
    to `strict-origin-when-cross-origin`.
  - `unsafe-url`: The 'Referrer-Policy' header will be set to `unsafe-url`.

- By default, the 'Referrer-Policy' header will be set to `no-referrer`.

#### XxssProtectionOptions

- `mode`: The mode for the 'X-XSS-Protection' header.
  - `block`: The 'X-XSS-Protection' header will be set to `1; mode=block`.
- `reportUri`: The report URI for the 'X-XSS-Protection' header.
- `setOnOldIE`: Whether to set the 'X-XSS-Protection' header to '1; mode=block'
  for old IE browsers.

## Examples 🪄

You can find some examples in the `examples/` directory. Below you'll find an
example using the `hide-powered-by` module:

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

## Contributing 💻

See the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.

Bear in mind that I made this project for my own purposes, if it works for you,
great. If it doesn't, you are welcome to open an issue or submit a PR.

## License 📜

**This license only applies to the bits and pieces I wrote from scratch.**

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

### Original snelm license

MIT License

Copyright (c) 2020 Anthony Mancini

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
