const fixtures = require("../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import {
    AuthMethod,
    IBankIdAuthResponse,
    IBankIdAuthApiResponse,
} from "./types";
import { BankIdAuthResponse } from "./bankid-auth-response";

describe("BankId Auth Response", () => {
    describe("Given qr code method", () => {
        let apiResponse: IBankIdAuthApiResponse;
        let response: IBankIdAuthResponse;

        beforeAll(() => {
            apiResponse = fixture("IBankIdAuthApiResponse");
            response = new BankIdAuthResponse(apiResponse, AuthMethod.QrCode);
        });

        it("Should be qr code response", () => {
            expect(response.isQrCode).toBeTruthy();
        });

        it("Should have qr code", () => {
            expect(response.getQrCode()).toEqual(apiResponse.qrCodeAsBase64);
        });

        it(":getAutoStartUrl(), should throw", () => {
            expect(() => {
                response.getAutoStartUrl();
            }).toThrowError();
        });
    });

    describe("Given same device method", () => {
        let apiResponse: IBankIdAuthApiResponse;
        let response: IBankIdAuthResponse;

        beforeAll(() => {
            apiResponse = fixture("IBankIdAuthApiResponse");
            response = new BankIdAuthResponse(
                apiResponse,
                AuthMethod.SameDevice
            );
        });

        it("Should be same device response", () => {
            expect(response.isSameDevice).toBeTruthy();
        });

        it("Should have auto start url", () => {
            expect(response.getAutoStartUrl()).toEqual(
                apiResponse.autoStartUrl
            );
        });

        it(":getQrCode(), should throw", () => {
            expect(() => {
                response.getQrCode();
            }).toThrowError();
        });
    });
});
