import { AuthMethod } from "./types";

const outstandingTransaction = (method: AuthMethod) => {
    if (method === AuthMethod.SameDevice) {
        return "Försöker starta BankID-appen.";
    }
    return "Starta BankID-appen.";
};

interface IMessageResolvers {
    [name: string]: (method: AuthMethod) => string;
}

export const resolvers: IMessageResolvers = {};
resolvers["outstandingTransaction"] = outstandingTransaction;

export const supportedHintCodes = Object.keys(resolvers);

export default (hintCode: string | undefined, method: AuthMethod) => {
    if (!hintCode) {
        return "";
    }

    const resolve = resolvers[hintCode];
    if (!resolve) {
        return "";
    }

    const message = resolve(method);
    return message;
};
