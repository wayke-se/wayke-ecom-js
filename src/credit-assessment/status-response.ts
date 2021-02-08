import { IAddress } from "..";
import {
    CreditAssessmentStatus,
    ICreditAssessmentStatusApiResponse,
    ICreditAssessmentStatusResponse,
} from "./types";

export class CreditAssessmentStatusResponse
    implements ICreditAssessmentStatusResponse {
    private vfsScoreCaseId: string | undefined;
    private recommendation: string | undefined;
    private decision: string | undefined;

    constructor(response: ICreditAssessmentStatusApiResponse) {
        this.vfsScoreCaseId = response.vfsScoreCaseId;
        this.recommendation = response.recommendation;
        this.decision = response.decision;
    }

    getSigningMessage(): string {
        throw new Error("Method not implemented.");
    }

    shouldRenewSigning(): boolean {
        throw new Error("Method not implemented.");
    }

    isSigned(): boolean {
        throw new Error("Method not implemented.");
    }

    getAddress(): IAddress | undefined {
        throw new Error("Method not implemented.");
    }

    getStatus(): CreditAssessmentStatus {
        throw new Error("Method not implemented.");
    }

    hasPendingSigning(): boolean {
        throw new Error("Method not implemented.");
    }

    getHintCode(): string {
        throw new Error("Method not implemented.");
    }

    hasPendingScoring(): boolean {
        throw new Error("Method not implemented.");
    }

    isScored(): boolean {
        throw new Error("Method not implemented.");
    }

    isNotScored(): boolean {
        throw new Error("Method not implemented.");
    }

    getScoringId(): string | undefined {
        return this.vfsScoreCaseId;
    }

    getRecommendation(): string | undefined {
        return this.recommendation;
    }

    getDecision() {
        return this.decision;
    }
}
