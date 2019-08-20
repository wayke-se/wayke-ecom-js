const fixtures = require("../../test/fixtures");

import { InsuranceOptionsResponse } from "./insurance-options-response";

const fixture = (name: string, withData: any = undefined): any =>
    fixtures.create(name, withData);

describe("InsuranceOptionsResponse", () => {
    describe(":constructor()", () => {
        it("throws error for missing response param", () => {
            expect(() => {
                new InsuranceOptionsResponse(null as any);
            }).toThrowError();
        });
    });

    describe(":getInsuranceOption()", () => {
        it("returns a IInsuranceOption with mapped data from IInsuranceOptionsResponse", () => {
            const response = fixture("IInsuranceOptionsResponse");

            const expected = {
                brand: {
                    name: response.branding.name,
                    description: response.branding.description,
                    logotype: response.branding.logo.file.url,
                    terms: {
                        url: response.branding.termsUrl,
                    },
                    url: response.branding.website,
                },
                name: response.details.name,
                description: response.details.description,
                price: response.details.price,
                unit: response.details.unit,
                conditions: {
                    description: response.details.legalDescription,
                    url: response.details.legalUrl,
                },
                addons: response.details.addOns.map((addon: any) => ({
                    title: addon.title,
                    name: addon.name,
                    description: addon.description,
                    monthlyPrice: addon.monthlyPrice,
                    excludes: addon.exclude,
                })),
                items: response.details.insuranceItems.map((item: any) => ({
                    name: item.name,
                    description: item.description,
                })),
            };
            const actual = new InsuranceOptionsResponse(
                response
            ).getInsuranceOption();

            expect(actual).toEqual(expected);
        });
    });
});
