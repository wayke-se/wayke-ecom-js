import Configuration from "../../config/index";
import {
    IBankIdAuthRequest,
    IBankIdAuthApiResponse,
    AuthMethod,
} from "../../bankid/types";
import * as http from "../index";

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

const getRoute = (method: AuthMethod) => {
    switch (method) {
        case AuthMethod.QrCode:
            return "/qr-code";
        case AuthMethod.SameDevice:
            return "/same-device";
        default:
            throw new Error("BankId auth method not supported");
    }
};

const getUrl = (requestOptions: IBankIdAuthRequest) => {
    const route = getRoute(requestOptions.method);
    const config = Configuration.current();
    const url = `${config.getApiAddress}/bankid/auth${route}`;
    return url;
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
