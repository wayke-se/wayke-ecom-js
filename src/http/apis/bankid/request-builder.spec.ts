const fixtures = require("../../../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { auth, collect } from "./request-builder";
import { IBankIdAuthRequest, IBankIdCollectRequest } from "../../../bankid/types";

const http = require("../../");

describe("BankId Request Builder", () => {
    let requestForgeryToken: string;

    beforeAll(() => {
        const response = fixture("IApiResponse");
        http.context = jest.fn(() => ({ requestForgeryToken }));
        requestForgeryToken = response.requestForgeryToken;
    });

    describe(":buildRequest(IBankIdAuthRequest)", () => {
        let requestOptions: IBankIdAuthRequest;
    
        beforeAll(() => {
            requestOptions = fixture("IBankIdAuthRequest");
        });

        it("Should have body with ip address", () => {
            const request = auth(requestOptions);

            var parsedBody = JSON.parse(request.body as string);
            expect(parsedBody).toEqual({ ipAddress: requestOptions.ipAddress });
        });

        it("Should have request forgery token header", () => {
            const request = auth(requestOptions);
            expect(request.headers).toHaveProperty("x-rf-token", requestForgeryToken);
        });
    });

    describe(":buildRequest(IBankIdCollectRequest)", () => {
        let requestOptions: IBankIdCollectRequest;
    
        beforeAll(() => {
            requestOptions = fixture("IBankIdCollectRequest");
        });

        it("Should have body with order ref", () => {
            const request = collect(requestOptions);

            var parsedBody = JSON.parse(request.body as string);
            expect(parsedBody).toEqual({ orderRef: requestOptions.orderRef });
        });

        it("Should have request forgery token header", () => {
            const request = collect(requestOptions);
            expect(request.headers).toHaveProperty("x-rf-token", requestForgeryToken);
        });
    });
});
