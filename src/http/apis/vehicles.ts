import { IConfiguration } from "../../config";
import {
    IVehicleLookupRequest,
    IVehicleLookupResponseData,
} from "../../vehicles/types";
import * as http from "../index";

const buildLookupRequest = (): RequestInit =>
    http
        .builder()
        .method("get")
        .accept("application/json")
        .build();

const validateResponse = (
    response: http.IApiResponse<IVehicleLookupResponseData>
): IVehicleLookupResponseData => {
    if (!response || !response.successful || !response.response) {
        throw new Error("The request did not succeed");
    }

    return response.response;
};

export const lookup = (
    request: IVehicleLookupRequest,
    config: IConfiguration
): Promise<IVehicleLookupResponseData> =>
    http
        .json<IVehicleLookupResponseData>(
            `${config.getApiAddress()}/tradein/${request.registrationNumber}`,
            buildLookupRequest()
        )
        .then(validateResponse);
