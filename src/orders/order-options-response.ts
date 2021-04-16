import { PaymentLookupResponse } from "../payments/payment-lookup-response";
import {
    IAvailableInsuranceOption,
    IContactInformation,
    IDealerOption,
    IDeliveryOption,
    IOrderOptionsResponse,
    IOrderOptionsResponseData,
    IPaymentOption,
} from "./types";

export class OrderOptionsResponse implements IOrderOptionsResponse {
    private response: IOrderOptionsResponseData;

    public constructor(response: IOrderOptionsResponseData) {
        if (!response) {
            throw new Error("Missing order options response data");
        }

        this.response = response;
    }

    public requiresDealerSelection(): boolean {
        return this.response.dealers && this.response.dealers.length > 1;
    }

    public getDealerSites(): IDealerOption[] {
        if (!this.response.dealers || !this.response.dealers.length) {
            return [];
        }

        return this.response.dealers;
    }

    public getPaymentOptions(): IPaymentOption[] {
        if (!this.response.payment || !this.response.payment.length) {
            return [];
        }

        return this.response.payment.map((payment) => ({
            loanDetails: payment.loanDetails
                ? new PaymentLookupResponse(payment.loanDetails)
                : undefined,
            logo: payment.logo,
            name: payment.name,
            price: payment.price,
            type: payment.type,
            unit: payment.unit,
            externalId: payment.externalId,
        }));
    }

    public getDeliveryOptions(): IDeliveryOption[] {
        if (!this.response.delivery || !this.response.delivery.length) {
            return [];
        }

        return this.response.delivery.map((delivery) => ({
            type: delivery.type,
            deliveryTime: delivery.deliveryTime,
            startupCost: delivery.startupCost,
            unitPrice: delivery.unitPrice,
            unit: delivery.unit,
            minQuantity: delivery.minQuantity,
            maxQuantity: delivery.maxQuantity,
        }));
    }

    public getInsuranceOption(): IAvailableInsuranceOption | undefined {
        return this.response.insurance
            ? {
                  description: this.response.insurance.description,
                  logo: this.response.insurance.logo,
                  title: this.response.insurance.title,
                  url: this.response.insurance.url,
                  ecomInsuranceText: this.response.insurance.ecomInsuranceText,
              }
            : undefined;
    }

    public getOrderConditions(): string | undefined {
        return this.response.conditions;
    }

    public getOrderReturnConditions(): string | undefined {
        return this.response.returnConditions;
    }

    public getConditionsPdfUri(): string | null | undefined {
        return this.response.conditionsPdfUri;
    }

    public getContactInformation(): IContactInformation | undefined {
        return this.response.contactInformation;
    }

    public allowsTradeIn(): boolean {
        return this.response.tradeIn;
    }

    public isUnavailable() {
        return this.response.unavailable;
    }
}
