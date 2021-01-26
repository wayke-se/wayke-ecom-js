import { ICreditAssessmentInquiry } from "./types";

export const validateInquiry = (inquiry: ICreditAssessmentInquiry) => {
    if (!inquiry) {
        throw new TypeError("Inquiry can not be falsy");
    }
};
