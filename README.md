[![build status](https://api.travis-ci.org/wayke-se/wayke-ecom-js.svg?branch=master)](https://api.travis-ci.org/wayke-se/wayke-ecom-js.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/wayke-se/wayke-ecom-js/badge.svg?branch=master)](https://coveralls.io/github/wayke-se/wayke-ecom-js?branch=master)

# SDK for consuming Waykes e-commerce APIs

This project aims to provide a simple, yet powerful, way to integrate Waykes e-commerce functionality into retailers own websites.

## Installing

    npm i --save @wayke-se/ecom

## Using

The SDK exposes several namespaces, each containing functionality for a specific set of functionality. The namespaces are:
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
    };
    config.bind(newConfig);

As an example, orders originating from https://www.wayke.se will have a topic `Wayke` and a channel `wayke.se`. For orders originating from the Wayke iOS app, the topic will be `Wayke` and the channel `iOS-app`. For Android, the channel will be `Android-app`.

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
- `.getPaymentOptions()` returns a `IPaymentOption[]`
- `.getDeliveryOptions()` returns a `IDeliveryOption[]`
- `.getInsuranceOption()` returns a `IInsuranceOption` if available
- `.getOrderConditions()` returns a `string` with conditions for possible orders
- `.getOrderReturnConditions()` returns a `string` with return conditions for possible orders
- `.getConditionsPdfUri()` returns a `string` with a URI to a PDF containing the conditions
- `.getContactInformation()` returns a `IContactInformation` if available
- `.allowsTradeIn()` returns `true`/`false` if the retailer allows a trade-in vehicle for possible orders

These values should provide enough information to continue the boarding process for the customer.

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
        .withDownPayment(90000)
        .withDuration(72)
        .withResidualValue(0.2) // optional
        .build();

    const response = await payments.lookupPayment(request);

The returns `IPaymentLookupResponse` exposes methods to retrieve financial data:
- `.getCosts()` returns a `IPaymentCosts` object containing a monthly cost and a total cost.
- `.getFees()` returns a `IPaymentFees` object containing setup fee and administration fee.
- `.getInterests()` returns a `IPaymentInterests` object containing the interest and effective interest.
- `.getDownPaymentSpec()` returns a `IPaymentRangeSpec` defining the ranges for a down payment.
- `.getDurationSpec()` returns a `IPaymentRangeSpec` defining the ranges for a duration.
- `.getResidualValueSpec()` returns a `IPaymentRangeSpec` defining the ranges for a residual value.

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

    bankid
        .auth(request)
        .then((response: IBankIdAuthResponse) => {
            // Do something with response.
        })
        .catch(() => {
            // Handle errors.
        });
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

    bankid
        .collect(request)
        .then((response: IBankIdCollectResponse) => {
            // Do something with response.
        })
        .catch(() => {
            // Handle errors.
        });
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
