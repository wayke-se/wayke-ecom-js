import Configuration from "../../../config/index";
import { IBankIdAuthRequest, AuthMethod } from "../../../bankid/types";

const getRoute = (method: AuthMethod) => {
    switch (method) {
        case AuthMethod.QrCode:
            return "/qr-code";
        case AuthMethod.SameDevice:
            return "/same-device";
        default:
            throw new Error("BankId auth method not supported");
    }
};

export const getUrl = (requestOptions: IBankIdAuthRequest) => {
    const route = getRoute(requestOptions.method);
    const host = Configuration.current().getApiAddress();
    const url = `${host}/bankid/auth${route}`;
    return url;
};
