const fixtures = require("../../../../test/fixtures");
const fixture = (name: string): any => fixtures.create(name);

import { buildRequest, getUrl } from './collect';
import Configuration from "../../../config";
const http = require("../../");

describe("BankId Collect", () => {
    let requestForgeryToken: string;
    let host: string;

    beforeAll(() => {
        const response = fixture("IApiResponse");
        http.context = jest.fn(() => ({ requestForgeryToken }));
        requestForgeryToken = response.requestForgeryToken;

        const fake = fixture("IConfiguration");
        const config = Configuration.bind(fake);
        host = config.getApiAddress();
    });

    describe(":buildRequest()", () => {
        it("Should have request forgery token header", () => {
            const request = buildRequest();
            expect(request.headers).toHaveProperty(
                "x-rf-token",
                requestForgeryToken
            );
        });
    });

    describe(":getUrl()", () => {
        it("Should be collect url", () => {
            const orderRef = fixture("IBankIdCollectRequest").orderRef;

            var url = getUrl(orderRef);

            expect(url).toEqual(`${host}/bankid/collect/${orderRef}`);
        });
    });
});
