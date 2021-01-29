const fixtures = require("../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { AuthMethod } from "../bankid/types";
import { CreditAssessmentSignResponse } from "./sign-response";

describe("Create credit assessment sign response", () => {
    describe("Given same device method", () => {
        it("Should be same device response", () => {
            const apiResponse = fixture("ICreditAssessmentSignApiResponse");

            const response = new CreditAssessmentSignResponse(
                apiResponse,
                AuthMethod.SameDevice
            );

            expect(response.isSameDevice()).toBe(true);
            expect(response.isQrCode()).toBe(false);
        });
    });

    describe("Given qr code method", () => {
        it("Should be qr code response", () => {
            const apiResponse = fixture("ICreditAssessmentSignApiResponse");

            const response = new CreditAssessmentSignResponse(
                apiResponse,
                AuthMethod.QrCode
            );

            expect(response.isQrCode()).toBe(true);
            expect(response.isSameDevice()).toBe(false);
        });
    });
});
