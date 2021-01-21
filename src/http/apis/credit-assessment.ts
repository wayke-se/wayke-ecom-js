import {
    ICreditAssessmentCase,
    ICreditAssessmentInquiry,
} from "../../credit-assessment/types";
import * as http from "../index";
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
