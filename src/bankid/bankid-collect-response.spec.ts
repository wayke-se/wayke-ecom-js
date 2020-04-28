const fixtures = require("../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import {
    IBankIdCollectApiResponse,
    IBankIdCollectResponse,
    IBankIdCollectRequest,
    AuthMethod
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
    })

    describe("Given expired qr code", () => {
        const request = fixture("IBankIdCollectRequest");
        const apiResponse = fixtures.create("IBankIdCollectApiResponse", (res: IBankIdCollectApiResponse) => {
            res.hintCode = BankIdCollectResponse.START_FAILED_CODE;
            return res;
        });
        const response = new BankIdCollectResponse(apiResponse, AuthMethod.QrCode);
    
        it("Should renew", () => {
            expect(response.shouldRenew()).toBeTruthy();
        });
    })
});
