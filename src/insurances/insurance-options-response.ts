import {
    IInsuranceOption,
    IInsuranceOptionsResponse,
    IInsuranceOptionsResponseData,
} from "./types";

export class InsuranceOptionsResponse implements IInsuranceOptionsResponse {
    private response: IInsuranceOptionsResponseData;

    public constructor(response: IInsuranceOptionsResponseData) {
        if (!response) {
            throw new Error("Missing insurance options response data");
        }

        this.response = response;
    }

    public getInsuranceOption(): IInsuranceOption[] {
        return this.response.insurances;
    }
}
