import {
    IBankIdCollectResponse,
    AuthStatus,
    IBankIdCollectApiResponse,
    AuthMethod,
    IBankIdUser,
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
    private user?: IBankIdUser;
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
        this.message = resolveMessage(response.hintCode, method);
        this.method = method;

        const isCompleted = this.status === AuthStatus.Complete;
        if (isCompleted && !!response.completionData) {
            this.user = response.completionData.user;
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
        return (
            this.method === AuthMethod.QrCode &&
            this.hintCode === BankIdCollectResponse.START_FAILED_CODE
        );
    }

    getUser() {
        return this.user;
    }

    getAddress() {
        return this.address;
    }
}
