import { IBankIdAuthRequest } from "../../../bankid/types";
import * as http from "../../index";

const buildRequest = (content: any = null) => {
    const requestForgeryToken = http.context().requestForgeryToken;
    let request = http
        .builder()
        .method("post")
        .accept("application/json")
        .requestForgeryToken(requestForgeryToken);

    if (!!content) {
        request = request.content(content);
    }

    return request.build();
};

export const buildAuthRequest = (
    requestOptions: IBankIdAuthRequest
): RequestInit => {
    const content = {
        ipAddress: requestOptions.ipAddress,
    };
    return buildRequest(content);
};

export const buildCollectRequest = (): RequestInit => {
    return buildRequest();
};

export const buildCancelRequest = (): RequestInit => {
    return buildRequest();
};
