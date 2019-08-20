const fixtures = require("../../../test/fixtures");

import Configuration from "../../config";
import { lookup } from "./vehicles";

const fixture = (name: string, withValues: any = undefined): any =>
    fixtures.create(name, withValues);

describe("API: Vehicles", () => {
    describe("lookup()", () => {
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
                        const data = fixture("IVehicleLookupResponse");
                        const response = fixture("IApiResponse", {
                            response: data,
                            successful: true,
                        });
                        resolve(response);
                    })
            );
            const request = fixture("IVehicleLookupRequest");
            await lookup(request, config);

            const expected = `${address}/tradein/${request.registrationNumber}`;
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
                await lookup(fixture("IVehicleLookupRequest"), config);
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
                await lookup(fixture("IVehicleLookupRequest"), config);
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
        });
    });
});
