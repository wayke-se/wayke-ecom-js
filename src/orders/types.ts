import { IAddress, ICustomer } from "../customers/types";
import { DrivingDistance } from "../insurances/types";
import { PaymentLookupResponse } from "../payments/payment-lookup-response";
import { IPaymentLookupResponseData } from "../payments/types";
import { IVehicleTrade } from "../vehicles/types";

export interface IOrderCreateRequest {
    id: string;
    tradein: IVehicleTrade | undefined;
    insurance: IOrderInsuranceRequest | undefined;
    payment: IOrderPaymentRequest;
    deliveryType: DeliveryType;
    customer: ICustomer;
}

export interface IOrderCreateResponse {
    getId(): string;
}

export interface IOrderCreateResponseData {
    id: string;
}

export interface IOrderOptionsRequest {
    id: string;
}

export interface IOrderOptionsResponse {
    getPaymentOptions(): IPaymentOption[];
    getDeliveryOptions(): IDeliveryOption[];
    getInsuranceOption(): IAvailableInsuranceOption | undefined;
    getOrderConditions(): string | undefined;
    getOrderReturnConditions(): string | undefined;
    getConditionsPdfUri(): string | null | undefined;
    getContactInformation(): IContactInformation | undefined;
    allowsTradeIn(): boolean;
}

export interface IOrderInsuranceRequest {
    personalNumber?: string;
    drivingDistance: DrivingDistance;
    addons: string[] | undefined;
}

export interface IOrderPaymentRequest {
    type: PaymentType;
    months: number;
    downPayment: number;
    residualValue: number | undefined;
}

export interface IOrderOptionsResponseData {
    conditions: string | undefined;
    returnConditions: string | undefined;
    conditionsPdfUri: string | null | undefined;
    contactInformation: IContactInformation | undefined;
    delivery: IDeliveryOption[];
    insurance: IAvailableInsuranceOption | undefined;
    payment: IPaymentOptionResponseData[];
    tradeIn: boolean;
}

export interface IOrderCustomer {
    personalNumber: string;
    email: string;
    phoneNumber: string;
    name: string;
    address: IAddress;
}

export enum DeliveryType {
    None = "None",
    Pickup = "Pickup",
    Delivery = "Delivery",
}
export interface IDeliveryOption {
    type: DeliveryType;
    deliveryTime: string;
    startupCost: number;
    unitPrice?: number;
    unit?: string;
    minQuantity?: number;
    maxQuantity?: number;
}

export interface IAvailableInsuranceOption {
    description: string | undefined;
    logo: string | undefined;
    title: string;
    url: string | undefined;
    ecomInsuranceText: string | undefined;
}

export enum PaymentType {
    Cash = "Cash",
    Lease = "Lease",
    Loan = "Loan",
}

export interface IPaymentOptionResponseData {
    loanDetails: IPaymentLookupResponseData | undefined;
    logo: string | undefined;
    name: string | undefined;
    price: number | undefined;
    type: PaymentType;
    unit: string | undefined;
}

export interface IPaymentOption {
    loanDetails: PaymentLookupResponse | undefined;
    logo: string | undefined;
    name: string | undefined;
    price: number | undefined;
    type: PaymentType;
    unit: string | undefined;
}

export interface IContactInformation {
    address: string | undefined;
    city: string | undefined;
    email: string | undefined;
    homePage: string | undefined;
    name: string | undefined;
    phone: string | undefined;
    zip: string | undefined;
}
