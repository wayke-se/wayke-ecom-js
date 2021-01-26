import { ICreditAssessmentInquiry } from "./types";
import { validateInquiry } from "./validator";

describe("Validate credit assessment inquiry", () => {
    describe("Given null inquiry", () => {
        it("Should throw", () => {
            expect(() => validateInquiry(null as any)).toThrowError();
        });
    })
});
