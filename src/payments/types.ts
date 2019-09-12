export interface IPaymentLookupRequest {
    downPayment: number;
    duration: number;
    residual: number;
    id: string;
}

export interface IPaymentCosts {
    monthlyCost: number;
    totalCreditCost: number;
}

export interface IPaymentFees {
    setupFee: number | undefined;
    administrationFee: number | undefined;
}

export interface IPaymentInterests {
    interest: number;
    effectiveInterest: number;
}

export interface IPaymentRangeSpec {
    min: number;
    max: number;
    step: number;
    default: number;
    current: number;
}

export interface IPaymentLookupResponse {
    getCosts(): IPaymentCosts;
    getFees(): IPaymentFees;
    getInterests(): IPaymentInterests;
    getDurationSpec(): IPaymentRangeSpec;
    getDownPaymentSpec(): IPaymentRangeSpec;
    getResidualValueSpec(): IPaymentRangeSpec;
}

export interface IPaymentLookupResponseData {
    monthlyCost: number;
    interest: number;
    effectiveInterest: number;
    setupFee?: number;
    administrationFee?: number;
    totalCreditCost: number;
    residual: IPaymentRangeSpec;
    duration: IPaymentRangeSpec;
    downPayment: IPaymentRangeSpec;
    link?: string;
    totalResidualValue: number;
}
