const fixtures = require("../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { BankIdAuthRequestBuilder } from "./bankid-auth-request-builder";
import { AuthMethod } from "./types";

const BANK_ID_AUTH_REQUEST = "IBankIdAuthRequest";

describe("BankIdAuthRequestBuilder", () => {
    describe(".validate()", () => {
        it("given null request, should throw", () => {
            expect(() => {
                BankIdAuthRequestBuilder.validate(null as any);
            }).toThrowError();
        });

        it("given missing auth method, should throw", () => {
            expect(() => {
                const request = fixture(BANK_ID_AUTH_REQUEST);
                delete request.method;
                BankIdAuthRequestBuilder.validate(request);
            }).toThrowError();
        });

        it("does not throw for valid requests", () => {
            expect(() => {
                const request = fixture(BANK_ID_AUTH_REQUEST);
                BankIdAuthRequestBuilder.validate(request);
            }).not.toThrowError();
        });
    });

    describe(":withMethod()", () => {
        it("returns the builder instance", () => {
            const builder = new BankIdAuthRequestBuilder();
            const instance = builder.withMethod(AuthMethod.QrCode);

            expect(instance).toBe(builder);
        });
    });

    describe(":withIpAddress()", () => {
        it("returns the builder instance", () => {
            const builder = new BankIdAuthRequestBuilder();
            const instance = builder.withIpAddress("130.242.197.92");

            expect(instance).toBe(builder);
        });
    });

    describe(":build()", () => {
        it("returns a IBankIdAuthRequest for the specified builder properties", () => {
            const expected = fixture(BANK_ID_AUTH_REQUEST);
            const actual = new BankIdAuthRequestBuilder()
                .withMethod(expected.method)
                .withIpAddress(expected.ipAddress)
                .build();

            expect(actual).toEqual(expected);
        });
    });
});
