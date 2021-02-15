import theoretically from "jest-theories";

import asDecision from "./convert-decision";
import { CreditAssessmentDecision } from "./types";

describe("Convert status text to status", () => {
    const theories = [
        {
            text: "approved",
            expectedDecision: CreditAssessmentDecision.Approved,
        },
        {
            text: "rejected",
            expectedDecision: CreditAssessmentDecision.Rejected,
        },
        { text: "asdf", expectedDecision: CreditAssessmentDecision.Unknown },
        { text: undefined, expectedDecision: CreditAssessmentDecision.Unknown },
    ];

    theoretically(
        "Given '{text}', should be '{expectedDecision}'",
        theories,
        (theory) => {
            const status = asDecision(theory.text);
            expect(status).toBe(theory.expectedDecision);
        }
    );
});
