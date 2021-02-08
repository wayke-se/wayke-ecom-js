const fixtures = require("../../test/fixtures");
const fixture = (name: string, withValues: any = undefined): any =>
    fixtures.create(name, withValues);

import { CreditAssessmentStatusResponse } from "./status-response";
import { ICreditAssessmentStatusApiResponse, ICreditAssessmentStatusResponse } from "./types";

describe("Create credit assessment status response", () => {
    let apiResponse: ICreditAssessmentStatusApiResponse;
    let response: ICreditAssessmentStatusResponse;

    beforeAll(() => {
        apiResponse = fixture("ICreditAssessmentStatusApiResponse");
        response = new CreditAssessmentStatusResponse(apiResponse);
    });

    it("Should have provided scoring id", () => {
        expect(response.getScoringId()).toBe(apiResponse.vfsScoreCaseId);
    });

    it("Should have provided recommendation", () => {
        expect(response.getRecommendation()).toBe(apiResponse.recommendation);
    });

    it("Should have provided decision", () => {
        expect(response.getDecision()).toBe(apiResponse.decision);
    });
});

// Add status converter in separate files.
