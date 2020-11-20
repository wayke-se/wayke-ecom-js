const fixtures = require("../../test/fixtures");

import { CustomerBuilder } from "./customer-builder";

const fixture = (id: string, withData: any = undefined): any =>
    fixtures.create(id, withData);

describe("CustomerBuilder", () => {
    describe(":build()", () => {
        it("returns a ICustomer for the specified builder properties", () => {
            const expected = fixture("ICustomer");

            const actual = new CustomerBuilder()
                .withAddress(expected.address)
                .withEmail(expected.email)
                .withPersonalNumber(expected.personalNumber)
                .withPhoneNumber(expected.phoneNumber)
                .withGivenName(expected.givenName)
                .withSurname(expected.surname)
                .build();

            expect(actual).toEqual(expected);
        });
    });
});
