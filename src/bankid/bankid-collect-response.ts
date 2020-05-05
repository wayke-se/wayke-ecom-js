import {
    IBankIdCollectResponse,
    AuthStatus,
    IBankIdCollectApiResponse,
    AuthMethod,
} from "./types";

import resolveMessage from "./message-resolver";
import { IAddress } from "../customers/types";

export class BankIdCollectResponse implements IBankIdCollectResponse {
    static START_FAILED_CODE = "startFailed";

    private orderRef: string;
    private status: AuthStatus;
    private hintCode?: string;
    private message: string;
    private method: AuthMethod;
    private personalNumber?: string;
    private address?: IAddress;

    public constructor(
        response: IBankIdCollectApiResponse,
        method: AuthMethod
    ) {
        if (!response) {
            throw new Error("Response can not be falsy");
        }

        this.orderRef = response.orderRef;
        this.status = this.parseStatus(response.status);
        this.hintCode = response.hintCode;
        this.message = resolveMessage(response.hintCode);
        this.method = method;

        if (this.isCompleted() && !!response.completionData) {
            this.personalNumber = response.completionData.personalNumber;
            this.address = response.completionData.address;
        }
    }

    private parseStatus(status: string) {
        switch (status) {
            case "pending":
                return AuthStatus.Pending;
            case "complete":
                return AuthStatus.Complete;
            case "failed":
                return AuthStatus.Failed;
            default:
                return AuthStatus.Unknown;
        }
    }

    getOrderRef() {
        return this.orderRef;
    }

    getStatus() {
        return this.status;
    }

    isPending() {
        return this.status === AuthStatus.Pending;
    }

    getHintCode() {
        return this.hintCode;
    }

    hasMessage() {
        return !!this.message;
    }

    getMessage() {
        return this.message;
    }

    shouldRenew() {
        return this.hintCode === BankIdCollectResponse.START_FAILED_CODE;
    }

    isCompleted() {
        return this.status === AuthStatus.Complete;
    }

    getPersonalNumber() {
        return this.personalNumber;
    }

    getAddress() {
        return this.address;
    }
}
