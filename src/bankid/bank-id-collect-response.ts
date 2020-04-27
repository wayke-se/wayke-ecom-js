import {
    IBankIdCollectRespone,
    AuthStatus,
    IBankIdCollectApiResponse,
    AuthMethod,
} from "./types";

import resolveMessage from "./message-resolver";

export class BankIdCollectResponse implements IBankIdCollectRespone {
    private orderRef: string;
    private status: AuthStatus;
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
        this.message = resolveMessage(response.hintCode, method);
    }

    getOrderRef() {
        return this.orderRef;
    }

    getStatus() {
        return this.status;
    }

    hasMessage() {
        return !!this.message;
    }

    getMessage() {
        return this.message;
    }
}
