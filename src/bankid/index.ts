import * as api from "../http/apis/bankid";

import { BankIdAuthRequestBuilder } from "./bankid-auth-request-builder";
import { IBankIdAuthRequest } from "./types";
import { BankIdAuthResponse } from "./bankid-auth-response";

export const newAuthRequest = () => new BankIdAuthRequestBuilder();

export const auth = (request: IBankIdAuthRequest) => {
    BankIdAuthRequestBuilder.validate(request);

    return api
        .auth(request)
        .then(response => new BankIdAuthResponse(response, request.method));
};
