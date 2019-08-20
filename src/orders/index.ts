import Configuration from "../config/index";
import * as api from "../http/apis/orders";

import { InsuranceBuilder } from "./insurance-builder";
import { OrderCreateRequestBuilder } from "./order-create-request-builder";
import { OrderCreateResponse } from "./order-create-response";
import { OrderOptionsRequestBuilder } from "./order-options-request-builder";
import { OrderOptionsResponse } from "./order-options-response";
import { PaymentBuilder } from "./payment-builder";
import { IOrderCreateRequest, IOrderOptionsRequest } from "./types";

export const newOptionsRequest = () => new OrderOptionsRequestBuilder();

export const newCreateRequest = () => new OrderCreateRequestBuilder();

export const newInsurance = () => new InsuranceBuilder();
export const newPayment = () => new PaymentBuilder();

export const getOptions = (
    request: IOrderOptionsRequest
): Promise<OrderOptionsResponse> => {
    OrderOptionsRequestBuilder.validateRequest(request);

    return api
        .init(request, Configuration.current())
        .then(response => new OrderOptionsResponse(response));
};

export const create = (
    request: IOrderCreateRequest
): Promise<OrderCreateResponse> => {
    OrderCreateRequestBuilder.validateRequest(request);

    return api
        .create(request, Configuration.current())
        .then(response => new OrderCreateResponse(response));
};
