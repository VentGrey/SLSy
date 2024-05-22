import { FeaturePolicyOptions, RequestResponseInterface } from "$types";

// TODO(@ventgrey): Optimize this module

/**
 * Checks if the given value is a plain object.
 *
 * @param {unknown} value - The value to be checked.
 * @return {value is FeaturePolicyOptions} Returns true if the value is a plain object, false otherwise.
 */
function isPlainObject(value: unknown): value is FeaturePolicyOptions {
    return (
        typeof value === "object" &&
        !Array.isArray(value) &&
        value !== null
    );
}

/**
 * Generates the header value for the Feature-Policy based on the provided options.
 *
 * @param {unknown} options - The options object for the Feature-Policy.
 * @return {string} The generated header value.
 */
function getHeaderValueFromOptions(
    options: unknown,
): string {
    const FEATURES: { [featureKeyCamelCase: string]: string } = {
        accelerometer: "accelerometer",
        ambientLightSensor: "ambient-light-sensor",
        autoplay: "autoplay",
        battery: "battery",
        camera: "camera",
        displayCapture: "display-capture",
        documentDomain: "document-domain",
        documentWrite: "document-write",
        encryptedMedia: "encrypted-media",
        executionWhileNotRendered: "execution-while-not-rendered",
        executionWhileOutOfViewport: "execution-while-out-of-viewport",
        fontDisplayLateSwap: "font-display-late-swap",
        fullscreen: "fullscreen",
        geolocation: "geolocation",
        gyroscope: "gyroscope",
        layoutAnimations: "layout-animations",
        legacyImageFormats: "legacy-image-formats",
        loadingFrameDefaultEager: "loading-frame-default-eager",
        magnetometer: "magnetometer",
        microphone: "microphone",
        midi: "midi",
        navigationOverride: "navigation-override",
        notifications: "notifications",
        oversizedImages: "oversized-images",
        payment: "payment",
        pictureInPicture: "picture-in-picture",
        publickeyCredentials: "publickey-credentials",
        push: "push",
        serial: "serial",
        speaker: "speaker",
        syncScript: "sync-script",
        syncXhr: "sync-xhr",
        unoptimizedImages: "unoptimized-images",
        unoptimizedLosslessImages: "unoptimized-lossless-images",
        unoptimizedLossyImages: "unoptimized-lossy-images",
        unsizedMedia: "unsized-media",
        usb: "usb",
        verticalScroll: "vertical-scroll",
        vibrate: "vibrate",
        vr: "vr",
        wakeLock: "wake-lock",
        xr: "xr",
        xrSpatialTracking: "xr-spatial-tracking",
    };

    if (!isPlainObject(options)) {
        throw new TypeError(
            `featurePolicy must be called with an object argument. You passed: ${options}`,
        );
    }

    const { features } = options;
    if (!isPlainObject(features)) {
        throw new Error(
            `featurePolicy must have a single key, "features", which is an object of features.`,
        );
    }

    const result = Object.entries(features).map(
        ([featureKeyCamelCase, featureValue]) => {
            if (
                !Object.prototype.hasOwnProperty.call(
                    FEATURES,
                    featureKeyCamelCase,
                )
            ) {
                throw new Error(
                    `featurePolicy does not support the "${featureKeyCamelCase}" feature.`,
                );
            }

            if (!Array.isArray(featureValue) || featureValue.length === 0) {
                throw new Error(
                    `The value of the "${featureKeyCamelCase}" feature must be a non-empty array of strings.`,
                );
            }

            const allowedValuesSeen: Set<string> = new Set();

            featureValue.forEach((allowedValue) => {
                if (typeof allowedValue !== "string") {
                    throw new Error(
                        `The value of the "${featureKeyCamelCase}" feature contains a non-string, which is not supported.`,
                    );
                } else if (allowedValuesSeen.has(allowedValue)) {
                    throw new Error(
                        `The value of the "${featureKeyCamelCase}" feature contains duplicates, which it shouldn't.`,
                    );
                } else if (allowedValue === "self") {
                    throw new Error("'self' must be quoted.");
                } else if (allowedValue === "none") {
                    throw new Error("'none' must be quoted.");
                }
                allowedValuesSeen.add(allowedValue);
            });

            if (featureValue.length > 1) {
                if (allowedValuesSeen.has("*")) {
                    throw new Error(
                        `The value of the "${featureKeyCamelCase}" feature cannot contain * and other values.`,
                    );
                } else if (allowedValuesSeen.has("'none'")) {
                    throw new Error(
                        `The value of the "${featureKeyCamelCase}" feature cannot contain 'none' and other values.`,
                    );
                }
            }

            const featureKeyDashed = FEATURES[featureKeyCamelCase];
            return [featureKeyDashed, ...featureValue].join(" ");
        },
    ).join(";");

    if (result.length === 0) {
        throw new Error("At least one feature is required.");
    }

    return result;
}

/**
 * Sets the Feature-Policy response header based on the provided options.
 *
 * @param {RequestResponseInterface} requestResponse - Interface for handling request and response headers.
 * @param {FeaturePolicyOptions} [options] - Optional configuration for the Feature-Policy header.
 * @return {void} This function does not return anything.
 */
export default function featurePolicy(
    requestResponse: RequestResponseInterface,
    options?: FeaturePolicyOptions,
): void {
    if (options !== undefined) {
        const headerValue = getHeaderValueFromOptions(options);
        requestResponse.setResponseHeader("Feature-Policy", headerValue);
    }
}
