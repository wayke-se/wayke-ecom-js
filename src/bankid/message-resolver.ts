import { AuthMethod } from "./types";

const outstandingTransaction = (method: AuthMethod) => {
    if (method === AuthMethod.SameDevice) {
        return "Försöker starta BankID-appen.";
    }
    return "Starta BankID-appen.";
};

const noClient = () => "Starta BankID-appen.";

const started = () =>
    "Söker efter BankID, det kan ta en liten stund... Om det har gått några sekunder och inget BankID har hittats har du sannolikt inget BankID som går att använda för den aktuella identifieringen/underskriften i den här enheten. Om du inte har något BankID kan du hämta ett hos din internetbank.";

const userSign = () =>
    "Skriv in din säkerhetskod i BankID-appen och välj Legitimera eller Skriv under.";

const expiredTransaction = () =>
    "BankID-appen svarar inte. Kontrollera att den är startad och att du har internetanslutning. Om du inte har något giltigt BankID kan du hämta ett hos din Bank. Försök sedan igen.";

const certificateErr = () =>
    "Det BankID du försöker använda är för gammalt eller spärrat. Använd ett annat BankID eller hämta ett nytt hos din internetbank.";

const userCancel = () => "Åtgärden avbruten.";

const cancelled = () => "Åtgärden avbruten. Försök igen.";

const startFailed = (method: AuthMethod) => {
    if (method === AuthMethod.QrCode) {
        return "Starta BankID-appen.";
    }
    return "BankID-appenverkar inte finnas i din dator eller telefon. Installera denoch hämta ett BankID hos din internetbank. Installera appenfrån din appbutik eller https://install.bankid.com.";
};

interface IMessageResolvers {
    [name: string]: (method: AuthMethod) => string;
}

const resolvers: IMessageResolvers = {};
resolvers["outstandingTransaction"] = outstandingTransaction;
resolvers["noClient"] = noClient;
resolvers["started"] = started;
resolvers["userSign"] = userSign;
resolvers["expiredTransaction"] = expiredTransaction;
resolvers["certificateErr"] = certificateErr;
resolvers["userCancel"] = userCancel;
resolvers["cancelled"] = cancelled;
resolvers["startFailed"] = startFailed;

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
