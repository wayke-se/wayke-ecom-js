import * as api from "../http/apis/credit-assessment";
import { CreditAssessmentSignResponse } from "./sign-response";

import {
    ICreditAssessmentInquiry,
    ICreditAssessmentSignRequest,
} from "./types";
import { validateInquiry } from "./validator";

export const newCase = (request: ICreditAssessmentInquiry) => {
    validateInquiry(request);

    return api.newCase(request);
};

export const getStatus = (caseId: string) => api.getStatus(caseId);

export const signCase = (request: ICreditAssessmentSignRequest) =>
    api
        .signCase(request)
        .then(
            (response) =>
                new CreditAssessmentSignResponse(response, request.method)
        );

export const cancelSigning = (caseId: string) => api.cancelSigning(caseId);

export const accept = (caseId: string) => api.accept(caseId);

export const decline = (caseId: string) => api.decline(caseId);
