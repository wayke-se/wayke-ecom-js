const fixtures = require("../../../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { buildRequest, getUrl } from "./auth";
import Configuration, { IConfigurationRoot } from "../../../config";
import { IBankIdAuthRequest, AuthMethod } from "../../../bankid/types";
import { BANK_ID_THUMBPRINT_HEADER } from "../../http-request-builder";
const http = require("../../");

describe("BankId Auth", () => {
    describe("Given bank id thumbprint configured", () => {
        let requestForgeryToken: string;
        let configSpecification: IConfigurationRoot;
        let host: string;
    
        beforeAll(() => {
            const response = fixture("IApiResponse");
            http.context = jest.fn(() => ({ requestForgeryToken }));
            requestForgeryToken = response.requestForgeryToken;
    
            configSpecification = fixture("IConfiguration");
            const config = Configuration.bind(configSpecification);
            host = config.getApiAddress();
        });
    
        describe(":buildRequest()", () => {
            it("Should have request forgery token header", () => {
                const request = buildRequest();
                expect(request.headers).toHaveProperty(
                    "x-rf-token",
                    requestForgeryToken
                );
            });
    
            it("Should have bank id thumbprint header", () => {
                const request = buildRequest();
                expect(request.headers).toHaveProperty(
                    BANK_ID_THUMBPRINT_HEADER,
                    configSpecification.bankIdThumbprint
                );
            });
        });
    
        describe(":getUrl()", () => {
            it("Should be same device route, given same device method", () => {
                const request = fixtures.create(
                    "IBankIdAuthRequest",
                    (r: IBankIdAuthRequest) => {
                        r.method = AuthMethod.SameDevice;
                        return r;
                    }
                );
    
                var url = getUrl(request);
    
                expect(url).toEqual(`${host}/bankid/auth/same-device`);
            });
    
            it("Should be qr code route, given qr code method", () => {
                const request = fixtures.create(
                    "IBankIdAuthRequest",
                    (r: IBankIdAuthRequest) => {
                        r.method = AuthMethod.QrCode;
                        return r;
                    }
                );
    
                var url = getUrl(request);
    
                expect(url).toEqual(`${host}/bankid/auth/qr-code`);
            });
        });
    });

    describe("Given no bank id thumbprint configured", () => {
        beforeAll(() => {
            const fake = fixture("IConfiguration");
            delete fake.bankIdThumbprint;
            const config = Configuration.bind(fake);
        });

        describe(":buildRequest()", () => {
            it("Should not have bank id thumbprint header", () => {
                const request = buildRequest();
                expect(request.headers).not.toHaveProperty(BANK_ID_THUMBPRINT_HEADER);
            });
        });
    });
});
