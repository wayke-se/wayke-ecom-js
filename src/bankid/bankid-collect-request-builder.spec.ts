const fixtures = require("../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { BankIdCollectRequestBuilder } from "./bankid-collect-request-builder";
import { IBankIdCollectRequest, AuthMethod } from "./types";

describe("BankIdCollectRequestBuilder", () => {
    describe(".validate()", () => {
        it("given null request, should throw", () => {
            expect(() => {
                BankIdCollectRequestBuilder.validate(null as any);
            }).toThrowError();
        });

        it("given missing method, should throw", () => {
            expect(() => {
                const request = fixture("IBankIdCollectRequest");
                delete request.method;
                BankIdCollectRequestBuilder.validate(request);
            }).toThrowError();
        });

        it("given missing order ref, should throw", () => {
            expect(() => {
                const request = fixture("IBankIdCollectRequest");
                delete request.orderRef;
                BankIdCollectRequestBuilder.validate(request);
            }).toThrowError();
        });
    });
});
