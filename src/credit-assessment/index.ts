import * as api from "../http/apis/credit-assessment";
import { CreditAssessmentSignResponse } from "./sign-response";

import {
    ICreditAssessmentInquiry,
    ICreditAssessmentSignRequest,
} from "./types";
import { validateInquiry } from "./validator";

export const newCase = (request: ICreditAssessmentInquiry) => {
    validateInquiry(request);

    return api.newCase(request).then((response) => response);
};

export const getStatus = (caseId: string) => {
    return api.getStatus(caseId).then((response) => response);
};

export const signCase = (request: ICreditAssessmentSignRequest) => {
    return api
        .signCase(request)
        .then(
            (response) =>
                new CreditAssessmentSignResponse(response, request.method)
        );
};
