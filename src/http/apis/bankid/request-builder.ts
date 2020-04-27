import {
    IBankIdAuthRequest,
    IBankIdCollectRequest,
} from "../../../bankid/types";
import * as http from "../../index";

export const auth = (requestOptions: IBankIdAuthRequest): RequestInit => {
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

export const collect = (requestOptions: IBankIdCollectRequest): RequestInit => {
    const requestForgeryToken = http.context().requestForgeryToken;
    const content = {
        orderRef: requestOptions.orderRef,
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
