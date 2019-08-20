import {
    IPaymentCosts,
    IPaymentFees,
    IPaymentInterests,
    IPaymentLookupResponse,
    IPaymentLookupResponseData,
    IPaymentRangeSpec,
} from "./types";

export class PaymentLookupResponse implements IPaymentLookupResponse {
    private response: IPaymentLookupResponseData;

    public constructor(response: IPaymentLookupResponseData) {
        if (!response) {
            throw new Error("Missing payment lookup response data");
        }

        this.response = response;
    }

    public getCosts(): IPaymentCosts {
        return {
            monthlyCost: this.response.monthlyCost,
            totalCreditCost: this.response.totalCreditCost,
        };
    }

    public getFees(): IPaymentFees {
        return {
            setupFee: this.response.setupFee,
            administrationFee: this.response.administrationFee,
        };
    }

    public getInterests(): IPaymentInterests {
        return {
            interest: this.response.interest,
            effectiveInterest: this.response.effectiveInterest,
        };
    }

    public getDurationSpec(): IPaymentRangeSpec {
        return this.response.duration;
    }

    public getDownPaymentSpec(): IPaymentRangeSpec {
        return this.response.downPayment;
    }

    public getResidualValueSpec(): IPaymentRangeSpec {
        return this.response.residual;
    }
}
