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

export interface IBankIdCollectRespone {
    getOrderRef: () => string;
    getStatus: () => AuthStatus;
    getHintCode: () => string | undefined;
    hasMessage(): boolean;
    getMessage(): string;
}

export enum AuthStatus {
    Pending = "Pending",
    Failed = "Failed",
    Complete = "Complete",
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
