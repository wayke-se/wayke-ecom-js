import {
    IBankIdAuthRequest,
    IBankIdAuthApiResponse,
} from "../../../bankid/types";
import * as http from "../../index";

import { getUrl } from "./utils";
import { buildRequest } from "./request-builder";

const validate = (
    response: http.IApiResponse<IBankIdAuthApiResponse>
): IBankIdAuthApiResponse => {
    if (!response || !response.successful || !response.response) {
        throw new Error("The request did not succeed");
    }

    return response.response;
};

export const auth = (
    requestOptions: IBankIdAuthRequest,
): Promise<IBankIdAuthApiResponse> => {
    const url = getUrl(requestOptions);
    const request = buildRequest(requestOptions);

    return http
        .captureStateContext(http.json<IBankIdAuthApiResponse>(url, request))
        .then(validate);
};
