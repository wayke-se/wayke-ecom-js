import * as http from "../../index";
import {
    IBankIdCollectRequest,
    IBankIdCollectApiResponse,
} from "../../../bankid/types";
import Configuration from "../../../config/index";

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
    const url = `${host}/bankid/collect/${orderRef}`;
    return url;
};

export const collect = (
    requestOptions: IBankIdCollectRequest
): Promise<http.IApiResponse<IBankIdCollectApiResponse>> => {
    const url = getUrl(requestOptions.orderRef);
    const request = buildRequest();

    return http.captureStateContext(
        http.json<IBankIdCollectApiResponse>(url, request)
    );
};
