import { ResponseError } from "../../errors/request-error";
import { VehicleUnavailableError } from "../../errors/vehicle-unavailable-error";

const throwErrorByType = (content: any) => {
    switch (content.type) {
        case "VehicleUnavailableException":
            throw new VehicleUnavailableError();
        default:
            throw new Error("Unhandled response error");
    }
};

const handleResponseError = (error: ResponseError): Promise<void> => {
    const response = error.getResponse();
    return response.json().then(throwErrorByType);
};

export default handleResponseError;
