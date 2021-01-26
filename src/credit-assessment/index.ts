import * as api from "../http/apis/credit-assessment";

import { ICreditAssessmentInquiry } from "./types";
import { validateInquiry } from "./validator";

export const newCase = (request: ICreditAssessmentInquiry) => {
    validateInquiry(request);

    return api.newCase(request).then((response) => response);
};
