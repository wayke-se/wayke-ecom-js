const fixtures = require("../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { IBankIdCollectApiResponse, IBankIdCollectResponse, IBankIdCollectRequest } from "./types";
import { BankIdCollectResponse } from "./bankid-collect-response";

describe("BankId Collect Response", () => {
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
});
