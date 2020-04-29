const fixtures = require("../../../test/fixtures");
const fixture = (name: string, withValues: any = undefined): any =>
    fixtures.create(name, withValues);

import { auth, collect, cancel } from "./bankid";

const http = require("..");
const utils = require("./bankid/utils");
const requestBuilder = require("./bankid/request-builder");

describe("API: BankId", () => {
    beforeAll(() => {
        utils.getUrl = jest.fn();
        requestBuilder.buildRequest = jest.fn();

        http.json = jest.fn(
            () =>
                new Promise(resolve => {
                    const response = fixture("IApiResponse", {
                        successful: false,
                    });
                    resolve(response);
                })
        );
    });

    describe(":auth()", () => {
        it("throws error if response was unsuccessful", async () => {
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

    describe(":collect()", () => {
        it("throws error if response was unsuccessful", async () => {
            const request = fixture("IBankIdCollectRequest");

            let err: any;
            try {
                await collect(request);
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
        });
    });

    describe(":cancel()", () => {
        it("throws error if response was unsuccessful", async () => {
            const request = fixture("IBankIdCancelRequest");

            let err: any;
            try {
                await cancel(request);
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
        });
    });
});
