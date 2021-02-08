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
        let response: ICreditAssessmentStatusResponse;
        
        beforeAll(() => {
            asStatusMock = jest.spyOn(convertStatusMock, "default");
            asStatusMock.mockReturnValue(CreditAssessmentStatus.Received);

            const apiResponse = fixture("ICreditAssessmentStatusApiResponse");
            response = new CreditAssessmentStatusResponse(apiResponse);
        });

        it("Should have matching status", () => {
            expect(response.getStatus()).toBe(CreditAssessmentStatus.Received);
        });

        it("Should not renew signing", () => {
            expect(response.shouldRenewSigning()).toBe(false);
        });

        it("Is not signed", () => {
            expect(response.isSigned()).toBe(false);
        });

        it("Should not have pending signing", () => {
            expect(response.hasPendingSigning()).toBe(false);
        });

        it("Should not have pending scoring", () => {
            expect(response.hasPendingScoring()).toBe(false);
        });

        it("Should not be scored", () => {
            expect(response.isScored()).toBe(false);
        });

        it("Should not have scoring error", () => {
            expect(response.hasScoringError()).toBe(false);
        });

        afterAll(() => {
            asStatusMock.mockClear();
        });
    });

    describe("Given signing initiated", () => {
        let asStatusMock: any;
        let response: ICreditAssessmentStatusResponse;
        
        beforeAll(() => {
            asStatusMock = jest.spyOn(convertStatusMock, "default");
            asStatusMock.mockReturnValue(CreditAssessmentStatus.SigningInitiated);

            const apiResponse = fixture("ICreditAssessmentStatusApiResponse");
            response = new CreditAssessmentStatusResponse(apiResponse);
        });

        it("Should have matching status", () => {
            expect(response.getStatus()).toBe(CreditAssessmentStatus.SigningInitiated);
        });
        it("Should not pending signing", () => {
            expect(response.hasPendingSigning()).toBe(true);
        });

        afterAll(() => {
            asStatusMock.mockClear();
        });
    });

    // Given signing failed, should renew signing
    // Given status signed, scoringInitiated, scored, notScored, accepted, is signed
    // Given status signingInitiated, has pending signing
    // Given status scoringInitiated, has pending scoring
    // Given status scored, accepted, is scored
    // Given status scored, is scored = true
    // Given status notScored, has scoring error
});
