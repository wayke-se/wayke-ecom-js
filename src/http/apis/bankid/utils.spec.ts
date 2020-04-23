const fixtures = require("../../../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { getUrl } from "./utils";
import Configuration from "../../../config";
import { BankIdAuthRequestBuilder } from "../../../bankid/bankid-auth-request-builder";
import { AuthMethod, IBankIdAuthRequest } from "../../../bankid/types";

describe("BankId Api Utils", () => {
    describe(":getUrl(IBankIdAuthRequest), with bound configuration", () => {
        let host: string;
    
        beforeAll(() => {
            const fake = fixture("IConfiguration");
            const config = Configuration.bind(fake);
            host = config.getApiAddress();
        });

        it("Given same device request, should have same device route", () => {
            var request = new BankIdAuthRequestBuilder()
                .withMethod(AuthMethod.SameDevice)
                .build();
            
            var url = getUrl(request);

            expect(url).toEqual(`${host}/bankid/auth/same-device`);
        });

        it("Given qr code request, should have qr code route", () => {
            var request = new BankIdAuthRequestBuilder()
                .withMethod(AuthMethod.QrCode)
                .build();
            
            var url = getUrl(request);

            expect(url).toEqual(`${host}/bankid/auth/qr-code`);
        });
    });
    
    describe(":getUrl(IBankIdAuthRequest), with no bound configuration", () => {
        beforeAll(() => {
            Configuration.destroy();
        });

        it("Should throw", () => {
            expect(() => {
                var request = new BankIdAuthRequestBuilder()
                    .withMethod(AuthMethod.QrCode)
                    .build();
                getUrl(request);
            }).toThrowError();
        });
    });
});
