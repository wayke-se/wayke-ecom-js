import {
    IBankIdAuthRequest,
    IBankIdAuthApiResponse,
    IBankIdCollectRequest,
    IBankIdCollectApiResponse,
} from "../../bankid/types";
import * as http from "../index";

import { getAuthUrl, getCollectUrl } from "./bankid/utils";
import {
    buildAuthRequest,
    buildCollectRequest,
} from "./bankid/request-builder";

const validate = <T>(response: http.IApiResponse<T>): T => {
    if (!response || !response.successful || !response.response) {
        throw new Error("The request did not succeed");
    }

    return response.response;
};

export const auth = (
    requestOptions: IBankIdAuthRequest
): Promise<IBankIdAuthApiResponse> => {
    const url = getAuthUrl(requestOptions);
    const request = buildAuthRequest(requestOptions);

    return http
        .captureStateContext(http.json<IBankIdAuthApiResponse>(url, request))
        .then(validate);
};

export const collect = (
    requestOptions: IBankIdCollectRequest
): Promise<IBankIdCollectApiResponse> => {
    const url = getCollectUrl();
    const request = buildCollectRequest(requestOptions);

    return http
        .captureStateContext(http.json<IBankIdCollectApiResponse>(url, request))
        .then(validate);
};
