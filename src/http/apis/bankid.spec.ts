const fixtures = require("../../../test/fixtures");
const fixture = (name: string, withValues: any = undefined): any =>
    fixtures.create(name, withValues);

const http = require("..");
const authApi = require("./bankid/auth");
const collectApi = require("./bankid/collect");
const cancelApi = require("./bankid/cancel");

import {
    IBankIdAuthApiResponse,
    IBankIdCollectApiResponse,
} from "../../bankid/types";
import { auth, collect, cancel } from "./bankid";

describe("API: BankId", () => {
    beforeAll(() => {
        authApi.getUrl = jest.fn();
        authApi.buildRequest = jest.fn();
        collectApi.getUrl = jest.fn();
        collectApi.buildRequest = jest.fn();
        cancelApi.getUrl = jest.fn();
    });

    describe("Given unsuccessful request", () => {
        beforeAll(() => {
            http.json = jest.fn(
                () =>
                    new Promise(resolve => {
                        const response = fixture("IApiResponse", {
                            successful: false,
                        });
                        resolve(response);
                    })
            );
            http.raw = jest.fn(() => {
                throw new Error();
            });
        });

        describe(":auth()", () => {
            it("throws error", async () => {
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
            it("throws error", async () => {
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
            it("throws error", async () => {
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

        afterAll(() => {
            http.json.mockRestore();
            http.raw.mockRestore();
        });
    });

    describe("Given successful request", () => {
        describe(":auth()", () => {
            let expectedRespones: IBankIdAuthApiResponse;

            beforeAll(() => {
                expectedRespones = fixture("IBankIdAuthApiResponse");
                http.json = jest.fn(
                    () =>
                        new Promise(resolve => {
                            const apiResponse = fixture("IApiResponse", {
                                successful: true,
                                response: expectedRespones,
                            });
                            resolve(apiResponse);
                        })
                );
            });

            it("return auth response", async () => {
                const request = fixture("IBankIdAuthRequest");

                const response = await auth(request);

                expect(response).toEqual(expectedRespones);
            });

            afterAll(() => {
                http.json.mockRestore();
            });
        });

        describe(":collect()", () => {
            let expectedRespones: IBankIdCollectApiResponse;

            beforeAll(() => {
                expectedRespones = fixture("IBankIdCollectApiResponse");
                http.json = jest.fn(
                    () =>
                        new Promise(resolve => {
                            const apiResponse = fixture("IApiResponse", {
                                successful: true,
                                response: expectedRespones,
                            });
                            resolve(apiResponse);
                        })
                );
            });

            it("return collect response", async () => {
                const request = fixture("IBankIdAuthRequest");

                const response = await collect(request);

                expect(response).toEqual(expectedRespones);
            });

            afterAll(() => {
                http.json.mockRestore();
            });
        });
    });
});
