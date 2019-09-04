export interface IConfiguration {
    getApiAddress(): string;
}

export interface IApiConfiguration {
    address: string;
}

export interface IConfigurationRoot {
    api: IApiConfiguration;
}

const createDefaultConfig = (): IConfigurationRoot | undefined => {
    if (process.env.WAYKE_ECOM_API_ADDRESS) {
        return {
            api: {
                address: process.env.WAYKE_ECOM_API_ADDRESS,
            },
        };
    }

    return undefined;
};

class Configuration implements IConfiguration {
    public static current(): IConfiguration {
        if (Configuration.instance) {
            return Configuration.instance;
        }

        const instance = new Configuration();
        if (!instance.config) {
            throw Configuration.notBoundError;
        }

        Configuration.instance = instance;
        return Configuration.instance;
    }

    public static bind(newConfig: IConfigurationRoot): IConfiguration {
        Configuration.instance = new Configuration();
        Configuration.instance.config = {
            api: {
                address: newConfig.api.address,
            },
        };

        return Configuration.instance;
    }

    public static destroy() {
        Configuration.instance = undefined;
    }

    private static instance: Configuration | undefined = undefined;
    private static notBoundError: Error = new Error(
        "Configuration not bound yet"
    );

    private config: IConfigurationRoot | undefined = createDefaultConfig();

    public getApiAddress(): string {
        if (!this.config) {
            throw Configuration.notBoundError;
        }

        return this.config.api.address;
    }
}

export default Configuration;
