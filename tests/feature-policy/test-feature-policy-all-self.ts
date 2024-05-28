import { testing } from "@oak/oak";
import type { Context, Middleware, Next } from "@oak/oak";
import { assertEquals } from "@std/assert";

import { Slsy } from "../../lib/mod.ts";

const slsy: Slsy = new Slsy({
    featurePolicy: {
        features: {
            accelerometer: ["'self'"],
            ambientLightSensor: ["'self'"],
            autoplay: ["'self'"],
            battery: ["'self'"],
            camera: ["'self'"],
            displayCapture: ["'self'"],
            documentDomain: ["'self'"],
            documentWrite: ["'self'"],
            encryptedMedia: ["'self'"],
            executionWhileNotRendered: ["'self'"],
            executionWhileOutOfViewport: ["'self'"],
            fontDisplayLateSwap: ["'self'"],
            fullscreen: ["'self'"],
            geolocation: ["'self'"],
            gyroscope: ["'self'"],
            layoutAnimations: ["'self'"],
            legacyImageFormats: ["'self'"],
            loadingFrameDefaultEager: ["'self'"],
            magnetometer: ["'self'"],
            microphone: ["'self'"],
            midi: ["'self'"],
            navigationOverride: ["'self'"],
            notifications: ["'self'"],
            oversizedImages: ["'self'"],
            payment: ["'self'"],
            pictureInPicture: ["'self'"],
            publickeyCredentials: ["'self'"],
            push: ["'self'"],
            serial: ["'self'"],
            speaker: ["'self'"],
            syncScript: ["'self'"],
            syncXhr: ["'self'"],
            unoptimizedImages: ["'self'"],
            unoptimizedLosslessImages: ["'self'"],
            unoptimizedLossyImages: ["'self'"],
            unsizedMedia: ["'self'"],
            usb: ["'self'"],
            verticalScroll: ["'self'"],
            vibrate: ["'self'"],
            vr: ["'self'"],
            wakeLock: ["'self'"],
            xr: ["'self'"],
            xrSpatialTracking: ["'self'"],
        },
    },
});

const mw: Middleware = async (ctx: Context, next: Next) => {
    ctx.response = slsy.slsy(ctx.request, ctx.response);
    await next();
};

Deno.test({
    name: "Test Feature-Policy header -  Value: all self",
    ignore: Deno.build.os === "windows",
    fn: async () => {
        const ctx = testing.createMockContext();
        const next = testing.createMockNext();

        await mw(ctx, next);

        assertEquals(
            ctx.response.headers.get("feature-policy"),
            "accelerometer 'self';ambient-light-sensor 'self';autoplay 'self';battery 'self';camera 'self';display-capture 'self';document-domain 'self';document-write 'self';encrypted-media 'self';execution-while-not-rendered 'self';execution-while-out-of-viewport 'self';font-display-late-swap 'self';fullscreen 'self';geolocation 'self';gyroscope 'self';layout-animations 'self';legacy-image-formats 'self';loading-frame-default-eager 'self';magnetometer 'self';microphone 'self';midi 'self';navigation-override 'self';notifications 'self';oversized-images 'self';payment 'self';picture-in-picture 'self';publickey-credentials 'self';push 'self';serial 'self';speaker 'self';sync-script 'self';sync-xhr 'self';unoptimized-images 'self';unoptimized-lossless-images 'self';unoptimized-lossy-images 'self';unsized-media 'self';usb 'self';vertical-scroll 'self';vibrate 'self';vr 'self';wake-lock 'self';xr 'self';xr-spatial-tracking 'self'",
        );
    },
});
