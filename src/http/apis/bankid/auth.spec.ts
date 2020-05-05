const fixtures = require("../../../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { buildRequest, getUrl } from './auth';
import Configuration from "../../../config";
import { IBankIdAuthRequest, AuthMethod } from '../../../bankid/types';
const http = require("../../");

describe("BankId Auth", () => {
    let requestForgeryToken: string;
    let host: string;

    beforeAll(() => {
        const response = fixture("IApiResponse");
        http.context = jest.fn(() => ({ requestForgeryToken }));
        requestForgeryToken = response.requestForgeryToken;

        const fake = fixture("IConfiguration");
        const config = Configuration.bind(fake);
        host = config.getApiAddress();
    });

    describe(":buildRequest()", () => {
        let requestOptions: IBankIdAuthRequest;

        beforeAll(() => {
            requestOptions = fixture("IBankIdAuthRequest");
        });

        it("Should have body with ip address", () => {
            const request = buildRequest(requestOptions);

            var parsedBody = JSON.parse(request.body as string);
            expect(parsedBody).toEqual({ ipAddress: requestOptions.ipAddress });
        });

        it("Should have request forgery token header", () => {
            const request = buildRequest(requestOptions);
            expect(request.headers).toHaveProperty(
                "x-rf-token",
                requestForgeryToken
            );
        });
    });

    describe(":getUrl()", () => {
        it("Should be same device route, given same device method", () => {
            const request = fixtures.create("IBankIdAuthRequest",
                (r: IBankIdAuthRequest) => {
                    r.method = AuthMethod.SameDevice;
                    return r;
                },
            );

            var url = getUrl(request);

            expect(url).toEqual(`${host}/bankid/auth/same-device`);
        });

        it("Should be qr code route, given qr code method", () => {
            const request = fixtures.create("IBankIdAuthRequest",
                (r: IBankIdAuthRequest) => {
                    r.method = AuthMethod.QrCode;
                    return r;
                },
            );

            var url = getUrl(request);

            expect(url).toEqual(`${host}/bankid/auth/qr-code`);
        });
    });
});
