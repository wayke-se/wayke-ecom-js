import {
    IBankIdAuthRequest,
    AuthMethod,
    IBankIdAuthApiResponse,
} from "../../../bankid/types";
import * as http from "../../index";
import Configuration from "../../../config/index";

export const buildRequest = (): RequestInit => {
    const requestForgeryToken = http.context().requestForgeryToken;
    const builder = http
        .builder()
        .method("post")
        .accept("application/json")
        .requestForgeryToken(requestForgeryToken);

    if (Configuration.current().useBankIdThumbprint()) {
        const thumbprint = Configuration.current().getBankIdThumbprint();
        builder.bankIdThumbprint(thumbprint);
    }

    const request = builder.build();
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
): Promise<http.IApiResponse<IBankIdAuthApiResponse>> => {
    const url = getUrl(requestOptions);
    const request = buildRequest();

    return http.captureStateContext(
        http.json<IBankIdAuthApiResponse>(url, request)
    );
};
