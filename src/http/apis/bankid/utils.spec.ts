const fixtures = require("../../../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { getAuthUrl, getCollectUrl, getCancelUrl } from "./utils";
import Configuration from "../../../config";
import { BankIdAuthRequestBuilder } from "../../../bankid/bankid-auth-request-builder";
import { AuthMethod, IBankIdAuthRequest } from "../../../bankid/types";

describe("BankId Api Utils", () => {
    describe("Given bound configuration", () => {
        let host: string;

        beforeAll(() => {
            const fake = fixture("IConfiguration");
            const config = Configuration.bind(fake);
            host = config.getApiAddress();
        });

        describe(":getAuthUrl(), with bound configuration", () => {
            it("Should be same device route, given same device request", () => {
                var request = new BankIdAuthRequestBuilder()
                    .withMethod(AuthMethod.SameDevice)
                    .build();

                var url = getAuthUrl(request);

                expect(url).toEqual(`${host}/bankid/auth/same-device`);
            });

            it("Should be qr code route, given qr code request", () => {
                var request = new BankIdAuthRequestBuilder()
                    .withMethod(AuthMethod.QrCode)
                    .build();

                var url = getAuthUrl(request);

                expect(url).toEqual(`${host}/bankid/auth/qr-code`);
            });
        });

        describe(":getCollectUrl()", () => {
            it("Should be collect url", () => {
                const orderRef = fixture("IBankIdCollectRequest").orderRef;

                var url = getCollectUrl(orderRef);

                expect(url).toEqual(`${host}/bankid/collect/${orderRef}`);
            });
        });

        describe(":getCancelUrl()", () => {
            it("Should be cancel url", () => {
                const orderRef = fixture("IBankIdCancelRequest").orderRef;

                var url = getCancelUrl(orderRef);

                expect(url).toEqual(`${host}/bankid/cancel/${orderRef}`);
            });
        });
    });

    describe("Given no bound configuration", () => {
        beforeAll(() => {
            Configuration.destroy();
        });

        it(":getAuthUrl(), should throw", () => {
            expect(() => {
                var request = fixture("IBankIdAuthRequest");
                getAuthUrl(request);
            }).toThrowError();
        });

        it(":getCollectUrl(), should throw", () => {
            expect(() => {
                var request = fixture("IBankIdCollectRequest");
                getCollectUrl(request);
            }).toThrowError();
        });

        it(":getCancelUrl(), should throw", () => {
            expect(() => {
                var request = fixture("IBankIdCancelRequest");
                getCancelUrl(request);
            }).toThrowError();
        });
    });
});
