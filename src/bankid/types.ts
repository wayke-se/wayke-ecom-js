import { IAddress } from "../customers/types";

export enum AuthMethod {
    SameDevice = "SameDevice",
    QrCode = "QrCode",
}

export interface IBankIdAuthRequest {
    method: AuthMethod;
}

export interface IBankIdAuthResponse {
    isQrCode: () => boolean;
    isSameDevice: () => boolean;
    getOrderRef: () => string;
    getQrCode: () => string | undefined;
    getAutoLaunchUrl: () => string | undefined;
    getMethod: () => AuthMethod;
}

export interface IBankIdAuthApiResponse {
    orderRef: string;
    qrCodeAsBase64?: string;
    autoLaunchUrl?: string;
    method: AuthMethod;
}

export interface IBankIdCollectRequest {
    orderRef: string;
}

export interface IBankIdCollectResponse {
    getOrderRef: () => string;
    getStatus: () => AuthStatus;
    isPending: () => boolean;
    getHintCode: () => string | undefined;
    hasMessage(): boolean;
    getMessage(): string;
    shouldRenew(): boolean;
    isCompleted(): boolean;
    getPersonalNumber(): string | undefined;
    getAddress(): IAddress | undefined;
    getGivenName(): string | undefined;
    getSurname(): string | undefined;
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
    personalNumber: string;
    address: IAddress;
    givenName?: string;
    surname?: string;
}

export interface IBankIdCancelRequest {
    orderRef: string;
}
