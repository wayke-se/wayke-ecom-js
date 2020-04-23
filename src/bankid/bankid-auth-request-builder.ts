import { IBankIdAuthRequest, AuthMethod } from "./types";

export class BankIdAuthRequestBuilder {
    public static validate(request: IBankIdAuthRequest) {
        if (!request) {
            throw new Error("Request can not be falsy");
        }

        if (!request.ipAddress) {
            throw new Error("Missing ip address");
        }

        if (!request.method) {
            throw new Error("Missing auth method");
        }
    }

    private properties: {
        [key: string]: any;
    } = {};

    public withMethod(method: AuthMethod): BankIdAuthRequestBuilder {
        this.properties.method = method;

        return this;
    }

    public withIpAddress(ipAddress: string): BankIdAuthRequestBuilder {
        this.properties.ipAddress = ipAddress;

        return this;
    }

    public build(): IBankIdAuthRequest {
        return this.properties as IBankIdAuthRequest;
    }
}
