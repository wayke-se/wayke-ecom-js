import { IAddress } from "../customers/types";

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
    getUser(): IBankIdUser | undefined;
    getAddress(): IAddress | undefined;
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
    hintCode?: string;
    completionData?: IBankIdCompletionData;
}

export interface IBankIdCompletionData {
    signature: string;
    ocspResponse: string;
    user: IBankIdUser;
    address: IAddress;
}

export interface IBankIdUser {
    name: string;
    givenName: string;
    surname: string;
    personalIdentityNumber: string;
}
