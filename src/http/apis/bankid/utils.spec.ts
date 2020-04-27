const fixtures = require("../../../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { getAuthUrl, getCollectUrl } from "./utils";
import Configuration from "../../../config";
import { BankIdAuthRequestBuilder } from "../../../bankid/bankid-auth-request-builder";
import { AuthMethod, IBankIdAuthRequest } from "../../../bankid/types";

describe("BankId Api Utils", () => {
    describe(":getAuthUrl(), with bound configuration", () => {
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

            var url = getAuthUrl(request);

            expect(url).toEqual(`${host}/bankid/auth/same-device`);
        });

        it("Given qr code request, should have qr code route", () => {
            var request = new BankIdAuthRequestBuilder()
                .withMethod(AuthMethod.QrCode)
                .build();

            var url = getAuthUrl(request);

            expect(url).toEqual(`${host}/bankid/auth/qr-code`);
        });
    });

    describe(":getAuthUrl(), with no bound configuration", () => {
        beforeAll(() => {
            Configuration.destroy();
        });

        it("Should throw", () => {
            expect(() => {
                var request = new BankIdAuthRequestBuilder()
                    .withMethod(AuthMethod.QrCode)
                    .build();
                getAuthUrl(request);
            }).toThrowError();
        });
    });

    describe(":getCollectUrl()", () => {
        let host: string;

        beforeAll(() => {
            const fake = fixture("IConfiguration");
            const config = Configuration.bind(fake);
            host = config.getApiAddress();
        });

        it("Should be collect url", () => {
            const orderRef = fixture("IBankIdCollectRequest").orderRef;
            
            var url = getCollectUrl(orderRef);

            expect(url).toEqual(`${host}/bankid/collect/${orderRef}`);
        });
    });
});
