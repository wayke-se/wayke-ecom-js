import { IAddress } from "..";
import {
    CreditAssessmentStatus,
    ICreditAssessmentStatusApiResponse,
    ICreditAssessmentStatusResponse,
} from "./types";
import asStatus from "./convert-status";

export class CreditAssessmentStatusResponse
    implements ICreditAssessmentStatusResponse {
    static START_FAILED_CODE = "startFailed";
    static USER_CANCEL_CODE = "userCancel";

    private status: CreditAssessmentStatus;
    private hintCode: string | undefined;
    private vfsScoreCaseId: string | undefined;
    private recommendation: string | undefined;
    private decision: string | undefined;

    constructor(response: ICreditAssessmentStatusApiResponse) {
        this.hintCode = response.bankIdHintCode;
        this.vfsScoreCaseId = response.vfsScoreCaseId;
        this.recommendation = response.recommendation;
        this.decision = response.decision;

        this.status = asStatus(response.status);
    }

    getSigningMessage(): string {
        throw new Error("Method not implemented.");
    }

    shouldRenewSigning(): boolean {
        const hasFailedSigning =
            this.status === CreditAssessmentStatus.SigningFailed;
        const isRenewHintCode =
            this.hintCode ===
                CreditAssessmentStatusResponse.START_FAILED_CODE ||
            this.hintCode === CreditAssessmentStatusResponse.USER_CANCEL_CODE;
        return hasFailedSigning && isRenewHintCode;
    }

    isSigned(): boolean {
        return (
            this.status === CreditAssessmentStatus.Signed ||
            this.status === CreditAssessmentStatus.ScoringInitiated ||
            this.status === CreditAssessmentStatus.Scored ||
            this.status === CreditAssessmentStatus.NotScored ||
            this.status === CreditAssessmentStatus.Accepted
        );
    }

    getAddress(): IAddress | undefined {
        throw new Error("Method not implemented.");
    }

    getStatus(): CreditAssessmentStatus {
        return this.status;
    }

    hasPendingSigning(): boolean {
        return this.status === CreditAssessmentStatus.SigningInitiated;
    }

    getHintCode(): string | undefined {
        return this.hintCode;
    }

    hasPendingScoring(): boolean {
        return this.status === CreditAssessmentStatus.ScoringInitiated;
    }

    isScored(): boolean {
        return (
            this.status === CreditAssessmentStatus.Scored ||
            this.status === CreditAssessmentStatus.Accepted
        );
    }

    hasScoringError(): boolean {
        return this.status === CreditAssessmentStatus.NotScored;
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
