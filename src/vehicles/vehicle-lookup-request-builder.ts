import { IVehicleLookupRequest } from "./types";

export class VehicleLookupRequestBuilder {
    public static validateRequest(request: IVehicleLookupRequest) {
        if (!request) {
            throw new Error("Missing vehicle lookup request");
        }

        if (!request.registrationNumber) {
            throw new Error(
                "Missing registration number in vehicle lookup request"
            );
        }
    }

    private properties: { [key: string]: any } = {};
    public withRegistrationNumber(
        registrationNumber: string
    ): VehicleLookupRequestBuilder {
        this.properties.registrationNumber = registrationNumber;

        return this;
    }

    public build(): IVehicleLookupRequest {
        return this.properties as IVehicleLookupRequest;
    }
}
