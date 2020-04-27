import { IBankIdAuthRequest } from "../../../bankid/types";
import * as http from "../../index";

export const buildAuthRequest = (
    requestOptions: IBankIdAuthRequest
): RequestInit => {
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

export const buildCollectRequest = (): RequestInit => {
    const requestForgeryToken = http.context().requestForgeryToken;

    const request = http
        .builder()
        .method("post")
        .accept("application/json")
        .requestForgeryToken(requestForgeryToken)
        .build();
    return request;
};
