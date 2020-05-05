const fixtures = require("../../../test/fixtures");
const fixture = (name: string, withValues: any = undefined): any =>
    fixtures.create(name, withValues);

const http = require("..");
const auth = require("./bankid/auth");
const collect = require("./bankid/collect");
const cancel = require("./bankid/cancel");

describe("API: BankId", () => {
    beforeAll(() => {
        auth.getUrl = jest.fn();
        auth.buildRequest = jest.fn();
        collect.getUrl = jest.fn();
        collect.buildRequest = jest.fn();
        cancel.getUrl = jest.fn();
        cancel.buildRequest = jest.fn();

        http.json = jest.fn(
            () =>
                new Promise(resolve => {
                    const response = fixture("IApiResponse", {
                        successful: false,
                    });
                    resolve(response);
                })
        );
    });

    describe(":auth()", () => {
        it("throws error if response was unsuccessful", async () => {
            const request = fixture("IBankIdAuthRequest");

            let err: any;
            try {
                await auth(request);
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
        });
    });

    describe(":collect()", () => {
        it("throws error if response was unsuccessful", async () => {
            const request = fixture("IBankIdCollectRequest");

            let err: any;
            try {
                await collect(request);
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
        });
    });

    describe(":cancel()", () => {
        it("throws error if response was unsuccessful", async () => {
            const request = fixture("IBankIdCancelRequest");

            let err: any;
            try {
                await cancel(request);
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
        });
    });
});
