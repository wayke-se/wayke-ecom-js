const fixtures = require("../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import {
    IBankIdCollectApiResponse,
    IBankIdCollectResponse,
    IBankIdCollectRequest,
    AuthMethod,
    AuthStatus
} from "./types";
import { BankIdCollectResponse } from "./bankid-collect-response";

describe("BankId Collect Response", () => {
    describe("Given any request", () => {
        let request: IBankIdCollectRequest;
        let apiResponse: IBankIdCollectApiResponse;
        let response: IBankIdCollectResponse;
    
        beforeAll(() => {
            request = fixture("IBankIdCollectRequest");
            apiResponse = fixture("IBankIdCollectApiResponse");
            response = new BankIdCollectResponse(apiResponse, request.method);
        });
    
        it("Should have order ref", () => {
            expect(response.getOrderRef()).toEqual(apiResponse.orderRef);
        });
    
        it("Should have status", () => {
            expect(response.getStatus()).toEqual(apiResponse.status);
        });
    
        it("Should have hint code", () => {
            expect(response.getHintCode()).toEqual(apiResponse.hintCode);
        });
    });

    describe("Given expired qr code", () => {
        it("Should renew", () => {
            const apiResponse = fixtures.create("IBankIdCollectApiResponse", (res: IBankIdCollectApiResponse) => {
                res.hintCode = BankIdCollectResponse.START_FAILED_CODE;
                return res;
            });
            const response = new BankIdCollectResponse(apiResponse, AuthMethod.QrCode);

            expect(response.shouldRenew()).toBeTruthy();
        });
    });

    describe("Given complete response", () => {
        let request: IBankIdCollectRequest;
        let apiResponse: IBankIdCollectApiResponse;
        let response: IBankIdCollectResponse;
    
        beforeAll(() => {
            request = fixture("IBankIdCollectRequest");
            apiResponse = fixtures.create("IBankIdCollectApiResponse", (res: IBankIdCollectApiResponse) => {
                res.status = "complete";
                return res;
            });
            response = new BankIdCollectResponse(apiResponse, request.method);
        });
    
        it("Should have completed status", () => {
            expect(response.getStatus()).toBe(AuthStatus.Complete);
        });
    
        it("Should have personal number", () => {
            var apiPersonalNumber = apiResponse.completionData &&
                apiResponse.completionData.personalNumber;
            expect(response.getPersonalNumber()).toEqual(apiPersonalNumber);
        });
    
        it("Should have address", () => {
            const apiAddress = apiResponse.completionData &&
                apiResponse.completionData.address;
            expect(response.getAddress()).toEqual(apiAddress);
        });
    });
});
