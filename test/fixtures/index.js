const factory = require("autofixture");

factory.define("IApiResponse", [
    "successful".asBoolean(),
    "response",
]);

const IAddress = [
    "city",
    "name",
    "postalCode",
    "street",
    "street2",
];
factory.define("IAddress", IAddress);

factory.define("ICustomer", [
    "name",
    "personalNumber",
    "email",
    "phoneNumber",
    "address".fromFixture("IAddress"),
]);

factory.define("IAddressLookupRequest", [
    "personalNumber",
]);
factory.define("IAddressLookupResponse", [].concat(IAddress));

factory.define("IInsuranceOptionsResponse.Branding", [
    "id",
    "description",
    "logo".as(i => ({
        file: {
            url: `https://www.example.com/images/${i}.png`,
        },
    })),
    "name",
    "termsUrl",
    "website",
]);
factory.define("IInsuranceOptionsResponse.AddOn", [
    "title",
    "name",
    "description",
    "monthlyPrice".asNumber(),
    "exclude".asArray(1),
]);
factory.define("IInsuranceOptionsResponse.Item", [
    "name",
    "description",
]);
factory.define("IInsuranceOptionsResponse.Details", [
    "name",
    "price".asNumber(),
    "unit",
    "description",
    "legalUrl",
    "legalDescription",
    "addOns".asListOfFixtures("IInsuranceOptionsResponse.AddOn", 3),
    "insuranceItems".asListOfFixtures("IInsuranceOptionsResponse.Item", 3),
]);

factory.define("IInsuranceOptionsRequest", [
    "id",
    "personalNumber",
    "drivingDistance".pickFrom(["Between0And1000", "Between1000And1500", "Between1500And2000", "Between2000And2500", "Over2500"]),
    "includeFinance".asBoolean(),
]);
factory.define("IInsuranceOptionsResponse", [
    "branding".fromFixture("IInsuranceOptionsResponse.Branding"),
    "details".fromFixture("IInsuranceOptionsResponse.Details"),
]);

factory.define("IContactInformation", [
    "address",
    "city",
    "email",
    "homePage",
    "name",
    "phone",
    "zip"
]);
factory.define("IOrderDelivery", [
    "deliveryTime",
    "price",
    "type".pickFrom(["Pickup", "Delivery"]),
]);
factory.define("IOrderInsurance", [
    "description",
    "logo",
    "title",
    "url",
    "ecomInsuranceText"
]);

factory.define("IOrderPayment", [
    "loanDetails".fromFixture("IPaymentLookupResponse"),
    "logo",
    "name",
    "price".asNumber(),
    "type".pickFrom(["Cash", "Lease", "Loan"]),
    "unit",
]);

factory.define("IVehicleTrade", [
    "registrationNumber",
    "mileage".asNumber(),
    "condition".pickFrom(["VeryGood", "Good", "Ok"]),
    "comments",
]);
factory.define("IOrderInsuranceRequest", [
    "personalNumber",
    "drivingDistance".pickFrom(["Between0And1000", "Between1000And1500", "Between1500And2000", "Between2000And2500", "Over2500"]),
    "addons".asArray(2),
]);
factory.define("IOrderPaymentRequest", [
    "type".pickFrom(["Cash", "Lease", "Loan"]),
    "months".asNumber(),
    "downPayment".asNumber(),
    "residualValue".asNumber(),
]);
factory.define("IOrderCreateRequest", [
    "id",
    "tradein".fromFixture("IVehicleTrade"),
    "insurance".fromFixture("IOrderInsuranceRequest"),
    "payment".fromFixture("IOrderPaymentRequest"),
    "deliveryType".pickFrom("Pickup", "Delivery"),
    "customer".fromFixture("ICustomer"),
]);
factory.define("IOrderCreateResponse", [
    "id",
]);

factory.define("IOrderOptionsRequest", [
    "id",
]);
factory.define("IOrderOptionsResponse", [
    "conditions",
    "contactInformation".fromFixture("IContactInformation"),
    "delivery".asListOfFixtures("IOrderDelivery", 2),
    "insurance".fromFixture("IOrderInsurance"),
    "payment".asListOfFixtures("IOrderPayment", 2),
    "tradeIn".asBoolean(),
]);

factory.define("IPaymentCosts", [
    "monthlyCost".asNumber(),
    "totalCreditCost".asNumber(),
]);
factory.define("IPaymentFees", [
    "setupFee".asNumber(),
    "administrationFee".asNumber(),
]);
factory.define("IPaymentInterests", [
    "interest".asNumber(),
    "effectiveInterest".asNumber(),
]);
factory.define("IPaymentRangeSpec", [
    "min".asNumber(),
    "max".asNumber(),
    "step".asNumber(),
    "default".asNumber(),
    "current".asNumber(),
]);
factory.define("IPaymentLookupRequest", [
    "id",
    "duration".asNumber(),
    "downPayment".asNumber(),
]);
factory.define("IPaymentLookupResponse", [
    "monthlyCost".asNumber(),
    "interest".asNumber(),
    "effectiveInterest".asNumber(),
    "setupFee".asNumber(),
    "administrationFee".asNumber(),
    "totalCreditCost".asNumber(),
    "residual".fromFixture("IPaymentRangeSpec"),
    "duration".fromFixture("IPaymentRangeSpec"),
    "downPayment".fromFixture("IPaymentRangeSpec"),
    "totalResidualValue".asNumber(),
    "link",
]);

factory.define("IVehicleLookupRequest", [
    "registrationNumber",
]);
factory.define("IVehicleLookupResponse", [
    "manufacturer",
    "modelName",
    "modelSeries",
    "modelYear".asNumber(),
]);

module.exports = factory;
