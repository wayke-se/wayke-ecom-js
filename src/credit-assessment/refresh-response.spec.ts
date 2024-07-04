const fixtures = require("../../test/fixtures");
const fixture = (name: string, withValues: any = undefined): any =>
    fixtures.create(name, withValues);

import { CreditAssessmentRefreshQrCodeResponse } from "./refresh-response";

describe("Create credit assessment refresh qr code response", () => {
    describe("Given qr code method", () => {
        it("Should have qr code response", () => {
            const caseId = "12345";
            const apiResponse = fixture(
                "ICreditAssessmentRefreshQrCodeApiResponse"
            );

            const response = new CreditAssessmentRefreshQrCodeResponse(
                apiResponse,
                caseId
            );

            expect(response.getQrCode()).toEqual(apiResponse.qrCodeAsBase64);
        });
    });

    it("Should have case id", () => {
        const caseId = "12345";
        const apiResponse = fixture(
            "ICreditAssessmentRefreshQrCodeApiResponse"
        );

        const response = new CreditAssessmentRefreshQrCodeResponse(
            apiResponse,
            caseId
        );

        expect(response.getCaseId()).toBe(caseId);
    });
});
