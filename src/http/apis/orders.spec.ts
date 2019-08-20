const fixtures = require("../../../test/fixtures");

import Configuration from "../../config";
import { create, init } from "./orders";

const fixture = (name: string, withValues: any = undefined): any =>
    fixtures.create(name, withValues);

describe("API: Orders", () => {
    describe("init()", () => {
        it("calls the correct URL", async () => {
            const address = "https://www.example.com";
            const config = Configuration.bind({
                api: {
                    address,
                },
            });

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

            const expected = `${address}/orders/new?vehicleId=${request.id}`;
            const args = http.json.mock.calls[0];
            expect(args[0]).toEqual(expected);
        });
        it("throws error if response was unsuccessful", async () => {
            const address = "https://www.example.com";
            const config = Configuration.bind({
                api: {
                    address,
                },
            });

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
            const address = "https://www.example.com";
            const config = Configuration.bind({
                api: {
                    address,
                },
            });

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
            const address = "https://www.example.com";
            const config = Configuration.bind({
                api: {
                    address,
                },
            });

            const http = require("..");
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

            const expected = `${address}/orders`;
            const args = http.json.mock.calls[0];
            expect(args[0]).toEqual(expected);
        });
        it("throws error if response was unsuccessful", async () => {
            const address = "https://www.example.com";
            const config = Configuration.bind({
                api: {
                    address,
                },
            });

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
                await create(fixture("IOrderCreateRequest"), config);
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
        });
        it("throws error if data validation fails", async () => {
            const address = "https://www.example.com";
            const config = Configuration.bind({
                api: {
                    address,
                },
            });

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
                await create(fixture("IOrderCreateRequest"), config);
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
        });
        it("doesn't populate `insurance` property if not set", async () => {
            const address = "https://www.example.com";
            const config = Configuration.bind({
                api: {
                    address,
                },
            });

            const http = require("..");
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
            const address = "https://www.example.com";
            const config = Configuration.bind({
                api: {
                    address,
                },
            });

            const http = require("..");
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
    });
});
