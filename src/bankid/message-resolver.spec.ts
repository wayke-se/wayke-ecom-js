import theoretically from "jest-theories";

import resolve from "./message-resolver";
import { AuthMethod } from "./types";

describe("BankId Message Resolver", () => {
    const theories = [
        { hintCode: undefined, method: AuthMethod.SameDevice, expected: "" },
        {
            hintCode: "outstandingTransaction",
            method: AuthMethod.SameDevice,
            expected: "Försöker starta BankID-appen."
        },
        {
            hintCode: "outstandingTransaction",
            method: AuthMethod.QrCode,
            expected: "Starta BankID-appen."
        },
    ];

    theoretically("Given '{hintCode}' and '{method}', should be '{expected}'", theories, (theory) => {
        const message = resolve(theory.hintCode, theory.method);
        expect(message).toBe(theory.expected);
    });
});