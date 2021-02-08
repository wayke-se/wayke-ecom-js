const fixtures = require("../../test/fixtures");
const fixture = (name: string, withValues: any = undefined): any =>
    fixtures.create(name, withValues);

import { CreditAssessmentStatusResponse } from "./status-response";
import { CreditAssessmentStatus, ICreditAssessmentStatusApiResponse, ICreditAssessmentStatusResponse } from "./types";
import * as convertStatusMock from "./convert-status";

describe("Create credit assessment status response", () => {
    describe("Given any statys", () => {
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

    describe("Given received status", () => {
        let asStatusMock: any;
        
        beforeAll(() => {
            asStatusMock = jest.spyOn(convertStatusMock, "default");
            asStatusMock.mockReturnValue(CreditAssessmentStatus.Received);
        });

        it("Should have status received", () => {
            const apiResponse = fixture("ICreditAssessmentStatusApiResponse");
            
            const response = new CreditAssessmentStatusResponse(apiResponse);

            expect(response.getStatus()).toBe(CreditAssessmentStatus.Received);
        });

        afterAll(() => {
            asStatusMock.mockClear();
        });
    });
});

// Add status converter in separate files.
