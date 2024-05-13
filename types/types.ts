export interface CrossDomainOptions {
    permittedPolicies?: string;
}

export interface DnsPrefetchControlOptions {
    allow?: boolean;
}

export interface ExpectCtOptions {
    maxAge?: number;
    enforce?: boolean;
    reportUri?: string;
}

export interface FeaturePolicyOptions {
    features: { [featureName: string]: string[] };
}

export interface FrameguardOptions {
    action?: string;
    domain?: string;
}

export interface HidePoweredByOptions {
    setTo?: string;
}

export interface ReferrerPolicyOptions {
    policy?: string | string[];
}

export interface SLSyOptions {
    crossdomain?: CrossDomainOptions | null;
    dnsPrefetchControl?: DnsPrefetchControlOptions | null;
    dontSniffMimetype?: boolean | null;
    expectCt?: ExpectCtOptions | null;
    featurePolicy?: FeaturePolicyOptions | null;
    frameguard?: FrameguardOptions | null;
    hidePoweredBy?: HidePoweredByOptions | null;
    ienoopen?: boolean | null;
    referrerPolicy?: ReferrerPolicyOptions | null;
}
