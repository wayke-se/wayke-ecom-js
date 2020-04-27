const fixtures = require("../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { BankIdAuthRequestBuilder } from "./bankid-auth-request-builder";
import { IBankIdAuthRequest, AuthMethod } from "./types";
import * as bankid from ".";

const api = require("../http/apis/bankid");

describe("BankId Functions", () => {
    describe(":newAuthRequest()", () => {
        it("returns correct builder type", () => {
            const builder = bankid.newAuthRequest();

            expect(builder).toBeInstanceOf(BankIdAuthRequestBuilder);
        });

        it("returns a new builder instance", () => {
            const b1 = bankid.newAuthRequest();
            const b2 = bankid.newAuthRequest();

            expect(b1).not.toBe(b2);
        });
    });

    describe(":auth()", () => {
        let request: IBankIdAuthRequest;

        beforeAll(() => {
            api.auth = jest.fn().mockImplementation(
                () =>
                    new Promise(resolve => {
                        const response = fixture("IBankIdAuthApiResponse");
                        resolve(response);
                    })
            );

            request = fixture("IBankIdAuthRequest");
        });

        it("Should validate request", async () => {
            const spy = jest.spyOn(BankIdAuthRequestBuilder, "validate");
            await bankid.auth(request);

            expect(spy).toHaveBeenCalledWith(request);
        });

        it("Response should have same method as request", async () => {
            const response = await bankid.auth(request);
            expect(response.getMethod()).toEqual(request.method);
        });

        afterAll(() => {
            api.auth.mockClear();
        });
    });
});
