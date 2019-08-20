import { IConfiguration } from "../../config";
import {
    IOrderCreateRequest,
    IOrderCreateResponseData,
    IOrderOptionsRequest,
    IOrderOptionsResponseData,
} from "../../orders/types";
import * as http from "../index";

const buildOptionsRequest = (): RequestInit =>
    http
        .builder()
        .method("get")
        .accept("application/json")
        .build();

const buildCreateRequest = (request: IOrderCreateRequest): RequestInit => {
    const content = {
        vehicleId: request.id,
        tradeIn: request.tradein,
        insurance: request.insurance
            ? {
                  ...request.insurance,
                  socialId: request.insurance.personalNumber
                      ? request.insurance.personalNumber
                      : request.customer.personalNumber,
              }
            : undefined,
        payment: request.payment,
        delivery: request.deliveryType,
        customer: {
            socialId: request.customer.personalNumber,
            email: request.customer.email,
            phone: request.customer.phoneNumber,
            name: request.customer.name,
            address: request.customer.address,
        },
    };

    return http
        .builder()
        .method("post")
        .accept("application/json")
        .content(content)
        .build();
};

const validateOptionsResponse = (
    response: http.IApiResponse<IOrderOptionsResponseData>
): IOrderOptionsResponseData => {
    if (!response || !response.successful || !response.response) {
        throw new Error("The request did not succeed");
    }

    return response.response;
};

const validateCreateResponse = (
    response: http.IApiResponse<IOrderCreateResponseData>
): IOrderCreateResponseData => {
    if (!response || !response.successful || !response.response) {
        throw new Error("The request did not succeed");
    }

    return response.response;
};

export const init = (
    request: IOrderOptionsRequest,
    config: IConfiguration
): Promise<IOrderOptionsResponseData> =>
    http
        .json<IOrderOptionsResponseData>(
            `${config.getApiAddress()}/orders/new?vehicleId=${request.id}`,
            buildOptionsRequest()
        )
        .then(validateOptionsResponse);

export const create = (
    request: IOrderCreateRequest,
    config: IConfiguration
): Promise<IOrderCreateResponseData> =>
    http
        .json<IOrderCreateResponseData>(
            `${config.getApiAddress()}/orders`,
            buildCreateRequest(request)
        )
        .then(validateCreateResponse);
