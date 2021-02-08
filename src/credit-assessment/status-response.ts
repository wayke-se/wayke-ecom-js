import { IAddress } from "..";
import {
    CreditAssessmentStatus,
    ICreditAssessmentStatusApiResponse,
    ICreditAssessmentStatusResponse,
} from "./types";
import asStatus from "./convert-status";

export class CreditAssessmentStatusResponse
    implements ICreditAssessmentStatusResponse {
    private status: CreditAssessmentStatus;
    private vfsScoreCaseId: string | undefined;
    private recommendation: string | undefined;
    private decision: string | undefined;

    constructor(response: ICreditAssessmentStatusApiResponse) {
        this.vfsScoreCaseId = response.vfsScoreCaseId;
        this.recommendation = response.recommendation;
        this.decision = response.decision;

        this.status = asStatus(response.status);
    }

    getSigningMessage(): string {
        throw new Error("Method not implemented.");
    }

    shouldRenewSigning(): boolean {
        return false;
    }

    isSigned(): boolean {
        return false;
    }

    getAddress(): IAddress | undefined {
        throw new Error("Method not implemented.");
    }

    getStatus(): CreditAssessmentStatus {
        return this.status;
    }

    hasPendingSigning(): boolean {
        return false;
    }

    getHintCode(): string {
        throw new Error("Method not implemented.");
    }

    hasPendingScoring(): boolean {
        return false;
    }

    isScored(): boolean {
        return false;
    }

    hasScoringError(): boolean {
        return false;
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
