import * as api from "../http/apis/bankid";

import { BankIdAuthRequestBuilder } from "./bankid-auth-request-builder";
import {
    IBankIdAuthRequest,
    IBankIdCollectRequest,
    IBankIdCancelRequest,
} from "./types";
import { BankIdAuthResponse } from "./bankid-auth-response";
import { BankIdCollectRequestBuilder } from "./bankid-collect-request-builder";
import { BankIdCollectResponse } from "./bankid-collect-response";
import { BankIdCancelRequestBuilder } from "./bankid-cancel-request-builder";

export const newAuthRequest = () => new BankIdAuthRequestBuilder();

export const newCollectRequest = () => new BankIdCollectRequestBuilder();

export const newCancelRequest = () => new BankIdCancelRequestBuilder();

export const auth = (request: IBankIdAuthRequest) => {
    BankIdAuthRequestBuilder.validate(request);

    return api
        .auth(request)
        .then((response) => new BankIdAuthResponse(response, request.method));
};

export const collect = (request: IBankIdCollectRequest) => {
    BankIdCollectRequestBuilder.validate(request);

    return api
        .collect(request)
        .then((response) => new BankIdCollectResponse(response));
};

export const cancel = (request: IBankIdCancelRequest) => {
    BankIdCancelRequestBuilder.validate(request);

    return api.cancel(request);
};
