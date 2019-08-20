import Configuration from ".";

describe("Configuration", () => {
    const env = process.env;

    beforeEach(() => {
        jest.resetModules();
        Configuration.destroy();
        process.env = {};
    });
    afterEach(() => {
        process.env = env;
    });

    describe("bind()", () => {
        it("returns a valid configuration object", () => {
            const config = Configuration.bind({
                api: {
                    address: "https://www.example.com",
                },
            });
            expect(config).toBeInstanceOf(Configuration);
        });
    });

    describe("current()", () => {
        it("throws if not bound and no environment variable for API address exist", () => {
            expect(() => Configuration.current()).toThrowError();
        });
        it("returns a valid configuration object from environment variables by default", () => {
            const address = "https://www.example.com";
            process.env.WAYKE_ECOM_API_ADDRESS = address;

            expect(Configuration.current()).toBeInstanceOf(Configuration);
        });
        it("returns a valid configuration object when bound with IConfigurationRoot", () => {
            Configuration.bind({
                api: {
                    address: "https://www.example.com",
                },
            });
            expect(Configuration.current()).toBeInstanceOf(Configuration);
        });
    });

    describe("getApiAddress()", () => {
        it("throws if not bound and no environment variable for API address exist", () => {
            const config = new Configuration();
            expect(() => config.getApiAddress()).toThrowError();
        });
        it("returns the bound address from environment variable by default", () => {
            const address = "https://www.example.com";
            process.env.WAYKE_ECOM_API_ADDRESS = address;

            const config = new Configuration();
            expect(config.getApiAddress()).toEqual(address);
        });
        it("returns the bound address from the specified IConfigurationRoot", () => {
            const address = "https://www.example.com";
            const config = Configuration.bind({
                api: {
                    address,
                },
            });
            expect(config.getApiAddress()).toEqual(address);
        });
    });
});
