import { IBankIdCollectRequest, AuthMethod } from "./types";

export class BankIdCollectRequestBuilder {
    public static validate(request: IBankIdCollectRequest) {
        if (!request) {
            throw new Error("Request can not be falsy");
        }

        if (!request.method) {
            throw new Error("Missing method");
        }

        if (!request.orderRef) {
            throw new Error("Missing order ref");
        }
    }

    private properties: {
        [key: string]: any;
    } = {};

    public build(): IBankIdCollectRequest {
        return this.properties as IBankIdCollectRequest;
    }
}
