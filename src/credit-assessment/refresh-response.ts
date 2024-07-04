import {
    ICreditAssessmentRefreshQrCodeApiResponse,
    ICreditAssessmentQrCodeResponse,
} from "./types";

export class CreditAssessmentRefreshQrCodeResponse
    implements ICreditAssessmentQrCodeResponse {
    private qrCodeAsBase64: string;
    private caseId: string;

    public constructor(
        response: ICreditAssessmentRefreshQrCodeApiResponse,
        caseId: string
    ) {
        if (!response) {
            throw new Error("Response can not be falsy");
        }

        this.qrCodeAsBase64 = response.qrCodeAsBase64;
        this.caseId = caseId;
    }

    public getQrCode() {
        return this.qrCodeAsBase64;
    }

    public getCaseId() {
        return this.caseId;
    }
}
