import {
    ICreditAssessmentCase,
    ICreditAssessmentInquiry,
    ICreditAssessmentStatus,
} from "../../credit-assessment/types";
import * as http from "../index";
import { requestCaseStatus } from "./credit-assessment/get-status";
import { requestNewCase } from "./credit-assessment/new-case";

const validate = <T>(response: http.IApiResponse<T>): T => {
    if (!response || !response.successful || !response.response) {
        throw new Error("The request did not succeed");
    }

    return response.response;
};

export const newCase = (
    inquiry: ICreditAssessmentInquiry
): Promise<ICreditAssessmentCase> => requestNewCase(inquiry).then(validate);

export const getStatus = (caseId: string): Promise<ICreditAssessmentStatus> =>
    requestCaseStatus(caseId).then(validate);
