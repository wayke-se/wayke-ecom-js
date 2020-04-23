import {
    IBankIdAuthRequest,
    IBankIdAuthApiResponse,
} from "../../../bankid/types";
import * as http from "../../index";
import { getUrl } from "./utils";

const validate = (
    response: http.IApiResponse<IBankIdAuthApiResponse>
): IBankIdAuthApiResponse => {
    if (!response || !response.successful || !response.response) {
        throw new Error("The request did not succeed");
    }

    return response.response;
};

const buildRequest = (requestOptions: IBankIdAuthRequest): RequestInit => {
    const requestForgeryToken = http.context().requestForgeryToken;
    const content = {
        ipAddress: requestOptions.ipAddress,
    };

    const request = http
        .builder()
        .method("post")
        .content(content)
        .accept("application/json")
        .requestForgeryToken(requestForgeryToken)
        .build();
    return request;
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
