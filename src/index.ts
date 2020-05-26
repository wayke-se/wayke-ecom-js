import { default as config } from "./config/index";
import * as customers from "./customers/index";
import * as insurances from "./insurances/index";
import * as orders from "./orders/index";
import * as payments from "./payments/index";
import * as vehicles from "./vehicles/index";
import * as bankid from "./bankid/index";

export { config };
export { customers };
export { insurances };
export { orders };
export { payments };
export { vehicles };
export { bankid };

export {
    IConfiguration,
    IApiConfiguration,
    IOriginConfiguration,
    IConfigurationRoot,
} from "./config/index";
export {
    IAddress,
    IAddressLookupRequest,
    IAddressLookupResponse,
    ICustomer,
    IDistance,
} from "./customers/types";
export {
    IInsuranceAddon,
    IInsuranceBrand,
    IInsuranceConditions,
    IInsuranceItem,
    IInsuranceOption,
    IInsuranceOptionsResponse,
    IInsuranceOptionsRequest,
    IInsuranceTerms,
    DrivingDistance,
} from "./insurances/types";
export {
    DeliveryType,
    IDeliveryOption,
    IAvailableInsuranceOption,
    IOrderCreateRequest,
    IOrderCreateResponse,
    IOrderCustomer,
    IOrderOptionsRequest,
    IOrderOptionsResponse,
    IOrderPaymentRequest,
    IPaymentOption,
    PaymentType,
} from "./orders/types";
export {
    IPaymentCosts,
    IPaymentFees,
    IPaymentInterests,
    IPaymentLookupRequest,
    IPaymentLookupResponse,
    IPaymentRangeSpec,
} from "./payments/types";
export {
    IVehicle,
    IVehicleLookupRequest,
    IVehicleLookupResponse,
    VehicleCondition,
} from "./vehicles/types";
export {
    IBankIdAuthRequest,
    IBankIdAuthResponse,
    AuthMethod,
    IBankIdCollectRequest,
    IBankIdCollectResponse,
    AuthStatus,
    IBankIdCancelRequest,
} from "./bankid/types";
