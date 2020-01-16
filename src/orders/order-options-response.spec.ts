const fixtures = require("../../test/fixtures");

import { PaymentLookupResponse } from "../payments/payment-lookup-response";
import { OrderOptionsResponse } from "./order-options-response";

const fixture = (name: string, withData: any = undefined): any =>
    fixtures.create(name, withData);

describe("OrderOptionsResponse", () => {
    describe(":constructor()", () => {
        it("throws error for missing response param", () => {
            expect(() => {
                new OrderOptionsResponse(null as any);
            }).toThrowError();
        });
    });

    describe(":getPaymentOptions()", () => {
        it("returns a IOptionsPayment list with the response payments", () => {
            const response = fixture("IOrderOptionsResponse");
            const expected: Array<{ [key: string]: any }> = response.payment;
            const actual = new OrderOptionsResponse(
                response
            ).getPaymentOptions();

            for (let i = 0; i < expected.length; i++) {
                expected[i].loanDetails = new PaymentLookupResponse(
                    expected[i].loanDetails
                );
            }

            expect(actual).toEqual(expected);
        });
        it("returns an empty list when values missing in response", () => {
            const response = fixture("IOrderOptionsResponse");
            delete response.payment;
            const actual = new OrderOptionsResponse(
                response
            ).getPaymentOptions();

            expect(actual).toEqual([]);
        });
    });

    describe(":getDeliveryOptions()", () => {
        it("returns a IOptionsDelivery list with the response deliveries", () => {
            const response = fixture("IOrderOptionsResponse");
            const expected = response.delivery;
            const actual = new OrderOptionsResponse(
                response
            ).getDeliveryOptions();

            expect(actual).toEqual(expected);
        });
        it("returns an empty list when values missing in response", () => {
            const response = fixture("IOrderOptionsResponse");
            delete response.delivery;
            const actual = new OrderOptionsResponse(
                response
            ).getDeliveryOptions();

            expect(actual).toEqual([]);
        });
    });

    describe(":getInsuranceOptions()", () => {
        it("returns a IOptionsInsurance with the response insurance", () => {
            const response = fixture("IOrderOptionsResponse");
            const expected = response.insurance;
            const actual = new OrderOptionsResponse(
                response
            ).getInsuranceOption();

            expect(actual).toEqual(expected);
        });
    });

    describe(":getOrderConditions()", () => {
        it("returns the conditions from the response object", () => {
            const response = fixture("IOrderOptionsResponse");
            const expected = response.conditions;
            const actual = new OrderOptionsResponse(
                response
            ).getOrderConditions();

            expect(actual).toEqual(expected);
        });
    });

    describe(":getOrderReturnConditions()", () => {
        it("returns the return conditions from the response object", () => {
            const response = fixture("IOrderOptionsResponse");
            const expected = response.returnConditions;
            const actual = new OrderOptionsResponse(
                response
            ).getOrderReturnConditions();

            expect(actual).toEqual(expected);
        });
    });

    describe(":getContactInformation()", () => {
        it("returns the contact information from the response object", () => {
            const response = fixture("IOrderOptionsResponse");
            const expected = response.contactInformation;
            const actual = new OrderOptionsResponse(
                response
            ).getContactInformation();

            expect(actual).toEqual(expected);
        });
    });

    describe(":allowsTradeIn()", () => {
        it("returns the trade in flag from the response object", () => {
            const response = fixture("IOrderOptionsResponse");
            const expected = response.tradeIn;
            const actual = new OrderOptionsResponse(response).allowsTradeIn();

            expect(actual).toEqual(expected);
        });
    });
});
