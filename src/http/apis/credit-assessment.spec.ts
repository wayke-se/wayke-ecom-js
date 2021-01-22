const fixtures = require("../../../test/fixtures");
const fixture = (name: string, withValues: any = undefined): any =>
    fixtures.create(name, withValues);

const http = require("..");

import { getStatus, newCase } from "./credit-assessment";

describe("API: Credit Assessment", () => {
    describe("Given unsuccessful request", () => {
        beforeAll(() => {
            http.json = jest.fn(
                () =>
                    new Promise((resolve) => {
                        const response = fixture("IApiResponse", {
                            successful: false,
                        });
                        resolve(response);
                    })
            );
        });

        describe("newCase()", () => {
            it("Throws error", async () => {
                const inquiry = fixture("ICreditAssessmentInquiry");

                let err: any;
                try {
                    await newCase(inquiry);
                } catch (e) {
                    err = e;
                }

                expect(err).toBeInstanceOf(Error);
            });
        });

        describe("getStatus()", () => {
            it("Throws error", async () => {
                let err: any;
                try {
                    await getStatus("test-case-id");
                } catch (e) {
                    err = e;
                }

                expect(err).toBeInstanceOf(Error);
            });
        });
    });
});
