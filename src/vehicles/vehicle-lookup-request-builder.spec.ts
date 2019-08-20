const fixtures = require("../../test/fixtures");

import { VehicleLookupRequestBuilder } from "./vehicle-lookup-request-builder";

const fixture = (name: string): any => fixtures.create(name);

describe("VehicleLookupRequestBuilder", () => {
    describe(".validateRequest()", () => {
        it("fails and throws error for missing request", () => {
            expect(() => {
                VehicleLookupRequestBuilder.validateRequest(null as any);
            }).toThrowError();
        });
        it("fails and throws error for missing registration number value", () => {
            expect(() => {
                const request = fixture("IVehicleLookupRequest");
                delete request.registrationNumber;
                VehicleLookupRequestBuilder.validateRequest(request);
            }).toThrowError();
        });
        it("does not throw for valid requests", () => {
            expect(() => {
                const request = fixture("IVehicleLookupRequest");
                VehicleLookupRequestBuilder.validateRequest(request);
            }).not.toThrowError();
        });
    });

    describe(":withRegistrationNumber()", () => {
        it("returns the VehicleLookupRequestBuilder instance", () => {
            const builder = new VehicleLookupRequestBuilder();
            const instance = builder.withRegistrationNumber("ABC123");

            expect(instance).toBe(builder);
        });
    });

    describe(":build()", () => {
        it("returns a IVehicleLookupRequest for the specified builder properties", () => {
            const expected = fixture("IVehicleLookupRequest");
            const actual = new VehicleLookupRequestBuilder()
                .withRegistrationNumber(expected.registrationNumber)
                .build();

            expect(actual).toEqual(expected);
        });
    });
});
