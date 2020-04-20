const fixtures = require("../../../test/fixtures");

import Configuration from "../../config";
import { create, init } from "./orders";

const fixture = (name: string, withValues: any = undefined): any =>
    fixtures.create(name, withValues);

describe("API: Orders", () => {
    describe("init()", () => {
        it("calls the correct URL", async () => {
            const fake = fixture("IConfiguration");
            const config = Configuration.bind(fake);

            const http = require("..");
            http.json = jest.fn(
                () =>
                    new Promise(resolve => {
                        const data = fixture("IOrderOptionsResponse");
                        const response = fixture("IApiResponse", {
                            response: data,
                            successful: true,
                        });
                        resolve(response);
                    })
            );
            const request = fixture("IOrderOptionsRequest");
            await init(request, config);

            const expected = `${fake.api.address}/v2/orders/new?vehicleId=${request.id}`;
            const args = http.json.mock.calls[0];
            expect(args[0]).toEqual(expected);
        });
        it("sets request forgery token", async () => {
            const config = Configuration.bind(fixture("IConfiguration"));

            const expected = "rf-token";
            const httpContext = { requestForgeryToken: undefined };

            const http = require("..");
            http.captureStateContext = jest.fn(promise => {
                return promise.then((response: any) => {
                    httpContext.requestForgeryToken =
                        response.requestForgeryToken;
                    return response;
                });
            });
            http.json = jest.fn(
                () =>
                    new Promise(resolve => {
                        const data = fixture("IOrderOptionsResponse");
                        const response = fixture("IApiResponse", {
                            response: data,
                            successful: true,
                            requestForgeryToken: expected,
                        });
                        resolve(response);
                    })
            );
            const request = fixture("IOrderOptionsRequest");
            await init(request, config);

            expect(httpContext.requestForgeryToken).toEqual(expected);
        });
        it("throws error if response was unsuccessful", async () => {
            const config = Configuration.bind(fixture("IConfiguration"));

            const http = require("..");
            http.json = jest.fn(
                () =>
                    new Promise(resolve => {
                        const response = fixture("IApiResponse", {
                            successful: false,
                        });
                        resolve(response);
                    })
            );

            let err;
            try {
                await init(fixture("IOrderOptionsRequest"), config);
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
        });
        it("throws error if data validation fails", async () => {
            const config = Configuration.bind(fixture("IConfiguration"));

            const http = require("..");
            http.json = jest.fn(
                () =>
                    new Promise(resolve => {
                        const response = fixture("IApiResponse", {
                            response: null,
                            successful: true,
                        });
                        resolve(response);
                    })
            );

            let err;
            try {
                await init(fixture("IOrderOptionsRequest"), config);
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
        });
    });

    describe("create()", () => {
        it("calls the correct URL", async () => {
            const fake = fixture("IConfiguration");
            const config = Configuration.bind(fake);

            const http = require("..");
            http.context = jest.fn(() => ({ requestForgeryToken: "-" }));
            http.json = jest.fn(
                () =>
                    new Promise(resolve => {
                        const data = fixture("IOrderCreateResponse");
                        const response = fixture("IApiResponse", {
                            response: data,
                            successful: true,
                        });
                        resolve(response);
                    })
            );
            const request = fixture("IOrderCreateRequest");
            await create(request, config);

            const expected = `${fake.api.address}/v2/orders`;
            const args = http.json.mock.calls[0];
            expect(args[0]).toEqual(expected);
        });
        it("uses request forgery token", async () => {
            const config = Configuration.bind(fixture("IConfiguration"));

            const expected = "rf-token";
            const http = require("..");
            http.context = jest.fn(() => ({ requestForgeryToken: expected }));
            http.json = jest.fn(
                () =>
                    new Promise(resolve => {
                        const data = fixture("IOrderCreateResponse");
                        const response = fixture("IApiResponse", {
                            response: data,
                            successful: true,
                        });
                        resolve(response);
                    })
            );
            const request = fixture("IOrderCreateRequest");
            await create(request, config);

            const args = http.json.mock.calls[0];
            const headers = args[1].headers;
            expect(headers["x-rf-token"]).toEqual(expected);
        });
        it("throws error if response was unsuccessful", async () => {
            const config = Configuration.bind(fixture("IConfiguration"));

            const http = require("..");
            http.context = jest.fn(() => ({ requestForgeryToken: "-" }));
            http.json = jest.fn(
                () =>
                    new Promise(resolve => {
                        const response = fixture("IApiResponse", {
                            successful: false,
                        });
                        resolve(response);
                    })
            );

            let err;
            try {
                await create(fixture("IOrderCreateRequest"), config);
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
        });
        it("throws error if data validation fails", async () => {
            const config = Configuration.bind(fixture("IConfiguration"));

            const http = require("..");
            http.context = jest.fn(() => ({ requestForgeryToken: "-" }));
            http.json = jest.fn(
                () =>
                    new Promise(resolve => {
                        const response = fixture("IApiResponse", {
                            response: null,
                            successful: true,
                        });
                        resolve(response);
                    })
            );

            let err;
            try {
                await create(fixture("IOrderCreateRequest"), config);
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
        });
        it("doesn't populate `insurance` property if not set", async () => {
            const config = Configuration.bind(fixture("IConfiguration"));

            const http = require("..");
            http.context = jest.fn(() => ({ requestForgeryToken: "-" }));
            http.json = jest.fn(
                () =>
                    new Promise(resolve => {
                        const data = fixture("IOrderCreateResponse");
                        const response = fixture("IApiResponse", {
                            response: data,
                            successful: true,
                        });
                        resolve(response);
                    })
            );

            const request = fixture("IOrderCreateRequest");
            delete request.insurance;
            await create(request, config);

            const args = http.json.mock.calls[0];
            const body = JSON.parse(args[1].body);
            expect(body.insurance).toBeUndefined();
        });
        it("populates request with personal number from customer, if not available on insurance", async () => {
            const config = Configuration.bind(fixture("IConfiguration"));

            const http = require("..");
            http.context = jest.fn(() => ({ requestForgeryToken: "-" }));
            http.json = jest.fn(
                () =>
                    new Promise(resolve => {
                        const data = fixture("IOrderCreateResponse");
                        const response = fixture("IApiResponse", {
                            response: data,
                            successful: true,
                        });
                        resolve(response);
                    })
            );

            const request = fixture("IOrderCreateRequest");
            delete request.insurance.personalNumber;
            await create(request, config);

            const args = http.json.mock.calls[0];
            const body = JSON.parse(args[1].body);

            const expected = request.customer.personalNumber;
            const actual = body.insurance.socialId;
            expect(actual).toEqual(expected);
        });
        it("populates request with origin from config", async () => {
            const config = Configuration.bind(fixture("IConfiguration"));

            const http = require("..");
            http.context = jest.fn(() => ({ requestForgeryToken: "-" }));
            http.json = jest.fn(
                () =>
                    new Promise(resolve => {
                        const data = fixture("IOrderCreateResponse");
                        const response = fixture("IApiResponse", {
                            response: data,
                            successful: true,
                        });
                        resolve(response);
                    })
            );

            const request = fixture("IOrderCreateRequest");
            await create(request, config);

            const args = http.json.mock.calls[0];
            const body = JSON.parse(args[1].body);

            const expected = JSON.stringify(config.getOrigin());
            const actual = JSON.stringify(body.origin);
            expect(actual).toEqual(expected);
        });
    });
});
