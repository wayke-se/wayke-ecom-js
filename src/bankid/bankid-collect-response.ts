import {
    IBankIdCollectResponse,
    AuthStatus,
    IBankIdCollectApiResponse,
    AuthMethod,
} from "./types";

import resolveMessage from "./message-resolver";

export class BankIdCollectResponse implements IBankIdCollectResponse {
    private orderRef: string;
    private status: AuthStatus;
    private hintCode: string | undefined;
    private message: string;

    public constructor(
        response: IBankIdCollectApiResponse,
        method: AuthMethod
    ) {
        if (!response) {
            throw new Error("Response can not be falsy");
        }

        this.orderRef = response.orderRef;
        this.status = (<any>AuthStatus)[response.status];
        this.hintCode = response.hintCode;
        this.message = resolveMessage(response.hintCode, method);
    }

    getOrderRef() {
        return this.orderRef;
    }

    getStatus() {
        return this.status;
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
}
