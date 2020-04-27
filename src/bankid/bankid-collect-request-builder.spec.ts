const fixtures = require("../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { BankIdCollectRequestBuilder } from "./bankid-collect-request-builder";
import { IBankIdCollectRequest, AuthMethod } from "./types";

const REQUEST_NAME = "IBankIdCollectRequest";

describe("BankIdCollectRequestBuilder", () => {
    describe(".validate()", () => {
        it("given null request, should throw", () => {
            expect(() => {
                BankIdCollectRequestBuilder.validate(null as any);
            }).toThrowError();
        });

        it("given missing method, should throw", () => {
            expect(() => {
                const request = fixture(REQUEST_NAME);
                delete request.method;
                BankIdCollectRequestBuilder.validate(request);
            }).toThrowError();
        });

        it("given missing order ref, should throw", () => {
            expect(() => {
                const request = fixture(REQUEST_NAME);
                delete request.orderRef;
                BankIdCollectRequestBuilder.validate(request);
            }).toThrowError();
        });

        it("does not throw for valid requests", () => {
            expect(() => {
                const request = fixture(REQUEST_NAME);
                BankIdCollectRequestBuilder.validate(request);
            }).not.toThrowError();
        });
    });

    describe(":withMethod()", () => {
        it("returns the builder instance", () => {
            const builder = new BankIdCollectRequestBuilder();
            const instance = builder.withMethod(AuthMethod.QrCode);

            expect(instance).toBe(builder);
        });
    });

    describe(":withOrderRef()", () => {
        it("returns the builder instance", () => {
            const builder = new BankIdCollectRequestBuilder();
            const instance = builder.withOrderRef("order-ref");

            expect(instance).toBe(builder);
        });
    });

    describe(":build()", () => {
        it("returns request with specified properties", () => {
            const expected = fixture(REQUEST_NAME);
            const actual = new BankIdCollectRequestBuilder()
                .withMethod(expected.method)
                .withOrderRef(expected.orderRef)
                .build();

            expect(actual).toEqual(expected);
        });
    });
});
