import * as http from "../../index";
import { ICreditAssessmentStatus } from "../../../credit-assessment/types";
import Configuration from "../../../config/index";

export const requestCaseStatus = (
    caseId: string
): Promise<http.IApiResponse<ICreditAssessmentStatus>> => {
    const host = Configuration.current().getApiAddress();
    const url = `${host}/credit-assessment/${caseId}`;

    const forgeryToken = http.context().requestForgeryToken;

    const request = http
        .builder()
        .method("get")
        .accept("application/json")
        .requestForgeryToken(forgeryToken)
        .build();

    return http.captureStateContext(
        http.json<ICreditAssessmentStatus>(url, request)
    );
};
