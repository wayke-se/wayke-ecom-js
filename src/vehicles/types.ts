export interface IVehicleLookupRequest {
    registrationNumber: string;
}

export interface IVehicleLookupResponse {
    getVehicle(): IVehicle;
}

export interface IVehicleLookupResponseData {
    manufacturer: string;
    modelName: string;
    modelSeries: string;
    modelYear: number;
}

export interface IVehicle {
    manufacturer: string;
    modelName: string;
    modelSeries: string;
    modelYear: number;
}

export interface IVehicleTrade {
    registrationNumber: string;
    mileage: number;
    condition: VehicleCondition;
    comments: string;
}

export enum VehicleCondition {
    VeryGood = "VeryGood",
    Good = "Good",
    Ok = "Ok",
}
