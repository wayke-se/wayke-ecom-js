import theoretically from "jest-theories";

const fixtures = require("../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import resolve from "./message-resolver";
import { AuthMethod } from "./types";

const getRandomMethod = () =>
    fixture("IBankIdCollectRequest").method;

describe("BankId Message Resolver", () => {
    const theories = [
        {
            hintCode: undefined,
            method: getRandomMethod(),
            expected: ""
        },
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
        {
            hintCode: "noClient",
            method: getRandomMethod(),
            expected: "Starta BankID-appen."
        },
        {
            hintCode: "started",
            method: getRandomMethod(),
            expected: "Söker efter BankID, det kan ta en liten stund... Om det har gått några sekunder och inget BankID har hittats har du sannolikt inget BankID som går att använda för den aktuella identifieringen/underskriften i den här enheten. Om du inte har något BankID kan du hämta ett hos din internetbank."
        },
        {
            hintCode: "userSign",
            method: getRandomMethod(),
            expected: "Skriv in din säkerhetskod i BankID-appen och välj Legitimera eller Skriv under."
        },
        {
            hintCode: "expiredTransaction",
            method: getRandomMethod(),
            expected: "BankID-appen svarar inte. Kontrollera att den är startad och att du har internetanslutning. Om du inte har något giltigt BankID kan du hämta ett hos din Bank. Försök sedan igen."
        },
        {
            hintCode: "certificateErr",
            method: getRandomMethod(),
            expected: "Det BankID du försöker använda är för gammalt eller spärrat. Använd ett annat BankID eller hämta ett nytt hos din internetbank."
        },
        {
            hintCode: "userCancel",
            method: getRandomMethod(),
            expected: "Åtgärden avbruten."
        },
        {
            hintCode: "cancelled",
            method: getRandomMethod(),
            expected: "Åtgärden avbruten. Försök igen."
        },
        {
            hintCode: "startFailed",
            method: AuthMethod.SameDevice,
            expected: "BankID-appenverkar inte finnas i din dator eller telefon. Installera denoch hämta ett BankID hos din internetbank. Installera appenfrån din appbutik eller https://install.bankid.com."
        },
        {
            hintCode: "startFailed",
            method: AuthMethod.QrCode,
            expected: "Misslyckades att läsa av QR koden. Starta BankID-appen och läs av QR koden. Om du inte har BankID-appen måste du installera den och hämta ett BankID hos din internetbank. Installera appenfrån din appbutik eller https://install.bankid.com."
        },
    ];

    theoretically("Given '{hintCode}' and '{method}', should be '{expected}'", theories, (theory) => {
        const message = resolve(theory.hintCode, theory.method);
        expect(message).toBe(theory.expected);
    });
});