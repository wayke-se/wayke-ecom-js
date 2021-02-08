import theoretically from "jest-theories";

import asStatus from "./convert-status";
import { CreditAssessmentStatus } from "./types";

describe("Convert status text to status", () => {
    const theories = [
        { text: "received", ecpectedStatus: CreditAssessmentStatus.Received },
        { text: "signingInitiated", ecpectedStatus: CreditAssessmentStatus.SigningInitiated },
        { text: "signingFailed", ecpectedStatus: CreditAssessmentStatus.SigningFailed },
        { text: "signed", ecpectedStatus: CreditAssessmentStatus.Signed },
        { text: "scoringInitiated", ecpectedStatus: CreditAssessmentStatus.ScoringInitiated },
        { text: "scored", ecpectedStatus: CreditAssessmentStatus.Scored },
        { text: "notScored", ecpectedStatus: CreditAssessmentStatus.NotScored },
        { text: "accepted", ecpectedStatus: CreditAssessmentStatus.Accepted },
        { text: "declined", ecpectedStatus: CreditAssessmentStatus.Declined },
        { text: "unknown", ecpectedStatus: CreditAssessmentStatus.Unknown },
        { text: "asdf", ecpectedStatus: CreditAssessmentStatus.Unknown },
    ];

    theoretically("Given {text}, should be {expectedStatus}", theories, (theory) => {
        const status = asStatus(theory.text);
        expect(status).toBe(theory.ecpectedStatus);
    });
});
