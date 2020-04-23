export enum AuthMethod {
    SameDevice,
    QrCode,
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
}

export interface IBankIdAuthApiResponse {
    orderRef: string;
    qrCodeAsBase64: string | undefined;
    autoStartUrl: string | undefined;
    method: AuthMethod;
}
