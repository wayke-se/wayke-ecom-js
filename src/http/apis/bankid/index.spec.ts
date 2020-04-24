const fixtures = require("../../../../test/fixtures");
const fixture = (name: string, withValues: any = undefined): any =>
    fixtures.create(name, withValues);

import { auth } from "./";

const http = require("../..");
const utils = require("./utils");
const requestBuilder = require("./request-builder");

describe("API: BankId", () => {
    beforeAll(() => {
        utils.getUrl = jest.fn();
        requestBuilder.buildRequest = jest.fn();
    });

    describe(":auth()", () => {
        it("throws error if response was unsuccessful", async () => {
            http.json = jest.fn(
                () =>
                    new Promise(resolve => {
                        const response = fixture("IApiResponse", {
                            successful: false,
                        });
                        resolve(response);
                    })
            );
            const request = fixture("IBankIdAuthRequest");
            
            let err: any;
            try {
                await auth(request);
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
        });
    });
});
