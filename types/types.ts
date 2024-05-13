export interface CrossDomainOptions {
    permittedPolicies?: string;
}

export interface DnsPrefetchControlOptions {
    allow?: boolean;
}

export interface HidePoweredByOptions {
    setTo?: string;
}

export interface SLSyOptions {
    crossdomain?: CrossDomainOptions | null;
    dontSniffMimetype?: boolean | null;
    dnsPrefetchControl?: DnsPrefetchControlOptions | null;
    hidePoweredBy?: HidePoweredByOptions | null;
    ienoopen?: boolean | null;
}
