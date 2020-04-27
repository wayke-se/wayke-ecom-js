const fixtures = require("../../../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { buildAuthRequest, buildCollectRequest } from "./request-builder";
import {
    IBankIdAuthRequest,
    IBankIdCollectRequest,
} from "../../../bankid/types";

const http = require("../../");

describe("BankId Request Builder", () => {
    let requestForgeryToken: string;

    beforeAll(() => {
        const response = fixture("IApiResponse");
        http.context = jest.fn(() => ({ requestForgeryToken }));
        requestForgeryToken = response.requestForgeryToken;
    });

    describe(":buildAuthRequest()", () => {
        let requestOptions: IBankIdAuthRequest;

        beforeAll(() => {
            requestOptions = fixture("IBankIdAuthRequest");
        });

        it("Should have body with ip address", () => {
            const request = buildAuthRequest(requestOptions);

            var parsedBody = JSON.parse(request.body as string);
            expect(parsedBody).toEqual({ ipAddress: requestOptions.ipAddress });
        });

        it("Should have request forgery token header", () => {
            const request = buildAuthRequest(requestOptions);
            expect(request.headers).toHaveProperty(
                "x-rf-token",
                requestForgeryToken
            );
        });
    });

    describe(":buildCollectRequest()", () => {
        let requestOptions: IBankIdCollectRequest;

        beforeAll(() => {
            requestOptions = fixture("IBankIdCollectRequest");
        });

        it("Should have body with order ref", () => {
            const request = buildCollectRequest(requestOptions);

            var parsedBody = JSON.parse(request.body as string);
            expect(parsedBody).toEqual({ orderRef: requestOptions.orderRef });
        });

        it("Should have request forgery token header", () => {
            const request = buildCollectRequest(requestOptions);
            expect(request.headers).toHaveProperty(
                "x-rf-token",
                requestForgeryToken
            );
        });
    });
});
