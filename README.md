[![build status](https://api.travis-ci.org/wayke-se/wayke-ecom-js.svg?branch=master)](https://api.travis-ci.org/wayke-se/wayke-ecom-js.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/wayke-se/wayke-ecom-js/badge.svg?branch=master)](https://coveralls.io/github/wayke-se/wayke-ecom-js?branch=master)

# SDK for consuming Waykes e-commerce APIs

This project aims to provide a simple, yet powerful, way to integrate Waykes e-commerce functionality into retailers own websites.

## Installing

    npm i --save @wayke-se/ecom

## Using

The SDK exposes several namespaces, each containing functionality for a specific set of use cases. The namespaces are:
- `config`
- `customers`
- `insurances`
- `orders`
- `vehicles`
- `bankid`

## Configuring

By default the library reads an environment variable called `WAYKE_ECOM_API_ADDRESS` to know the location of the restful API. However, this is not always possible or the desired behavior - so as an alternative configuration option, a SDK consumer can manually bind an address for the API. This should preferrably be done in a setup file in the consuming project, and only run once:

    import { config } from "@wayke-se/ecom";

    const newConfig = {
        api: {
            address: "[ECOM_API_URL]",
        },
    };
    config.bind(newConfig);

The `[ECOM_API_URL]` is either of the following urls:

| Environment | Url |
| ----------- | --- |
| Test | https://ecom.wayketech.se |
| Production | https://ecom.wayke.se |

The library also tries to guess the origin of the runtime application, to mark where an order originates (when creating it). By default it uses `window.location.host` to create what's called a "topic". A "topic" is a categorization for an order origin. Parallell with the "topic", a "channel" is also automatically created for the origin. This value is `Web` when `window.location.host` is available during the runtime.

To manually set these values, to enable a more granular control over the order origins, a configuration takes these parameters as:

    import { config } from "@wayke-se/ecom";

    const newConfig = {
        api: {
            address: "[ECOM_API_URL]",
        },
        origin: {
            topic: "[Dealer Specific Topic]",
            channel: "[Ecom Channel Name]",
        },
        bankIdThumbprint: "[Dealer Specific BankId Certificate Thumbprint]"
    };
    config.bind(newConfig);

As an example, orders originating from https://www.wayke.se will have a topic `Wayke` and a channel `wayke.se`. For orders originating from the Wayke iOS app, the topic will be `Wayke` and the channel `iOS-app`. For Android, the channel will be `Android-app`.

### Swedish BankId Thumbprint

By default Wayke's BankId certificate is used to verify customer identity. There is an optional configuration property `bankIdThumbprint` which allows for dealers to use their own BankId certificate. If the certificate's thumbprint is set that certificate will be used instead, given that it is correctly setup in the Dealer back-office.

## Using

The information flow between clients and Wayke should be in a specific order. First of all we should retrieve all order options available for a vehicle, to know how to set up the rest of the information flow.

### Retrieving order options

We start off by creating a request builder, which will - when built - return an valid `IOrderOptionsRequest` object:

    import { orders } from "@wayke-se/ecom";

    const request = orders.newOptionsRequest()
        .forVehicle("VEHICLE-ID-FROM-WAYKE")
        .build();

The resulting request object can now be used to communicate with Waykes e-com API:

    const response = await orders.getOptions(request);

The returned `IOrderOptionsResponse` exposes helper methods to select partial data points:
- `.requiresDealerSelection()` returns `true` when more than one dealer site is available
- `.getDealerSites()` return a `IDealerOption[]` with all available dealer sites
- `.getPaymentOptions()` returns a `IPaymentOption[]`
- `.getDeliveryOptions()` returns a `IDeliveryOption[]`
- `.getInsuranceOption()` returns a `IInsuranceOption` if available
- `.getOrderConditions()` returns a `string` with conditions for possible orders
- `.getOrderReturnConditions()` returns a `string` with return conditions for possible orders
- `.getConditionsPdfUri()` returns a `string` with a URI to a PDF containing the conditions
- `.getContactInformation()` returns a `IContactInformation` if available
- `.allowsTradeIn()` returns `true`/`false` if the retailer allows a trade-in vehicle for possible orders

These values should provide enough information to continue the boarding process for the customer.

If `.requiresDealerSelection()` returns truthy, the customer should be displayed a list of all available dealer sites from `.getDealerSites()`. When the customer has made a selection for his or hers preferred dealer site, a new order option request should be made:

    const request = orders.newOptionsRequest()
        .forVehicle("VEHICLE-ID-FROM-WAYKE")
        .forDealer("DEALER-ID-SELECTION")
        .build();

### Retrieving insurance options

The customer might want to sign up for an insurance as well, and to select a suitable insurance we need to know which payment type the customer would like to proceed with. Payment types are availble from the `IPaymentOption`s, and should be added to the request object - as well as the customers swedish personal number, the current selected vehicle, and an estimated driving range (per year).

    import { insurances, DrivingDistance } from "@wayke-se/ecom";

    const request = insurances.newInsuranceOptionsRequest()
        .forCustomer("YYYYMMDD-XXXX")
        .forVehicle("VEHICLE-ID-FROM-WAYKE")
        .withPaymentType(aPaymentOption.type)
        .withDrivingDistance(DrivingDistance.Between1000And1500)
        .build();

    const response = await insurances.getOptions(request);

The returned `IInsuranceOptionsResponse` exposes only one method:
- `.getInsuranceOption()` returns a `IInsuranceOption` with a range of values for the insurance in question.

### Retrieving a customers address based on his or hers personal number

Wayke provides functionality to lookup a customers address, in an anonymized form. This reduces the risk for errors when entering these details by hand, and it lessens the input required to proceed with the order.

    import { customers } from "@wayke-se/ecom";

    const request = customers.newAddressLookupRequest()
        .forCustomer("YYYYMMDD-XXXX")
        .build();

    const response = await customers.lookupAddress(request);

`lookupAddress` returns a `IAddressLookupResponse` object, exposing:
- `.getAddress()` returns the address for the customer, in an anonymized form.

### Looking up a vehicle for trade-in

When a customer wants to submit a vehicle for trade-in with the order, we need to look it up through Wayke before hand.

    import { vehicles } from "@wayke-se/ecom";

    const request = vehicles.newLookupRequest()
        .withRegistrationNumber("REGISTRATION-NUMBER")
        .build();

    const response = await vehicles.lookupVehicle(request);

To include a valuation for the vehicle in question, add a mileage and a VehicleCondition to the request:

    const request = vehicles.newLookupRequest()
        .withRegistrationNumber("REGISTRATION-NUMBER")
        .withMileage(12345)
        .withCondition(VehicleCondition.VeryGood)
        .build();

The returned `IVehicleLookupResponse` exposes only one method:
- `.getVehicle()` returns a `IVehicle` object containing manufacturer, model series, model name, and optionally valuation for the vehicle.

### Retrieve payment data for vehicle

Wayke exposes functionality to calculate interest rates, fees, etc, for a vehicle - given a few parameters such as payment duration (in months) and a down payment.

    import { payments } from "@wayke-se/ecom";

    const request = payments.newLookupRequest()
        .forVehicle("VEHICLE-ID-FROM-WAYKE")
        .forDealer("DEALER-ID-SELECTION") // optional, should be applied when there's multiple dealer sites available for a vehicle
        .withDownPayment(90000)
        .withDuration(72)
        .withResidualValue(0.2) // optional
        .build();

    const response = await payments.lookupPayment(request);

The returned `IPaymentLookupResponse` exposes methods to retrieve financial data:
- `.getCosts()` returns a `IPaymentCosts` object containing a monthly cost and a total cost.
- `.getFees()` returns a `IPaymentFees` object containing setup fee and administration fee.
- `.getInterests()` returns a `IPaymentInterests` object containing the interest and effective interest.
- `.getDownPaymentSpec()` returns a `IPaymentRangeSpec` defining the ranges for a down payment.
- `.getDurationSpec()` returns a `IPaymentRangeSpec` defining the ranges for a duration.
- `.getResidualValueSpec()` returns a `IPaymentRangeSpec` defining the ranges for a residual value.
- `.getPrice()` returns a `number` defining the price of the vehicle.
- `.getCreditAmount()` returns a `number` defining the total credit amount used.
- `.hasPrivacyPolicy()` returns a `boolean` defining if the financial provider has a privacy policy.
- `.getPrivacyPolicyUrl()` returns a `string` defining if the financial provider's privacy policy.
- `.shouldUseCreditScoring()` returns a `boolean` defining if the vehicle is configured to use real time credit assessments *(described below)*.
- `.getFinancialProductCode()` returns a `string` defining if the financial product code *(used by real time credit assessments)*.

### Creating order details and an order

To create a valid order we should use appropriate builders, and specify our data in batches:

    import { customers, orders, vehicles } from "@wayke-se/ecom";

    const customer = customers.newCustomer()
        .withAddress(addressLookupResponse.getAddress())
        .withPersonalNumber("YYYYMMDD-XXXX")
        .withEmail("person.name@email.com")
        .withPhoneNumber("0707-123 123")
        .build();

    const payment = orders.newPayment()
        .withType(aPaymentOption.type)
        .withDuration(36) // months, only applicable when payment type === PaymentType.Loan
        .withDownPayment(25000) // only applicable when payment type === PaymentType.Loan
        .withResidualValue(20000) // only applicable when payment type === PaymentType.Loan
        .build();

    const insurance = orders.newInsurance()
        .withDrivingRange(2000)
        .withAddOns(["Add On 1", "Add On 2"]) // optional
        .build();

    const tradein = vehicles.newVehicleTrade()
        .forVehicle("REGISTRATION-NUMBER")
        .withMileage(7600)
        .withCondition(VehicleCondition.VeryGood)
        .withComment("A very nice car for daily commute!") // optional
        .build();

    const request = orders.newCreateRequest()
        .forVehicle("VEHICLE-ID-FROM-WAYKE")
        .withCustomer(customer)
        .withPayment(payment)
        .withDeliveryType(aDeliveryOption.type)
        .withInsurance(insurance) // optional
        .withTradeIn(tradein) // optional
        .build();

    const response = await orders.create(request);

As one can see, splitting up the builders over multiple frontend components/views is easy (and encouraged!) to do.

### Authenticating using Swedish BankId

Bank id authentication is performed using three methods: `auth`, `collect` and `cancel`. In short, `auth` starts a authentication process, `collect` retrieves status information about the process and `cancel` aborts a process. [More information about this can be found here.](https://www.bankid.com/bankid-i-dina-tjanster/rp-info).

#### Starting a BankId authentication process

```
    const request = bankid
        .newAuthRequest()
        .withIpAddress("130.242.197.92")
        .withMethod(AuthMethod.QrCode)
        .build();

    try {
        await bankid.auth(request);
        // Do something with response.
    } catch (e) {
        // Handle errors.
    }
```

The response of auth contains an order ref. This id is used to track an authentication process and must be included in collect and cancel request.

```
interface IBankIdAuthResponse {
    isQrCode: () => boolean;
    isSameDevice: () => boolean;
    getOrderRef: () => string;
    getQrCode: () => string | undefined;
    getAutoLaunchUrl: () => string | undefined;
    getMethod: () => AuthMethod;
}
```

The qr code from `getQrCode()` is base64 encoded. It can be rendered in an img tag:

```
    const qrCode = authResponse.getQrCode();
    <img src="data:image/png;base64, {qrCode}" />;
```

#### Collecting status information from a BankId process

Once a authentication process is started, _a collect request should be made approximatelly every 2 seconds._

```
    const request = bankid
        .newCollectRequest()
        .withOrderRef(data.orderRef)
        .build();

    try {
        await bankid.collect(request);
        // Do something with response.
    } catch (e) {
        // Handle errors.
    }
```

A collect response have a function `isPedning()`. While this returns true, additional collect requests should be performed. Additionally, if `shouldRenew()` returns true a new auth request should be performed (For example because of an expired qr code).

`isComplete`: When this is true, the authentication is succesful and `getPersonalNumber()` and `getAddress()` should return personal data.

```
interface IBankIdCollectResponse {
    getOrderRef: () => string;
    getStatus: () => AuthStatus;
    isPending: () => boolean;
    getHintCode: () => string | undefined;
    hasMessage(): boolean;
    getMessage(): string;
    shouldRenew(): boolean;
    isCompleted(): boolean;
    getPersonalNumber(): string | undefined;
    getAddress(): IAddress | undefined;
}
```

### Assess a customers credit inquiry

*This feature is currently limited to some specific financial providers.*
*This feature is currently limited to loans. Credit inquiries for leases are not yet supported.*

For some financial providers it is possible to do a real time credit assessment for a loan. The prerequisites for using real time credit assessments are:

1. The flag `useBankid` should be set to `true`, since bank id is required for the inquiry.
2. The dealer that sells the vehicle must have a financial option with credit assessments activated for the vehicle.

The steps of this process are:

1. Perform a payment lookup request returns a `IPaymentLookupResponse` *(described above)*. This response has a method `shouldUseCreditScoring()` that indicates if credit scoring is available for the vehicle. The response also contains a method `getFinancialProductCode`. This methods returns the financial product code of the payment option, which is required for the credit inquiry.
2. Create the credit assessment case. This includes various household information such as monthly income as well as social id, email and phone number. The provided social id will be used for the bank id signing that is required for the order to be processed.
3. The credit assessment case is signed by the customer using Swedish bank id. The signing is towards the financial provider that performs the credit assessment. The status of the signing can be polled using the `creditAssessment.getStatus(caseId)` method.
4. The credit assessment is performed by the financial provider. The status of the signing can be polled using the `creditAssessment.getStatus(caseId)` method. Once complete, a result of the inquiry is provided in the status response.
5. Finally, in order to accept the credit assessment, the case is accepted by the `creditAssessment.accept(caseId)` method.
- If a started case should be abandoned or cancelled for any reason, the `creditAssessment.decline(caseId)` method should be called. This is needed for the financial provider to cancel the case in their systems.

* *Note that if the credit assessment flow replaces the bank id flow described above. Both flows can not be used for the same Ecom order.*

#### Starting a new credit assessment cases

Start a new credit inquiry using the financial provider of the vehicle.

```
const inquiry = {...} // Specify inquiry.

try {
        await creditAssessment.newCase(inquiry);
        // Do something with response.
    } catch (e) {
        // Handle errors.
    }
```

To start a case a complete `ICreditAssessmentInquiry`. This includes customer personal information, household finance information as well as information about the loan.

```
interface ICreditAssessmentInquiry {
    externalId: string; // Acquired in `IPaymentOption`
    customer: ICreditAssessmentCustomer;
    loan: ICreditAssessmentLoan;
    householdEconomy: ICreditAssessmentHouseholdEconomy;
}

interface ICreditAssessmentCustomer {
    socialId: string;
    email: string;
    phone: string;
    signerIp?: string;
}

interface ICreditAssessmentLoan { // Required data is acquired in `IPaymentLookupResponse`
    financialProductId: string;
    price: number;
    downPayment: number;
    credit: number;
    interestRate: number;
    monthlyCost: number;
    term: string; // See below
}

interface ICreditAssessmentHouseholdEconomy {
    maritalStatus: MaritalStatus;
    income: number;
    employment: Employment;
    householdChildren: number;
    householdIncome: number;
    householdHousingCost: number;
    householdDebt: number;
}
```

##### Term

The `term` field required in `ICreditAssessmentLoan` is created from the duration of the loan:

```
const durationInMoths = 24;
const term = durationInMoths + "months";
```

for example: 

```
"12moths"
"48months"
"72months"
```

* *The months in `term` must be a factor of 12.*

The result of the request should be a credit assessment **case id**. This id is used for all following credit assessment requests.

#### Signing a credit assessment case with bank id

A credit asssessment case needs to be signed with Swedish bank id. The two supported signing methds are *qr code* and *same device*.

```
const request = {
    caseId,
    method: AuthMethod.QrCode,
};

creditAssessment.signCase(request)
    .then(() => // Handle success)
    .catch(() => // Handle failure);
```

To collect the results of signing process the `getStatus` method is used. This should be done approximately every two seconds, just like bank id collect.

```
creditAssessment.getStatus(caseId)
    .then((status) => // Handle success)
    .catch((err) => // Handle failure);
```

The `getStatus` method returns a credit assessment status response:

```
interface ICreditAssessmentStatusResponse {
    getStatus: () => CreditAssessmentStatus;
    hasPendingSigning: () => boolean;
    getHintCode: () => string | undefined;
    getSigningMessage(): string;
    shouldRenewSigning(): boolean;
    isSigned(): boolean;
    getAddress(): IAddress | undefined;
    hasPendingScoring: () => boolean;
    isScored: () => boolean;
    hasScoringError: () => boolean;
    getScoringId: () => string | undefined;
    getRecommendation: () => CreditAssessmentRecommendation;
    getDecision: () => CreditAssessmentDecision;
    isAccepted: () => boolean;
}
```

During the signing the status should be `SigningInitiated`. Once the case is signed, the status shuld change to `Signed` or `ScoringInitiated`.

- `hasPendingSigning`  indicates that a signing is ongoing.
- `getHintCode` returns the current bank id hint code of the signing process.
- `getSigningMessage` returns the message that should be displayed for an ongoing sign process.
- `shouldRenewSigning` indicates that a signing failed for some reason (for example time out) and should be restarted.
- `isSigned` indicates that the user has successfully signed the credit assessment case using Swedish bank id.

It is also possible to cancel the signing process. This should be done if the user wants to change sign method (for example from *qr code* to *same device*) or if a new case should be created with new other information.

```
creditAssessment
    .cancelSigning(caseId)
    .then(() => // Handle success)
    .catch(() => // Handle failure);
```

#### Collecting the assessment result

To acquire the credit assessment result, simply use the `getStatus` method (the same one that was used to poll the status of the bank id signing) untill a status response is received with the status `Scored`. This response should also have a *recommendation* and possible a *decision*.

- `hasPendingScoring` indicates that a scoring is ongoing.
- `isScored` indicates that the case is scored.
- `getRecommendation` provides the recommendation of the scoring.
- `getDecision` provides the decision of the scoring.

#### Accepting a credit assessment result

The credit assessment won't be finalized unless it is accepted, which is possible once the case has the `Scored` status. This is done with using the `accept` method:

```
creditAssessment
    .accept(caseId)
    .then(() => // Handle success)
    .catch(() => // Handle failure);
```

The status returned from the `creditAssessment.getStatus` method should now be accepted:

- `isAccepted` indicates that the case is accepted.

#### Declining the credit assessment result

Anytime during the credit assessment process, the case may be declined. To do this, use the `decline` method:

```

creditAssessment
    .decline(caseId)
    .then(() => // Handle success)
    .catch(() => // Handle failure);
```
