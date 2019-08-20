const fixtures = require("../../../test/fixtures");

import Configuration from "../../config";
import { find } from "./insurances";

const fixture = (name: string, withData: any = undefined): any =>
    fixtures.create(name, withData);

describe("API: Insurances", () => {
    describe("find()", () => {
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
                        const data = fixture("IInsuranceOptionsResponse");
                        const response = fixture("IApiResponse", {
                            response: data,
                            successful: true,
                        });
                        resolve(response);
                    })
            );
            await find(fixture("IInsuranceOptionsRequest"), config);

            const expected = `${address}/insurance`;
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
                await find(fixture("IInsuranceOptionsRequest"), config);
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
                await find(fixture("IInsuranceOptionsRequest"), config);
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
        });
    });
});
