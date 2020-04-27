const fixtures = require("../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { IBankIdCollectApiResponse, IBankIdCollectRespone, IBankIdCollectRequest } from "./types";
import { BankIdCollectResponse } from "./bank-id-collect-response";

describe("BankId Collect Response", () => {
    let request: IBankIdCollectRequest;
    let apiResponse: IBankIdCollectApiResponse;
    let response: IBankIdCollectRespone;

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
