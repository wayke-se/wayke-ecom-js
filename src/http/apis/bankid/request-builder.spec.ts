const fixtures = require("../../../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { buildRequest } from "./request-builder";
import { IBankIdAuthRequest } from "../../../bankid/types";

const http = require("../../");

describe("BankId Request Builder", () => {
    let requestForgeryToken: string;
    let requestOptions: IBankIdAuthRequest;

    beforeAll(() => {
        const response = fixture("IApiResponse");
        http.context = jest.fn(() => ({ requestForgeryToken }));
        requestForgeryToken = response.requestForgeryToken;

        requestOptions = fixture("IBankIdAuthRequest");
    });

    describe(":buildRequest(IBankIdAuthRequest)", () => {
        it("Should have body with ip address", () => {
            const request = buildRequest(requestOptions);

            var parsedBody = JSON.parse(request.body as string);
            expect(parsedBody).toEqual({ ipAddress: requestOptions.ipAddress });
        });

        it("Should have request forgery token header", () => {
            const request = buildRequest(requestOptions);
            expect(request.headers).toHaveProperty("x-rf-token", requestForgeryToken);
        });
    });
});
