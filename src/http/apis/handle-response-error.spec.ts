const fixtures = require("../../../test/fixtures");
const fixture = (name: string, withValues: any = undefined): any =>
    fixtures.create(name, withValues);

import { ResponseError } from "../../errors/request-error";
import { VehicleUnavailableError } from "../../errors/vehicle-unavailable-error";
import handleResponseError from "./handle-response-error";

describe("Handle response error", () => {
    describe("Given any response error", () => {
        it("Should throw a generic error", async () => {
            const content = fixture("IApiResponse");
            const response = { json: () => Promise.resolve(content) } as any;
            const error = new ResponseError(response, "");

            await expect(handleResponseError(error)).rejects.toThrow(Error);
        });
    });

    describe("Given vehicle unavailable exception", () => {
        it("Should throw VehicleUnavailableError", async () => {
            const content = fixture("IApiResponse", {
                type: "VehicleUnavailableException",
            });
            const response = { json: () => Promise.resolve(content) } as any;
            const error = new ResponseError(response, "");

            await expect(handleResponseError(error)).rejects.toThrow(
                VehicleUnavailableError
            );
        });
    });
});
