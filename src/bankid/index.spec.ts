import { BankIdAuthRequestBuilder } from "./bankid-auth-request-builder";

import * as bankid from ".";

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
});
