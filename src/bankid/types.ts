export enum AuthMethod {
    SameDevice = "SameDevice",
    QrCode = "QrCode",
}

export interface IBankIdAuthRequest {
    ipAddress: string;
    method: AuthMethod;
}

export interface IBankIdAuthResponse {
    isQrCode: () => boolean;
    isSameDevice: () => boolean;
    getOrderRef: () => string;
    getQrCode: () => string | undefined;
    getAutoStartUrl: () => string | undefined;
    getMethod: () => AuthMethod;
}

export interface IBankIdAuthApiResponse {
    orderRef: string;
    qrCodeAsBase64: string | undefined;
    autoStartUrl: string | undefined;
    method: AuthMethod;
}

export interface IBankIdCollectRequest {
    orderRef: string;
    method: AuthMethod;
}

export interface IBankIdCollectResponse {
    getOrderRef: () => string;
    getStatus: () => AuthStatus;
    isPending: () => boolean;
    getHintCode: () => string | undefined;
    hasMessage(): boolean;
    getMessage(): string;
    shouldRenew(): boolean;
}

export enum AuthStatus {
    Pending = "pending",
    Failed = "failed",
    Complete = "complete",
    Unknown = "unknown",
}

export interface IBankIdCollectApiResponse {
    orderRef: string;
    status: string;
    hintCode: string | undefined;
    completionData: IBankIdCompletionData | undefined;
}

export interface IBankIdCompletionData {
    signature: string;
    ocspResponse: string;
}
