const fixtures = require("../../../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import {
    buildAuthRequest,
    buildCollectRequest,
    buildCancelRequest,
} from "./request-builder";
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
        it("Should have request forgery token header", () => {
            const request = buildCollectRequest();
            expect(request.headers).toHaveProperty(
                "x-rf-token",
                requestForgeryToken
            );
        });
    });

    describe(":buildCancelRequest()", () => {
        it("Should have request forgery token header", () => {
            const request = buildCancelRequest();
            expect(request.headers).toHaveProperty(
                "x-rf-token",
                requestForgeryToken
            );
        });
    });
});
