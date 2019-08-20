import { IConfiguration } from "../../config";
import {
    IInsuranceOptionsRequest,
    IInsuranceOptionsResponseData,
} from "../../insurances/types";
import * as http from "../index";

const buildInsuranceRequest = (
    request: IInsuranceOptionsRequest
): RequestInit => {
    const content = {
        drivingDistance: request.drivingDistance,
        includeFinance: request.includeFinance,
        socialId: request.personalNumber,
        vehicleId: request.id,
    };

    return http
        .builder()
        .method("post")
        .accept("application/json")
        .content(content)
        .build();
};

const validateResponse = (
    response: http.IApiResponse<IInsuranceOptionsResponseData>
): IInsuranceOptionsResponseData => {
    if (!response || !response.successful || !response.response) {
        throw new Error("The request did not succeed");
    }

    return response.response;
};

export const find = (
    request: IInsuranceOptionsRequest,
    config: IConfiguration
): Promise<IInsuranceOptionsResponseData> =>
    http
        .json<IInsuranceOptionsResponseData>(
            `${config.getApiAddress()}/insurance`,
            buildInsuranceRequest(request)
        )
        .then(validateResponse);
