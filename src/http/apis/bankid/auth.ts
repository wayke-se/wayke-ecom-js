import { IBankIdAuthRequest, AuthMethod, IBankIdAuthApiResponse } from "../../../bankid/types";
import * as http from "../../index";
import Configuration from "../../../config/index";
import { IApiResponse } from "../../index";

export const buildRequest = (
    requestOptions: IBankIdAuthRequest
): RequestInit => {
    const requestForgeryToken = http.context().requestForgeryToken;
    const content = {
        ipAddress: requestOptions.ipAddress,
    };

    const request = http
        .builder()
        .method("post")
        .accept("application/json")
        .requestForgeryToken(requestForgeryToken)
        .content(content)
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

export const getUrl = (requestOptions: IBankIdAuthRequest) => {
    const route = getRoute(requestOptions.method);
    const host = Configuration.current().getApiAddress();
    const url = `${host}/bankid/auth${route}`;
    return url;
};

export const auth = (
    requestOptions: IBankIdAuthRequest
): Promise<IApiResponse<IBankIdAuthApiResponse>> => {
    const url = getUrl(requestOptions);
    const request = buildRequest(requestOptions);

    return http.captureStateContext(
        http.json<IBankIdAuthApiResponse>(url, request)
    );
};
