import {
    IBankIdAuthRequest,
    IBankIdAuthApiResponse,
    IBankIdCollectRequest,
    IBankIdCollectApiResponse,
    IBankIdCancelRequest,
} from "../../bankid/types";
import * as http from "../index";

import { getCollectUrl } from "./bankid/utils";
import { cancel as doCancelRequest } from "./bankid/cancel";
import { auth as doAuthRequest } from "./bankid/auth";
import { buildCollectRequest } from "./bankid/request-builder";

const validate = <T>(response: http.IApiResponse<T>): T => {
    if (!response || !response.successful || !response.response) {
        throw new Error("The request did not succeed");
    }

    return response.response;
};

export const auth = (
    requestOptions: IBankIdAuthRequest
): Promise<IBankIdAuthApiResponse> =>
    doAuthRequest(requestOptions).then(validate);

export const collect = (
    requestOptions: IBankIdCollectRequest
): Promise<IBankIdCollectApiResponse> => {
    const url = getCollectUrl(requestOptions.orderRef);
    const request = buildCollectRequest();

    return http
        .captureStateContext(http.json<IBankIdCollectApiResponse>(url, request))
        .then(validate);
};

export const cancel = (
    requestOptions: IBankIdCancelRequest
): Promise<boolean> => doCancelRequest(requestOptions).then(() => true);
