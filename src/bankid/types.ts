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
}
