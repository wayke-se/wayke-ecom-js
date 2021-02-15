import { CreditAssessmentDecision } from "./types";

const asDecision = (statusString?: string) => {
    switch (statusString) {
        case "approved":
            return CreditAssessmentDecision.Approved;
        case "rejected":
            return CreditAssessmentDecision.Rejected;
        default:
            return CreditAssessmentDecision.Unknown;
    }
};

export default asDecision;
