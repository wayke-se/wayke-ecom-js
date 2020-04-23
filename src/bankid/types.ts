export enum AuthMethod {
    SameDevice,
    QrCode,
}

export interface IBankIdAuthRequest {
    ipAddress: string;
    method: AuthMethod;
}
