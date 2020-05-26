import * as http from "../../index";
import Configuration from "../../../config/index";
import { IBankIdCancelRequest } from "../../../bankid/types";

export const buildRequest = (): RequestInit => {
    const requestForgeryToken = http.context().requestForgeryToken;
    const request = http
        .builder()
        .method("post")
        .accept("application/json")
        .requestForgeryToken(requestForgeryToken)
        .build();
    return request;
};

export const getUrl = (orderRef: string) => {
    const host = Configuration.current().getApiAddress();
    const url = `${host}/bankid/cancel/${orderRef}`;
    return url;
};

export const cancel = (
    requestOptions: IBankIdCancelRequest
): Promise<Response> => {
    const url = getUrl(requestOptions.orderRef);
    const request = buildRequest();

    return http.raw(url, request);
};
